import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";


function Register() {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className='container min-h-screen w-screen px-2 2xl:px-4 md:max-2xl:px-8 text-white overflow-hidden'>
            <div className="pt-3 flex justify-between border-b border-white/40 pb-4">
                <h1 className="font-bold text-2xl md:text-3xl text-brand-color">VIDSTREAM</h1>
                <div className="flex gap-2"> 
                    <button className="text-lg font-semibold">Sign Out</button>
                </div>
            </div>
            <div className="mt-[10%] flex justify-center">
                <div className="bg-slate-800/50 min-h-[20rem] max-h-[40rem] w-[30rem] rounded-lg flex flex-col items-center px-4 py-12">
                    <h1 className="text-3xl">Register</h1>
                    <div className="max-md:w-[90%] w-[83%] mt-8">
                        <label htmlFor="email" className="font-semibold text-white/80">Email</label>
                        <input type="text" name="email" placeholder="rabadvilas99@gmail.com" className="bg-white/10 outline-0 px-4 py-3 w-full" disabled/>
                    </div>
                    <div className="max-md:w-[90%] w-[83%] mt-6">
                        <label htmlFor="password" className="font-semibold text-white/80">Password</label>
                        <div className="w-full bg-white/10 flex items-center">
                            <input type={`${isVisible?"text":"password"}`} placeholder="**********" className="bg-transparent outline-0 px-4 py-3 w-[90%]"/>
                            <div onClick={()=>setIsVisible(!isVisible)} className="cursor-pointer">
                                {
                                    isVisible? <GoEyeClosed size={20}/>
                                    :
                                    <GoEye size={20}/>
                                }
                            </div>
                        </div>
                    </div>
                    <button className="mt-6 bg-brand-color hover:bg-brand-color/90 max-md:w-[90%] w-[83%] py-3 text-xl font-semibold">Register</button>
                    <p className="text-white/70 hover:text-white mt-8 cursor-pointer">Back to Sign In</p>
                </div>
            </div>
        </div>
    )
}

export default Register
