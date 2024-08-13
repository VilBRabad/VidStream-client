import { ChangeEvent, useState } from 'react'
import AuthPageLayout from './AuthPageLayout'
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';
import {motion, AnimatePresence} from "framer-motion"
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '../contexts/UserContext';


function Login() {
    const navigate = useNavigate();
    const {setUser} = useUser();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [data, setData] = useState<Record<string, string>>({
        "email": "",
        "password": ""
    });

    const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>)=>{
        setData(preData =>({
            ...preData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmitForm = async(e: ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/login", data, {
                withCredentials: true
            });
            
            const user = res.data.data;

            localStorage.setItem("user", JSON.stringify(user));
            toast.success("User logged in successfully");
            setUser(user);
            navigate("/");
        } catch (error) {
            console.log(error);
            if(axios.isAxiosError(error)){
                const res = error.response;
                if(res){
                    if(res.status === 404) toast.error("User Not Found! Sign up");
                    else if(res.status === 400) toast.error("All fields required!");
                    else if(res.status === 402) toast.error("Wrong email id or password");
                }
                else{
                    toast.error("Unknown error");
                    console.error('Unknown error: ', error);
                }
            }
            else{
                console.error("Unexpected Error");
                toast.error('An unexpected error occurred');
            }
        }
    };


    return (
        <AuthPageLayout>
            <AnimatePresence>
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="relative h-[33rem] w-[95%] sm:w-[30rem] bg-gray-bg/70 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
                <form onSubmit={handleSubmitForm} className="w-[80%] mb-8">
                    <input onChange={handleOnChangeInput} value={data.email} type="email" name="email" placeholder="Email address" className="w-full h-[3rem] px-3 bg-gray-bg mt-3 outline-0" />
                    <div className='w-full h-[3rem] mt-4 bg-gray-bg flex items-center'>
                        <input onChange={handleOnChangeInput} value={data.password} type={`${isVisible?"text":"password"}`} autoComplete="off" name="password" placeholder="Password" className="h-full w-[90%] px-3 bg-gray-bg outline-0" />
                        {
                            isVisible?
                            <VscEye size={20} onClick={()=>setIsVisible(!isVisible)} className='cursor-pointer'/>
                            :
                            <VscEyeClosed size={20} onClick={()=>setIsVisible(!isVisible)} className='cursor-pointer'/>
                        }
                    </div>
                    <button type="submit" className="w-full mt-4 h-[3rem] bg-brand-color font-semibold">Sign In</button>
                </form>
                <Link to="/forgot-password" className="text-gray-400 cursor-pointer hover:text-white transition text-xs">Forgot password?</Link>
                <Link to="/sign-up" className="text-gray-400 cursor-pointer hover:text-white transition mt-4 text-xs">New to Vidstream? sign-up</Link>
            </motion.div>
            </AnimatePresence>
        </AuthPageLayout>
    )
}

export default Login
