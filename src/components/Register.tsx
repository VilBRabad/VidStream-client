import { Link } from "react-router-dom"
import AuthPageLayout from "./AuthPageLayout"
import {motion, AnimatePresence} from "framer-motion"

function Register() {

    return (
        <AuthPageLayout>
            <AnimatePresence>
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="relative h-[33rem] w-[95%] sm:w-[30rem] bg-gray-bg/50 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
                <form className="w-[80%] mb-8">
                    <input type="email" name="email" placeholder="Email address" className="w-full h-[3rem] outline-0 px-3 bg-gray-bg mt-3"/>
                    <input type="password" autoComplete="off" name="password" placeholder="Password" className="w-full h-[3rem] outline-0 px-3 bg-gray-bg mt-3"/>
                    <input type="password" autoComplete="off" name="cpassword" placeholder="Confirm password" className="w-full h-[3rem] outline-0 px-3 bg-gray-bg mt-3"/>
                    <button type="submit" className="w-full mt-4 h-[3rem] bg-brand-color font-semibold">Register</button>
                </form>
                <Link to="/sign-in" className="text-gray-400 cursor-pointer hover:text-white transition mt-2 text-xs">Already registered? sign-in</Link>
            </motion.div>
            </AnimatePresence>
        </AuthPageLayout>
    )
}

export default Register
