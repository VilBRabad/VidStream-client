import { useEffect, useRef, useState } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { GrBookmark } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion"
import Footer from "./Footer";
import MovieCards from "./MovieCads";
import LoadCards from "./LoadCards";
import { getUrl } from "../utils";
import { useHomeMovie } from "../contexts/HomeMoviesContext";
// import { addToWatchList } from "../utils/Functions";
import {useAppDispatch} from "../utils/hooks";
import {addToWatchlist} from "../redux/watchlist/watchlistSlice"
import { useSelector } from "react-redux";
import { GoBookmarkSlash } from "react-icons/go";

const Home: React.FC = () => {

  const [curIndx, setCurIndx] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {topFiveMovie, mostPopular, topRomance} = useHomeMovie();

  const dispatch = useAppDispatch();
  const movies = useSelector((store: IStore)=> store.watchlist.movies);

  const resetInerval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurIndx(preIndx => (preIndx + 1) % topFiveMovie.length);
      // console.log(topFiveMovie[curIndx].title);
    }, 10000);
  }

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth)
    resetInerval()

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const clickHandle = (ind: number) => {
    setCurIndx(ind);
    resetInerval();
  }


  return (
    <div className="h-auto w-screen relative text-white bg-black z-0">
      {topFiveMovie.length > 0 ?
        <div className="relative h-[90vh] flex z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="md:mt-[8%] w-[95%] md:w-[70%] lg:w-[50%] pl-6 md:pl-14 lg:pl-24 flex flex-col justify-end max-md:items-center max-md:mb-[10vh] md:justify-center z-30">
            <div className="flex gap-4 items-end">
              <h1 className="text-6xl font-semibold">{topFiveMovie[curIndx]?.title}</h1>
              <div className="flex mb-2">
                <p className="desc1">IMBD</p>
                <p className="desc2">{topFiveMovie[curIndx]?.rating}</p>
              </div>
            </div>
            <div className="flex gap-1 font-semibold text-white/50 mt-2">
              {
                topFiveMovie[curIndx]?.genre.map((gen, ind) => (
                  <p key={ind}>{gen} {ind === topFiveMovie[curIndx].genre.length - 1 ? "" : "|"}</p>
                ))
              }
            </div>
            <p className="opacity-80 mt-2 max-md:text-center 2xl:w-[65%]">{topFiveMovie[curIndx]?.description}</p>
            <div className="mt-4 text-lg flex gap-2 w-full max-md:justify-center">
              <div className="bg-brand-color h-[2.5rem] w-[89%] sm:w-[8rem] flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-900/50 border border-brand-color transition">
                <IoPlaySharp size={25} />
                <p>Play</p>
              </div>
              {
                movies && movies.some(mov=>mov._id === topFiveMovie[curIndx]._id)?
                  <div onClick={()=> dispatch(addToWatchlist(topFiveMovie[curIndx]._id))} className="border px-2 flex items-center justify-center cursor-pointer bg-gray-900/50 hover:bg-brand-color transition border-brand-color">
                    <GoBookmarkSlash size={25}/>
                  </div>
                  :
                  <div onClick={()=> dispatch(addToWatchlist(topFiveMovie[curIndx]._id))} className="border px-2 flex items-center justify-center cursor-pointer bg-gray-900/50 hover:bg-brand-color transition border-brand-color">
                    <GrBookmark size={25} />
                  </div>
              }
            </div>
            <div className="flex gap-2 mt-[10%] w-[14rem]">
              {
                [...Array(5)].map((_, ind) => (
                  <div
                    key={ind}
                    onClick={() => clickHandle(ind)}
                    className={`h-[0.6rem] w-8 rounded-full transition cursor-pointer flex-none rect ${curIndx === ind ? "cur-rect" : "hover:bg-brand-color/70 bg-gray-700"}`}
                  />
                ))
              }
            </div>
          </motion.div>
          <AnimatePresence>
            <motion.div
              id="movie" key={curIndx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={`absolute xl:w-[70rem] h-screen lg:h-[120vh] w-screen right-0 bg-cover lg:contain bg-no-repeat bg-center xl:bg-right z-10 transition ease-in-out`}
              style={windowWidth > 768 ? {
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0,0,0, 0.2), rgba(0, 0, 0, 0)), 
            url('${getUrl(topFiveMovie[curIndx]?.poster)}')`
              } : {
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0,0,0, 0.2), rgba(0, 0, 0, 0)), 
            url('${getUrl(topFiveMovie[curIndx]?.poster)}')`
              }}
            />
          </AnimatePresence>
        </div>
        :
        <div className="relative h-[90vh] flex items-center justify-center z-10 transition">
          <div className="bg-gray-bg animate-pulse h-[80%] w-[90%]">

          </div>
        </div>
      }
      {mostPopular.length > 0 ?
        <div className="h-auto relative w-screen bg-black pb-8">
          <div className="relative w-full">
            <h1 className="relative text-2xl font-semibold z-50 pl-6 lg:pl-12">Popular on vidstream</h1>
            <MovieCards cards={mostPopular} />
          </div>
          <div className="w-full mt-16 relative">
            <h1 className="relative text-2xl font-semibold z-50 pl-6 lg:pl-12">Top Romance Movies</h1>
            <MovieCards cards={topRomance} />
          </div>
        </div>
        :
        <div className="h-auto relative w-screen bg-black  pb-8">
          <div className="relative w-full">
            <LoadCards />
          </div>
          <div className="w-full mt-16 relative">
            <LoadCards />
          </div>
        </div>
      }
      <Footer />
    </div>
  )
}

export default Home
