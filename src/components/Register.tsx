import { Link, useNavigate } from "react-router-dom"
import AuthPageLayout from "./AuthPageLayout"
import {motion, AnimatePresence} from "framer-motion"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";

function Register() {

    const [data, setData] = useState<Record<string, string>>({
        "email": "",
        "password": "",
        "cpassword": ""
    });
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    

    const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setData(prevData => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
    };


    const validatePassword = (password: string) : string | null=>{
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

        if(!passwordRegex.test(password)){
            return 'Password must be at least 6 characters long, contain at least one capital letter, one lowercase letter, one number, and one special character';
        }
        
        return null
    }

    const handleSubmitForm = async(e: ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("");
        
        if(data.password !== data.cpassword) {
            setError("password does not match");
            return;
        }

        const validateErr = validatePassword(data.password);
        if(validateErr){
            setError(validateErr);
            return;
        }

        try {
            await axios.post("http://localhost:8000/api/v1/user/register", data);

            toast.success("User created successfully");
            navigate("/sign-in");

        } catch (error:unknown) {
            if(axios.isAxiosError(error)){
                const res = error.response;
                if(res){
                    if(res.status === 402) toast.error("User already exists! Sign in");
                    else if(error.status === 400) toast.error("All fields required!");
                    else toast.error("Server Error");
                }
                else{
                    toast.error("Unknown error");
                    console.error('Unknown error: ', error);
                }
            }
            else{
                console.error('Unexpected error: ', error);
                toast.error('An unexpected error occurred');
            }
        }
    }

    return (
        <AuthPageLayout>
            <AnimatePresence>
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="relative h-[33rem] w-[95%] sm:w-[30rem] bg-gray-bg/50 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
                <form onSubmit={handleSubmitForm} className="w-[80%] mb-8">
                    <input onChange={handleOnChangeInput} value={data.email} type="email" name="email" required placeholder="Email address" className="w-full h-[3rem] outline-0 px-3 bg-gray-bg mt-3"/>
                    <input onChange={handleOnChangeInput} value={data.password} type="password" autoComplete="off" required name="password" placeholder="Password" className="w-full h-[3rem] outline-0 px-3 bg-gray-bg mt-3"/>
                    <input onChange={handleOnChangeInput} value={data.cpassword} type="password" autoComplete="off" required name="cpassword" placeholder="Confirm password" className="w-full h-[3rem] outline-0 px-3 bg-gray-bg mt-3 mb-2"/>
                    {error.length > 0 && <span className="text-red-600">{error}</span>}
                    <button type="submit" className="w-full mt-2 h-[3rem] bg-brand-color font-semibold">Register</button>
                </form>
                <Link to="/sign-in" className="text-gray-400 cursor-pointer hover:text-white transition mt-2 text-xs">Already registered? sign-in</Link>
            </motion.div>
            </AnimatePresence>
        </AuthPageLayout>
    )
}

export default Register
