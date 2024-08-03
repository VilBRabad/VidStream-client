import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IMovie } from "../utils";
import axios from "axios";


interface HomeMovieProviderProps {
  children: ReactNode;
}

interface HomeMovieContextType {
  topFiveMovie: IMovie[] ;
  mostPopular: IMovie[] ;
  topRomance: IMovie[];
}

const HomeMovieContext = createContext<HomeMovieContextType | undefined>(undefined)

export const HomeMovieProvider = ({ children }: HomeMovieProviderProps) => {

  // const [movies, setMovies] = useState<IMovie | null>(null);
  //* Movie Data
  const [topFiveMovie, setTopFiveMovie] = useState<IMovie[]>([]);
  const [mostPopular, setMostPopular] = useState<IMovie[]>([]);
  const [topRomance, setTopRomance] = useState<IMovie[]>([]);

  useEffect(() => {
    // console.log(topFiveMovie);
    (async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/movie/home-movies-info");

        if (res.status === 200) {
          const data = await res.data.data;
          // console.log(data);
          setTopFiveMovie(data.topFiveMovie);
          setMostPopular(data.movie);
          setTopRomance(data.topRommance);
        }
      } catch (error) {
        console.log(error);
      }
    })()

    // console.log(topFiveMovie);
  }, []);

  return (
    <HomeMovieContext.Provider value={{ topFiveMovie, mostPopular, topRomance }}>
      {children}
    </HomeMovieContext.Provider>
  )
}

export const useHomeMovie = (): HomeMovieContextType => {
  const context = useContext(HomeMovieContext);
  if (context === undefined) {
    throw new Error("Error in useHomeMovieContext");
  }
  return context;
};
