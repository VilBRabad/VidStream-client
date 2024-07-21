import { useState } from 'react'
import AuthPageLayout from './AuthPageLayout'
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import {motion, AnimatePresence} from "framer-motion"


function Login() {
    
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <AuthPageLayout>
            <AnimatePresence>
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="relative h-[33rem] w-[95%] sm:w-[30rem] bg-gray-bg/70 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
                <form className="w-[80%] mb-8">
                    <input type="email" name="email" placeholder="Email address" className="w-full h-[3rem] px-3 bg-gray-bg mt-3 outline-0" />
                    <div className='w-full h-[3rem] mt-4 bg-gray-bg flex items-center'>
                        <input type={`${isVisible?"text":"password"}`} autoComplete="off" name="password" placeholder="Password" className="h-full w-[90%] px-3 bg-gray-bg outline-0" />
                        {
                            isVisible?
                            <VscEye size={20} onClick={()=>setIsVisible(!isVisible)} className='cursor-pointer'/>
                            :
                            <VscEyeClosed size={20} onClick={()=>setIsVisible(!isVisible)} className='cursor-pointer'/>
                        }
                    </div>
                    <button type="submit" className="w-full mt-4 h-[3rem] bg-brand-color font-semibold">Sign In</button>
                </form>
                <p className="text-gray-400 cursor-pointer hover:text-white transition text-xs">Forgot password?</p>
                <Link to="/sign-up" className="text-gray-400 cursor-pointer hover:text-white transition mt-4 text-xs">New to Vidstream? sign-up</Link>
            </motion.div>
            </AnimatePresence>
        </AuthPageLayout>
    )
}

export default Login
