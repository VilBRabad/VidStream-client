import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GrBookmark } from 'react-icons/gr';
import Footer from './Footer';
import LoadCards from './LoadCards';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getUrl, IMovie } from '../utils';
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function MovieHome() {
    const navigate = useNavigate();
    const { id } = useParams();
    const movieRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState<boolean>(true);
    const [calMarin, setCalMargin] = useState<number>(0);
    const [movieData, setMovieData] = useState<IMovie | null>(null);
    const [backgroundUrl, setBackgroundUrl] = useState<string>("");

    const getMovieData = useCallback(async () => {
        try {
            if (!id) return;

            const res = await axios.get(`http://localhost:8000/api/v1/movie/get-movie-by-id?movieId=${id}`);
            const data = res.data.data;

            setMovieData(data);
            setBackgroundUrl(getUrl(data.poster));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const res = error.response;
                if (res?.status === 400) toast.error("Invalid");
                else if(res?.status === 402) toast.error("404: Not found");
                else toast.error("Network connection issue");
            } else {
                toast.error("Unexpected error");
            }
        }
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!id) {
            navigate("/Error");
        } else {
            getMovieData();
        }
    }, [id]);


    useLayoutEffect(() => {
        if (cardRef.current) {
            const cal = window.innerHeight - cardRef.current.clientHeight - 62;
            setCalMargin(cal);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0
            }
        );

        if (movieRef.current) {
            observer.observe(movieRef.current);
        }

        return () => {
            if (movieRef.current) {
                observer.unobserve(movieRef.current);
            }
        };
    }, [movieData]);

    // if (loading) return <div> Loading .....</div>;

    return (
        <AnimatePresence>
            <div className='h-[100vh] w-full'></div>
            <div
                className="min-h-screen w-full relative text-white">
                {
                <div className={`w-full min-h-[100vh] flex flex-col items-center`}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url('${backgroundUrl}')`
                        }}
                        className='fixed h-screen w-full bg-cover bg-center blur-[0px] opacity-50 top-0'
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        ref={cardRef}
                        className={`flex ${isInView ? 'max-md:flex-col absolute max-md:-top-[35.5rem] md:-top-[22.5rem] lg:-top-[28.5rem] max-md:h-[35rem] h-[23rem] lg:h-[28rem] w-[98%] sm:w-[90%] md:w-[98%] xl:w-[90%] 2xl:w-[70rem] py-6 px-2 md:py-10 md:px-8 lg:px-14' : 'fixed -top-[0.2rem] py-4 px-1 sm:px-8 transform translate-y-[4rem] h-auto w-[98%] max-sm:justify-center sm:w-[90%] md:w-[70%] 2xl:w-[60rem]'
                            } bg-gray-bg z-20 gap-2 md:gap-8 lg:gap-14 items-center transition-all duration-500`}
                    >
                        <div className={` h-full overflow-hidden ${isInView ? "w-auto md:w-[30%] lg:w-[16rem]" : "w-[3rem]"}`}>
                            {movieData ? 
                                <img src={backgroundUrl} alt="" className='h-full' />
                                :
                                isInView ?
                                <Skeleton count={1} height={500}/>
                                :
                                <Skeleton count={1} height={60}/>
                            }
                        </div>
                        <div className={`md:w-[70%] ${isInView ? "w-[90%] max-md:items-center" : "w-[70%] sm:w-[60%] max-md:ml-4"} max-md:flex max-md:flex-col`}>
                            <div className={`flex max-md:items-center ${isInView ? "flex-col max-md:gap-1" : "gap-4"}`}>
                                {movieData ?
                                    <p className={`${isInView ? "text-5xl 2xl:text-6xl" : "text-xl"} font-bold`}>{movieData.title}</p>
                                    :
                                    <Skeleton count={1} height={30} width={500}/>
                                }
                                <div className={`flex ${isInView ? "my-3" : "my-1"}`}>
                                   {movieData ?
                                        <>
                                            <div className={`${isInView ? "px-3 py-1 text-md rounded-r-lg font-semibold" : "px-2 py-1 text-xs rounded-r-md"} bg-brand-color`}>IMDB</div>
                                            <div className={`${isInView ? "px-3 py-1 text-md rounded-r-lg font-semibold" : "px-2 py-1 text-xs rounded-r-md"} bg-amber-500 text-black`}>{movieData.rating}</div>
                                        </>
                                        :
                                        isInView && <Skeleton count={1} height={20} width={100}/>

                                    }
                                </div>
                            </div>
                            <div className={`flex gap-1 font-bold ${isInView ? "text-md" : "text-xs my-1"} text-white/50`}>
                                {movieData ?
                                    movieData.genre.map((gen, ind) => (
                                        <p key={ind}>{gen} {ind === movieData.genre.length - 1 ? "" : "|"}</p>
                                    ))
                                    :
                                    <Skeleton count={1} height={20} width={170}/>
                                }
                            </div>
                            <div className={`${isInView ? "mt-4" : "hidden"} max-md:w-[100%] max-md:text-center max-md:mb-10`}>
                                {movieData ?
                                    <p className="text-md text-white/70 max-lg:truncate max-md:hidden">{movieData.description}</p>
                                    :
                                    <Skeleton count={3} height={18}/>
                                }
                                {movieData ?
                                    <>
                                        <p className="text-md md:mt-4 ">Cast: {...movieData.actors}</p>
                                        <p className="text-md">Director: {movieData.director}</p>
                                        <p className="text-md mt-4">{movieData.released_date}</p>    
                                    </>
                                    :
                                    <>
                                        <Skeleton count={1} height={18} width={300} className='md:mt-8'/>
                                        <Skeleton count={1} height={18} width={270}/>
                                        <Skeleton count={1} height={18} width={200}/>
                                    </>

                                }
                            </div>
                        </div>
                        <div className={`absolute ${isInView ? "bottom-6 md:bottom-12 md:right-14 max-md:w-full max-md:flex max-md:justify-center" : "bottom-[1.8rem] max-sm:hidden right-8"} flex gap-2`}>
                            {movieData ?
                                <button className={`bg-brand-color hover:bg-brand-color/80 h-[2.6rem] ${isInView ? "w-[80%]" : "w-[6.5rem]"} md:w-[6.5rem] font-semibold text-lg`}>Play</button>
                                :
                                <Skeleton count={1} height={40} width={100}/>
                            }
                            {movieData ?
                                <button className='h-[2.6rem] px-2 border-2 border-brand-color hover:bg-brand-color transition'><GrBookmark size={25} /></button>
                                :
                                <Skeleton count={1} height={40} width={100}/>
                            }
                        </div>
                    </motion.div>
                    <div
                        className={`relative z-10 -mt-[10%] pt-[12%] pb-10 bg-gray-dk`}>
                        <div ref={movieRef} className='absolute top-0 h-4 w-4'></div>
                        <div className="relative w-full">
                            {/* <h1 className="pl-6 md:pl-12 text-lg mt-16 font-semibold"><Skeleton count={1} height={30} width={200}/></h1> */}
                            <LoadCards />
                        </div>
                        <div className="relative w-full">
                            {/* <h1 className="pl-6 md:pl-12 text-lg mt-16 font-semibold"><Skeleton count={1} height={30} width={200}/></h1> */}
                            <LoadCards />
                        </div>
                        <div className="relative w-full">
                            {/* <h1 className="pl-6 md:pl-12 text-lg mt-16 font-semibold"><Skeleton count={1} height={30} width={200}/></h1> */}
                            <LoadCards />
                        </div>
                    </div>
                </div>}
            </div>
            <Footer/>
        </AnimatePresence>
    );
}

export default MovieHome;
