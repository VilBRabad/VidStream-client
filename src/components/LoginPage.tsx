import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

function LoginPage() {

    const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="container px-4 relative h-screen w-screen bg-home_background_image bg-cover text-white overflow-hidden">
        <div className="pt-3 flex justify-between">
          <h1 className="font-bold text-2xl md:text-3xl text-brand-color">VIDSTREAM</h1>
          <div className="flex gap-2">
            <button className="px-3 md:px-5 md:py-1 bg-brand-color hover:bg-brand-color/90 max-sm:text-sm">Login</button>
            <button className="px-2 md:px-3 md:py-1 bg-gray-900/50 border border-gray-500 hover:bg-white/10 max-sm:text-sm">Explore</button>
          </div>
        </div>
        <div className="h-full w-full flex items-center justify-center">
            <form className="bg-slate-800/70 h-[28rem] mx-4 w-[26rem] flex flex-col items-center px-4 py-6">
                <h1 className="text-xl font-bold">Login</h1>
                <div className="w-[80%] mt-8">
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder="e.g. abcd@vidstream.com" className="w-full h-11 mb-4 mt-1 bg-slate-800/90 outline-0 px-3 border border-gray-700"/>
                    <label htmlFor="">Password</label>
                    <div className="w-full flex items-center bg-slate-800/90 border border-gray-700 mt-1">
                        <input type={`${isVisible?"text":"password"}`} placeholder="******" className="w-[90%] h-11 bg-slate-800/90 outline-0 px-3 "/>
                        <div className="w-[10%] cursor-pointer" onClick={()=>setIsVisible(!isVisible)}>
                            {
                                isVisible?
                                <GoEyeClosed/>
                                :
                                <GoEye />
                            }
                        </div>
                    </div>
                    <button className="w-full bg-brand-color hover:bg-brand-color/90 h-10 mt-4">Login</button>
                    <div className="flex flex-col items-center text-gray-400 text-sm mt-6 select-none">
                        <p className="hover:text-white cursor-pointer ">Forgot password?</p>
                        <p className="hover:text-white cursor-pointer mt-2">New to vidstream? Register</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
