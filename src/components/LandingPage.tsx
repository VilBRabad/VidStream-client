import { MdArrowForwardIos } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

function LandingPage() {
  return (
    <div className="container">
      <div className=" min-h-screen max-w-screen px-4 md:px-12 bg-home_background_image bg-cover text-white overflow-x-hidden"> 
        <div className="pt-3 flex justify-between">
          <h1 className="font-bold text-2xl md:text-3xl text-brand-color">VIDSTREAM</h1>
          <div className="flex gap-2">
            <button className="px-3 md:px-5 md:py-1 bg-brand-color hover:bg-brand-color/90 max-sm:text-sm">Login</button>
            <button className="px-2 md:px-3 md:py-1 bg-gray-900/50 border border-gray-500 hover:bg-white/10 max-sm:text-sm">Explore</button>
          </div>
        </div>
        <div className="h-[80vh] flex flex-col justify-center gap-3 md:px-[3%]">
          <h2 className="text-2xl lg:text-4xl font-bold md:w-[80%] lg:w-[55%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, cumque?</h2>
          <p className="text-white/80 lg:w-[55%] max-md:text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus, ab laudantium sint consequuntur dignissimos quibusdam debitis amet assumenda optio est?</p>
          <div className="h-9 md:h-10 flex flex-wrap gap-1 md:gap-2">
            <input type="text" className="h-full px-2 bg-gray-800/50 border border-gray-400/50 outline-0 md:w-[17rem]" placeholder="Enter email" />
            <button className="flex items-center gap-1 md:gap-2 bg-brand-color hover:bg-brand-color/90 h-full px-2 md:px-4">
              <span className="text-nowrap max-sm:text-sm">Get Started</span> 
              <MdArrowForwardIos className="max-sm:text-sm"/>
            </button>
          </div>
        </div>
      </div>
      <div className="-mt-[5rem] overflow-x-hidden text-white mb-20">
        <div className="text-center">
          <h1 className="text-xl md:text-3xl font-bold">Make you to first watch</h1>
          <p className="text-white/80 max-md:text-sm">Most popular movies on VidStream platform</p>
        </div>
        <div className="bg-black h-auto py-8 px-2 md:px-[3%] flex md:justify-center gap-2 xl:gap-4 max-md:overflow-x-scroll">
          <div className="h-[15rem] w-[10rem] bg-slate-800/50">
            <div className="h-[12rem] w-[10rem] bg-slate-700 animate-pulse"></div>
            <div className="h-[3rem] w-full px-2 py-1">
              <div className="w-[90%] h-4 bg-slate-700 rounded-full animate-pulse"></div>
              <div className="w-[40%] h-4 bg-slate-700 rounded-full mt-1 animate-pulse"></div>
            </div>
          </div>
          <div className="h-[15rem] w-[10rem] bg-slate-800/50">
            <div className="h-[12rem] w-[10rem] bg-slate-700 animate-pulse"></div>
            <div className="h-[3rem] w-full px-2 py-1">
              <div className="w-[90%] h-4 bg-slate-700 rounded-full animate-pulse"></div>
              <div className="w-[40%] h-4 bg-slate-700 rounded-full mt-1 animate-pulse"></div>
            </div>
          </div>
          <div className="h-[15rem] w-[10rem] bg-slate-800/50">
            <div className="h-[12rem] w-[10rem] bg-slate-700 animate-pulse"></div>
            <div className="h-[3rem] w-full px-2 py-1">
              <div className="w-[90%] h-4 bg-slate-700 rounded-full animate-pulse"></div>
              <div className="w-[40%] h-4 bg-slate-700 rounded-full mt-1 animate-pulse"></div>
            </div>
          </div>
          <div className="h-[15rem] w-[10rem] bg-slate-800/50">
            <div className="h-[12rem] w-[10rem] bg-slate-700 animate-pulse"></div>
            <div className="h-[3rem] w-full px-2 py-1">
              <div className="w-[90%] h-4 bg-slate-700 rounded-full animate-pulse"></div>
              <div className="w-[40%] h-4 bg-slate-700 rounded-full mt-1 animate-pulse"></div>
            </div>
          </div>
          <div className="h-[15rem] w-[10rem] bg-slate-800/50">
            <div className="h-[12rem] w-[10rem] bg-slate-700 animate-pulse"></div>
            <div className="h-[3rem] w-full px-2 py-1">
              <div className="w-[90%] h-4 bg-slate-700 rounded-full animate-pulse"></div>
              <div className="w-[40%] h-4 bg-slate-700 rounded-full mt-1 animate-pulse"></div>
            </div>
          </div>
          <div className="h-[15rem] w-[10rem] bg-slate-800/50">
            <div className="h-[12rem] w-[10rem] bg-slate-700 animate-pulse"></div>
            <div className="h-[3rem] w-full px-2 py-1">
              <div className="w-[90%] h-4 bg-slate-700 rounded-full animate-pulse"></div>
              <div className="w-[40%] h-4 bg-slate-700 rounded-full mt-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[10vh] max-w-screen bg-black text-white/70 px-[3%]">
        <div className="w-full flex md:justify-center gap-1 md:gap-4 max-sm:text-sm flex-wrap">
          <p className="hover:text-white/90 cursor-pointer">Term of use</p>
          <p>|</p>
          <p className="hover:text-white/90 cursor-pointer">Privacy policy</p>
          <p>|</p>
          <p className="hover:text-white/90 cursor-pointer">Privacy policy</p>
          <p>|</p>
          <p className="hover:text-white/90 cursor-pointer">Privacy policy</p>
          <p>|</p>
          <p className="hover:text-white/90 cursor-pointer">Privacy policy</p>
        </div>
        <div className="h-[1px] bg-white/70 mt-2"></div>
        <div className="mt-2 flex justify-between max-md:text-xs">
          <div className="flex gap-1 md:gap-3">
            <p className="md:tracking-[0.5rem]">VILAS DEV</p>
            <p>|</p>
            <p>@VidStream</p>
          </div>
          <button className="flex items-center gap-1 text-white/90"><IoMdArrowDropdown size={20}/> ENGLISH (US)</button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
