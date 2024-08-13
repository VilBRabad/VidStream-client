import { ChangeEvent, useState } from 'react'
import AuthPageLayout from './AuthPageLayout'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function ForgotPassword() {
    const [email, setEmail] = useState<string>("");
    const [isEmailSent, setEmailSent] = useState<boolean>(false);

    const handleSubmitForm = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/send-reset-link", { email });

            if(res.status === 200) setEmailSent(true);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const res = error.response;
                if (res) {
                    if (res.status === 404) toast.error("Email Not Found! Sign up");
                    else if (res.status === 400) toast.error("All fields required!");
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
                    {isEmailSent ? 
                        <>
                            <p className="text-lg mb-6 text-center">Link for reset password sent on <p className='text-blue-400'>{email}</p> Open check youe mail box</p>
                        </>
                        :
                        <>
                            <h1 className="text-2xl font-semibold mb-6">Forgot Password?</h1>
                            <form onSubmit={handleSubmitForm} className="w-[80%] mb-8">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" placeholder="Email address" className="w-full h-[3rem] px-3 bg-gray-bg mt-3 outline-0" />
                                <button type="submit" className="w-full mt-4 h-[3rem] bg-brand-color font-semibold">Send reset link</button>
                            </form>
                        </>
                    }
                    <Link to="/sign-in" className="text-gray-400 cursor-pointer hover:text-white transition mt-4 text-xs">Back to sign-in</Link>
                </motion.div>
            </AnimatePresence>
        </AuthPageLayout>
    )
}

export default ForgotPassword