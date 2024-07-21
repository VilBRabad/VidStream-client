import React, { useEffect, useRef, useState } from 'react';
import { GrBookmark } from 'react-icons/gr';
import MovieCards from './MovieCads';
import Footer from './Footer';

function MovieHome() {
    const [isInView, setIsInView] = useState<boolean>(true);
    const [calMarin, setCalMargin] = useState<number>(0)
    const movieRef = useRef(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        // console.log(`${window.innerHeight - 448}`);
        if (cardRef.current) {
            // console.log(cardRef.current.clientHeight)
            console.log(window.innerHeight - 510);
            const cal = window.innerHeight - cardRef.current.clientHeight - 62;
            console.log(cal)
            setCalMargin(cal)
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
    }, []);

    return (
        <div className="min-h-screen w-full relative text-white">
            <div
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url('/assets/Bahubali2.jpg')`
                }}
                className='fixed h-screen w-full bg-cover bg-center blur-[0px] opacity-50'
            />
            <div style={{ marginTop: `${calMarin}px` }} className={`w-full min-h-[100vh] pt-[3.5rem] flex flex-col items-center`}>
                <div
                    ref={cardRef}
                    className={`flex ${isInView ? 'max-md:flex-col relative h-auto lg:h-[28rem] w-[98%] sm:w-[90%] md:w-[98%] xl:w-[90%] 2xl:w-[70rem] py-6 px-2 md:py-10 md:px-8 lg:px-14' : 'fixed -top-[0.2rem] py-4 px-1 sm:px-8 transform translate-y-[4rem] h-auto w-[98%] max-sm:justify-center sm:w-[90%] md:w-[70%] 2xl:w-[60rem]'
                        } bg-gray-bg z-20 gap-2 md:gap-8 lg:gap-14 items-center transition-all duration-500`}
                >
                    <div className={`h-full ${isInView ? "w-[30%] lg:w-[16rem]" : "w-[3rem]"}`}>
                        <img src="/assets/Bahubali2.jpg" alt="" className='w-[16rem]' />
                    </div>
                    <div className={`md:w-[70%] ${isInView ? "w-[90%] max-md:items-center" : "w-[70%] sm:w-[60%] max-md:ml-4"} max-md:flex max-md:flex-col`}>
                        <div className={`flex max-md:items-center ${isInView ? "md:flex-col max-md:gap-4" : "gap-4"}`}>
                            <p className={`${isInView ? "text-4xl 2xl:text-6xl" : "text-xl"} font-bold`}>Bahubali 2</p>
                            <div className={`flex ${isInView ? "my-3" : "my-1"}`}>
                                <div className={`${isInView ? "px-3 py-1 text-md rounded-r-lg font-semibold" : "px-2 py-1 text-xs rounded-r-md"} bg-brand-color`}>IMDB</div>
                                <div className={`${isInView ? "px-3 py-1 text-md rounded-r-lg font-semibold" : "px-2 py-1 text-xs rounded-r-md"} bg-amber-500 text-black`}>8.3</div>
                            </div>
                        </div>
                        <div className={`flex gap-2 font-bold ${isInView ? "text-md" : "text-xs my-1"} text-white/50`}>
                            <p>Action</p>
                            <p>|</p>
                            <p>Romance</p>
                            <p>|</p>
                            <p>Thriller</p>
                        </div>
                        <div className={`${isInView ? "mt-4" : "hidden"} max-md:w-[100%] max-md:text-center max-md:mb-10`}>
                            <p className="text-md text-white/70 max-lg:truncate max-md:hidden">
                                Lorem ipsum, dolor sit ium voluptas quae corrupti obcaecati impedit repellendus iste totam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus ad voluptatum sint, laboriosam sunt quis perferendis fugit necessitatibus quaerat! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, ea.
                            </p>
                            <p className="text-md mt-4 ">Cast: Prabhas, Tamannaah Bhatia, Anushka Shetty, Rana Daggubati</p>
                            <p className="text-md">Director: S. S. Rajamouli</p>
                            <p className="text-md mt-4">28 April 2017</p>
                        </div>
                    </div>
                    <div className={`absolute ${isInView ? "bottom-6 md:top-8 md:right-14 max-md:w-full max-md:flex max-md:justify-center" : "top-[1.8rem] max-sm:hidden right-8"} flex gap-2`}>
                        <button className={`bg-brand-color hover:bg-brand-color/80 h-[2.6rem] ${isInView ? "w-[80%]" : "w-[6.5rem]"} md:w-[6.5rem] font-semibold text-lg`}>Play</button>
                        <button className='h-[2.6rem] px-2 border-2 border-brand-color hover:bg-brand-color transition'><GrBookmark size={25} /></button>
                    </div>
                </div>
                <div className={`h-[70%] w-full ${isInView ? '' : 'mt-[27vh]'} bg-gray-dk relative z-10 -mt-[10%] pt-[12%] pb-10`}>
                    <div ref={movieRef} className='absolute top-0'></div>
                    <div className="relative w-full">
                        <h1 className="pl-6 md:pl-12  text-lg mt-16 font-semibold">Popular on vidstream</h1>
                        <MovieCards cards={[1, 2, 3, 4, 5, 6, 7]} />
                    </div>
                    <div className="relative w-full">
                        <h1 className="pl-6 md:pl-12  text-lg mt-16 font-semibold">More Romance</h1>
                        <MovieCards cards={[1, 2, 3, 4, 5, 6, 7]} />
                    </div>
                    <div className="relative w-full">
                        <h1 className="pl-6 md:pl-12  text-lg mt-16 font-semibold">New fo you</h1>
                        <MovieCards cards={[1, 2, 3, 4, 5, 6, 7]} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MovieHome;
