import { useLocation } from "react-router-dom"
import Footer from "./Footer"
import MovieCards from "./MovieCads"
import { useEffect } from "react";

function useQeury() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {

  const query = useQeury();
  const movie = query.get('movie');


  return (
    <div className="relative min-h-screen w-screen bg-gray-dk pt-[3.5rem]">
      <div className="relative">
        <form className="h-[10rem] flex items-center justify-center">
          <div className="flex w-[50%] gap-4">
            <input type="text" placeholder="Search movies..." name="movie" className="h-[3.5rem] w-[75%] px-4 text-2xl outline-0 bg-gray-dk border-b-2 border-brand-color" />
            <button type="submit" className="text-2xl w-[25%] h-[3.5rem] border-2 border-brand-color hover:bg-brand-color transition">Search</button>
          </div>
        </form>
        {movie && movie.length > 0 &&
          <>
            <p className="pl-16 text-xl">Result of "<span className="font-semibold">{movie}</span>"</p>
            <MovieCards cards={[1, 2, 3, 4, 5]} />
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
