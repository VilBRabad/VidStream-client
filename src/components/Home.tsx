import { useEffect, useRef, useState } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { GrBookmark } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion"
import Footer from "./Footer";
import { MdArrowForwardIos } from "react-icons/md";


const topMovies = [
  {
    name: "Bahubali",
    rate: 8.6,
    genre: ["Action", "Thriller", "Rommance"],
    desc: "After learning that his father was brutally killed by Bhallaladeva, Mahendra Baahubali raises an army to defeat him and release his mother from the former's captivity.",
    image: "/assets/Bahubali2.jpg",
  },
  {
    name: "Avesham",
    rate: 8.0,
    genre: ["Action", "Thriller", "Drama"],
    desc: "hree teens come to Bangalore for their engineering education and get involved in a fight. They find a local gangster to help them.",
    image: "/assets/Aavesham.jpg",
  },
  {
    name: "Animal",
    rate: 7.8,
    genre: ["Action", "Thriller", "Rommance"],
    desc: "The son of a wealthy, powerful industrialist returns to India and undergoes a remarkable transformation as he becomes consumed by a quest for vengeance against those threatening his father's life.",
    image: "/assets/Animal.jpg",
  },
  {
    name: "Cirkus",
    rate: 7.5,
    genre: ["Drama", "Comedy", "Rommance"],
    desc: "Chaos reigns due to a case of mistaken identity when two sets of twins who were separated at birth coincidentally visit the same city.",
    image: "/assets/cirkus.jpg",
  },
  {
    name: "Leo",
    rate: 7.7,
    genre: ["Action", "Thriller", "Rommance"],
    desc: "Things start to take an awry turn for a mild-mannered cafe owner, who gets caught in the crosshairs of a drug cartel.",
    image: "/assets/Leo.jpg",
  },
]

interface HomeProps{}

const Home:React.FC<HomeProps> = () => {

  const [curIndx, setCurIndx] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resetInerval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurIndx(preIndx => (preIndx + 1) % topMovies.length);
    }, 10000);
  }

  const updateWindowWidth = ()=>{
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

  const slideHandle = ()=>{

  }

  return (
    <div className="min-h-screen w-screen relative text-white bg-black z-0">
      <div className="relative h-[90vh] flex z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="md:mt-[8%] w-[95%] md:w-[70%] lg:w-[50%] pl-6 md:pl-14 lg:pl-24 flex flex-col justify-end max-md:items-center max-md:mb-[10vh] md:justify-center z-30">
          <div className="flex gap-4 items-end">
            <h1 className="text-6xl font-semibold">{topMovies[curIndx].name}</h1>
            <div className="flex mb-2">
              <p className="desc1">IMBD</p>
              <p className="desc2">{topMovies[curIndx].rate}</p>
            </div>
          </div>
          <div className="flex gap-1 font-semibold text-white/50">
            {
              topMovies[curIndx].genre.map((gen, ind) => (
                <p key={ind}>{gen} {ind === topMovies[curIndx].genre.length - 1 ? "" : "|"}</p>
              ))
            }
          </div>
          <p className="opacity-80 mt-2 max-md:text-center 2xl:w-[65%]">{topMovies[curIndx].desc}</p>
          <div className="mt-4 text-lg flex gap-2 w-full max-md:justify-center">
            <div className="bg-brand-color h-[2.5rem] w-[89%] sm:w-[8rem] flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-900/50 hover:border hover:border-brand-color transition">
              <IoPlaySharp size={25} />
              <p>Play</p>
            </div>
            <div className="border px-2 flex items-center justify-center gap-2 cursor-pointer bg-gray-900/50 hover:bg-brand-color transition border-brand-color">
              <GrBookmark size={25} />
            </div>
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
            style={windowWidth > 768 ? {backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0,0,0, 0.2), rgba(0, 0, 0, 0)), 
            url('${topMovies[curIndx].image}')`}: {backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0,0,0, 0.2), rgba(0, 0, 0, 0)), 
            url('${topMovies[curIndx].image}')`}}
          />
        </AnimatePresence>
      </div>
      <div className="relative w-screen bg-black min-h-screen pl16">
        <div className="relative w-full">
          <h1 className="relative text-2xl font-semibold z-50 pl-6 lg:pl-12">Popular on vidstream</h1>
          <div className="pop-cards relative z-50 mt-4 flex gap-2 lg:gap-4 h-[17.1rem] xl:h-[24rem] w-screen no-scrollbar overflow-scroll scroll-pl-6 pl-6 lg:scroll-pl-16 lg:pl-12 snap-x">
            {
              [...Array(10)].map((_, ind) => (
                <div key={ind} className="movie-card">
                </div>
              ))
            }
          </div>
          <div onClick={slideHandle} className="right-arrow-div">
            <MdArrowForwardIos size={30}/>
          </div>
        </div>
        <div className="w-full mt-16 relative">
          <h1 className="relative text-2xl font-semibold z-50 pl-6 lg:pl-12">New release | 2024</h1>
          <div className="pop-cards relative z-50 mt-4 flex gap-2 lg:gap-4 h-[24rem] w-screen no-scrollbar overflow-scroll scroll-pl-6 pl-6 lg:scroll-pl-16 lg:pl-12 snap-x">
            {
              [...Array(10)].map((_, ind) => (
                <div key={ind} className="movie-card">
                </div>
              ))
            }
          </div>
          <div onClick={slideHandle} className="right-arrow-div">
            <MdArrowForwardIos size={30}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
