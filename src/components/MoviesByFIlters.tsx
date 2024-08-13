import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { RxCross2 } from "react-icons/rx";
import { IoAdd } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import Footer from "./Footer";
import axios from "axios";
import CloudinaryImage from "./CloudinaryImage";
import { useHomeMovie } from "../contexts/HomeMoviesContext";
import NormalCloudImage from "./NormalCloudImage";


const allGenres = [
  "Romance", "Drama", "Action", "Comedy", "Biography", "Sport", "Music", "Sci-Fi", "Crime", "Thriller", "History", "Adventure", "War", "Horror", "Family", "Fantasy"
]

function MoviesByFIlters() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { topFiveMovie } = useHomeMovie();

  const [moviesData, setMoviesDate] = useState<IMovie[] | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [totalResult, setTotalResult] = useState<number | null>(null);

  const [genre, setGenre] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const removeGenre = (gen: string) => {
    const newGenreList = genre.filter((value) => value !== gen);
    navigate(`?genre=${newGenreList.join(',')}&page=${page}`);
  };

  const addGenre = (gen: string) => {
    navigate(`?genre=${genre.join(',')},${gen}&page=${page}`);
  }

  const changePage = (pageNumber: number) => {
    navigate(`?genre=${genre.join(',')}&page=${pageNumber}`);
  }

  useEffect(() => {
    const gens = queryParams.get("genre")?.split(',').filter(gen => allGenres.includes(gen) && gen) || [];
    const pag = queryParams.get("page");

    setGenre(gens);
    setPage(pag ? parseInt(pag) : 1);

    const fetchDate = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/movie/movies${location.search}`);

        if (res.status === 200) {
          const data = await res.data.data;
          // console.log(data);
          setMoviesDate(data.movies);
          setTotalPages(data.totalPages);
          setTotalResult(data.totalMovies);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchDate();

  }, [location.search]);

  return (
    <>
      <div className="min-h-screen w-screen px-4 md:px-8 xl:px-24 pt-12 flex max-lg:flex-col">
        <div className="w-full lg:w-[79%]">
          <div className="mt-10 w-full border-b pb-4 border-white/40">
            <div className="flex gap-6 flex-wrap">
              <h1 className="text-2xl font-semibold text-nowrap">Filter by: </h1>
              <div className="flex gap-2 flex-wrap">
                {
                  genre.map((gen, ind) => (
                    <div key={ind} className="border border-white/40 bg-brand-color pl-3 pr-1 py-[4px] text-sm rounded-full flex items-center gap-2">
                      <p>{gen}</p>
                      <div onClick={() => removeGenre(gen)} className="p-1 transition hover:bg-black rounded-full cursor-pointer">
                        <RxCross2 size={18} />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex gap-2 flex-wrap">
                {
                  allGenres.map((gen, ind) => (
                    !genre.includes(gen) &&
                    <div key={ind} className="border border-white/40 pl-3 pr-1 py-[4px] text-sm rounded-full flex items-center gap-2">
                      <p>{gen}</p>
                      <div onClick={() => addGenre(gen)} className="p-1 transition hover:bg-white/20 rounded-full cursor-pointer">
                        <IoAdd size={18} />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="mt-6 w-full h-auto overflow-hidden">
            <div className="text-2xl flex gap-2">
              {totalResult ?
                <>
                  <h1 className="font-semibold">Results: </h1>
                  <p>{totalResult}</p>
                </>
                :
                <Skeleton height={30} width={120} />
              }
            </div>
            <div className="flex flex-wrap h-auto gap-3 md:gap-4 my-4">
              {
                moviesData ?
                  moviesData.map((movie, ind) => (
                    <>
                      <div key={ind} className="h-[22rem] min-w-[13.1rem] xl:min-w-[16rem]">
                        <CloudinaryImage movie={movie} />
                      </div>
                    </>
                  ))
                  :
                  [...Array(15)].map((_, ind) => (
                    <div key={ind} className="w-[10rem] lg:w-[16rem]">
                      <Skeleton className="h-[220px] lg:h-[350px]" />
                    </div>
                  ))
              }
            </div>
            <div className="flex my-8 gap-2 justify-center">
              {
                totalPages ?
                  [...Array(totalPages)].map((_, ind) => (
                    <div onClick={() => changePage(ind + 1)} className={`h-12 w-12 border flex items-center justify-center transition ${ind + 1 === page && "bg-brand-color"} hover:bg-brand-color cursor-pointer`}>
                      <p>{ind + 1}</p>
                    </div>
                  ))
                  :
                  [...Array(4)].map((_, ind) => (
                    <Skeleton key={ind} height={50} width={50} />
                  ))
              }
            </div>
          </div>
        </div>
        <div className="w-auto lg:w-[20%] h-50vh">
          <div className="bg-gray-bg mt-14 pt-10 py-6 xl:pl-8 md:px-5">  
            <h1 className="text-xl font-bold ">Top 5</h1>
            <div className="max-lg:overflow-scroll mt-5 flex lg:flex-col gap-4">
              {
                topFiveMovie ?
                  topFiveMovie.map((movie, ind) => (
                    <div key={ind} className="flex gap-4">
                      <div key={ind} onClick={()=>navigate(`/movie/${movie._id}`)} className="h-[8rem] min-w-[6.1rem] cursor-pointer">
                        <NormalCloudImage movie={movie} />
                      </div>
                      <div>
                        <p onClick={()=>navigate(`/movie/${movie._id}`)} className="font-semibold text-xl cursor-pointer">{movie.title}</p>
                        <div className="flex mb-2 mt-2">
                          <p className="desc1">IMBD</p>
                          <p className="desc2">{movie.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))
                  :
                  [...Array(5)].map((_, ind) => (
                    <div key={ind} className="flex gap-4">
                      <Skeleton height={120} width={90} />
                      <div>
                        <Skeleton height={20} width={150} />
                        <Skeleton height={20} width={100} />
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>
  )
}

export default MoviesByFIlters