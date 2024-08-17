import Footer from "./Footer";
import { ChangeEvent, useState } from "react";
import CloudinaryImage from "./CloudinaryImage";
import axios from "axios";


function SearchPage() {
  
  const [resultMovies, setResultMovies] = useState<IMovie[] | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSubmitForm = async(e: ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if(searchInput === "") return;
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/movie/search?title=${searchInput}`);

      if (res.status === 201) {
        const data = await res.data.data;
        console.log(data);
        setResultMovies(data.movies);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative min-h-screen w-screen bg-gray-dk pt-[3.5rem]">
      <div className="relative">
        <form onSubmit={handleSubmitForm} className="h-[10rem] flex items-center justify-center">
          <div className="flex w-[90%] md:w-[80%] lg:w-[50%] gap-4">
            <input onChange={e=>setSearchInput(e.target.value)} value={searchInput} type="text" placeholder="Search movies..." name="movie" className="h-[2.5rem] md:h-[3.5rem] w-[75%] px-2 md:px-4 text-lg md:text-2xl outline-0 bg-gray-dk border-b-2 border-brand-color" />
            <button type="submit" className="text-lg md:text-2xl px-5 md:px-8 lg:px-14 h-[2.5rem] md:h-[3.5rem] border-2 border-brand-color hover:bg-brand-color transition">Search</button>
          </div>
        </form>
        {resultMovies &&
          <>
            <p className="pl-16 text-xl">Result of "<span className="font-semibold">{searchInput}</span>"</p>
            <div className="flex flex-wrap h-auto gap-3 md:gap-4 my-4 lg:mx-16">
              {
                resultMovies.map((mov, ind)=>(
                    <div key={ind} className="h-[22rem] min-w-[13.1rem] xl:min-w-[16rem]">
                      <CloudinaryImage movie={mov} />
                    </div> 
                ))
              }
            </div>
          </>
        }
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}

export default SearchPage
