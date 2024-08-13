import { AnimatePresence, motion } from "framer-motion"
import AuthPageLayout from "./AuthPageLayout"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { VscEye, VscEyeClosed } from "react-icons/vsc"

function ResetPassword() {
    const location = useLocation();
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isReset, setIsReset] = useState<string | null>(null);
    const navigate = useNavigate();

    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
    const [isCPasswordVisible, setCPasswordVisible] = useState<boolean>(false);


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get("token");
        if (!token) navigate("/sign-in");
    }, []);

    const validatePassword = (password: string): string | null => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

        if (!passwordRegex.test(password)) {
            return 'Password must be at least 6 characters long, contain at least one capital letter, one lowercase letter, one number, and one special character';
        }

        return null
    }


    const handleSubmitForm = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== cpassword) {
            setError("Password dose not match");
            return;
        }

        const validateErr = validatePassword(password);
        if (validateErr) {
            setError(validateErr);
            return;
        }

        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/reset-password${location.search}`, { password })

            if (res.status === 200) toast.success("Password reset successfully");
            setIsReset("Successfully reset password");
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const res = error.response;
                if (res) {
                    if (res.status === 400) toast.error("Password required");
                    else {
                        toast.error("Link expired!");
                        setIsReset("Link is expired!, Please forgot password again.")
                    }
                }
                else {
                    toast.error("Unknown error");
                    console.error('Unknown error: ', error);
                }
            }
            else {
                console.error("Unexpected Error");
                toast.error('An unexpected error occurred');
            }
        }
        setError(null);
    }

    return (
        <AuthPageLayout>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="relative h-[33rem] w-[95%] sm:w-[30rem] bg-gray-bg/70 flex flex-col items-center justify-center"
                >
                    {isReset ?
                        <div>
                            <p>{isReset}</p>
                        </div>
                        :
                        <>
                            <h1 className="text-2xl font-semibold mb-6">Reset Password?</h1>
                            <form onSubmit={handleSubmitForm} className="w-[80%] mb-8">
                                <div className='w-full h-[3rem] mt-4 bg-gray-bg flex items-center'>
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} type={`${isPasswordVisible ? "text" : "password"}`} autoComplete="off" name="password" placeholder="Password" className="h-full w-[90%] px-3 bg-gray-bg outline-0" />
                                    {
                                        isPasswordVisible ?
                                            <VscEye size={20} onClick={() => setPasswordVisible(!isPasswordVisible)} className='cursor-pointer' />
                                            :
                                            <VscEyeClosed size={20} onClick={() => setPasswordVisible(!isPasswordVisible)} className='cursor-pointer' />
                                    }
                                </div>
                                <div className='w-full h-[3rem] mt-4 bg-gray-bg flex items-center'>
                                    <input onChange={e=>setCPassword(e.target.value)} value={cpassword} type={`${isCPasswordVisible ? "text" : "password"}`} autoComplete="off" name="cpassword" placeholder="Confirm password" className="h-full w-[90%] px-3 bg-gray-bg outline-0" />
                                    {
                                        isCPasswordVisible ?
                                            <VscEye size={20} onClick={() => setCPasswordVisible(!isCPasswordVisible)} className='cursor-pointer' />
                                            :
                                            <VscEyeClosed size={20} onClick={() => setCPasswordVisible(!isCPasswordVisible)} className='cursor-pointer' />
                                    }
                                </div>
                                <p className="text-red-500">{error}</p>
                                <button type="submit" className="w-full mt-4 h-[3rem] bg-brand-color font-semibold">Update password</button>
                            </form>
                        </>
                    }
                    <Link to="/sign-in" className="text-gray-400 cursor-pointer hover:text-white transition mt-4 text-xs">Back to sign-in</Link>
                </motion.div>
            </AnimatePresence>
        </AuthPageLayout>
    )
}

export default ResetPassword