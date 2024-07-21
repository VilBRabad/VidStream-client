import { GrBookmark } from "react-icons/gr"
import { RiSearch2Line } from "react-icons/ri"
import { VscAccount } from "react-icons/vsc"
import logo from "/assets/logo2.svg"
import { motion, AnimatePresence } from "framer-motion"
import { MdArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { PiCrownSimple } from "react-icons/pi";
import { Link } from "react-router-dom"

function Navbar() {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [browseMenu, setBrowseMenu] = useState<boolean>(false);
    const [accoutnt, setAccount] = useState<boolean>(false);

    const handleBrowseClick = () => {
        if ((browseMenu && isVisible) || (!browseMenu && !isVisible)) {
            setBrowseMenu(!isVisible);
            setIsVisible(!browseMenu);
        }
        else if (!browseMenu && isVisible) {
            setBrowseMenu(true);
            setAccount(false);
        }
    }

    const handleAccountClick = () => {
        if ((accoutnt && isVisible) || (!accoutnt && !isVisible)) {
            setAccount(!accoutnt);
            setIsVisible(!isVisible);
        }
        else if (!accoutnt && isVisible) {
            setAccount(true);
            setBrowseMenu(false);
        }
    }

    const handleToggle = () => {
        setIsVisible(false);
        setAccount(false);
        setBrowseMenu(false);
    }

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add("no-scroll");
        }
        else {
            document.body.classList.remove("no-scroll");
        }

        return () => document.body.classList.remove("no-scroll");
    }, [isVisible])

    return (
        <>
            <div className="fixed top-0 w-screen h-[3.5rem] flex justify-between px-4 lg:px-20 bg-gray-bg z-[100]">
                <div className="relative flex gap-3 items-center z-[80]">
                    <img src={logo} alt="logo" className="w-[1.2rem] h-[1.9rem]" />
                    <Link to="/" className="font-bold text-xl text-brand-color">VIDSTREAM</Link>
                    <div className="relative h-full">
                        <div onClick={handleBrowseClick} className={`ml-4 max-[861px]:hidden text-sm cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-dk ${browseMenu ? "bg-gray-dk" : ""} h-full px-3`}>
                            <p>Browse</p>
                            <MdArrowDropDown size={22} />
                        </div>
                        {browseMenu &&
                            <>
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, scaleY: 0.5 }}
                                        animate={{ opacity: 1, scaleY: 1 }}
                                        exit={{ opacity: 0, scaleY: 0.5 }}
                                        style={{ transformOrigin: "top" }}
                                        className="absolute h-auto w-auto bg-gray-dk left-4 top-0 mt-[3.5rem] py-6 flex z-[80] max-[861px]:hidden">
                                        <div className="flex flex-col gap-1 h-full w-[11rem] border-r-2 border-gray-bg">
                                            <p className="py-2 px-5 hover:bg-gray-bg transition cursor-pointer">Popular</p>
                                            <p className="py-2 px-5 hover:bg-gray-bg transition cursor-pointer">New</p>
                                            <p className="py-2 px-5 hover:bg-gray-bg transition cursor-pointer">Alphabetical</p>
                                            <p className="py-2 px-5 hover:bg-gray-bg transition cursor-pointer">Release calender</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-500 pl-4 mb-3">GENRE</p>
                                            <div className="grid grid-rows-3 grid-flow-col gap-2">
                                                <p className="py-2 px-5 w-[10rem] hover:bg-gray-bg cursor-pointer">Action</p>
                                                <p className="py-2 px-5 w-[10rem] hover:bg-gray-bg cursor-pointer">Adventure</p>
                                                <p className="py-2 px-5 w-[10rem] hover:bg-gray-bg cursor-pointer">Comedy</p>
                                                <p className="py-2 px-5 w-[10rem] hover:bg-gray-bg cursor-pointer">Drama</p>
                                                <p className="py-2 px-5 w-[10rem] hover:bg-gray-bg cursor-pointer">Fantasy</p>
                                                <p className="py-2 px-5 w-[10rem] hover:bg-gray-bg cursor-pointer">Rommance</p>
                                                <p className="py-2 px-5 w-[10rem] hover:bg-gray-bg cursor-pointer">Sci-Fi</p>
                                                <p className="py-2 px-5 w-[10rem] hover:bg-gray-bg cursor-pointer">Sports</p>
                                                <p className="py-2 px-5 w-[10rem] hover:bg-gray-bg cursor-pointer">Thriller</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </>
                        }
                    </div>
                </div>
                <div className="flex items-center ">
                    <Link to="/search" className="h-full">
                        <div className="hover:bg-gray-dk h-full px-4 flex items-center">
                            <RiSearch2Line size={21} />
                        </div>
                    </Link>
                    <div className="hover:bg-gray-dk h-full px-4 flex items-center">
                        <GrBookmark size={20} />
                    </div>
                    <div className="relative h-full">
                        <div onClick={handleAccountClick} className={`hover:bg-gray-dk ${accoutnt ? "bg-gray-dk" : ""} h-full px-4 flex items-center`}>
                            <VscAccount size={21} />
                        </div>
                        {
                            accoutnt &&
                            <>
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, scaleY: 0.5 }}
                                        animate={{ opacity: 1, scaleY: 1 }}
                                        exit={{ opacity: 0, scaleY: 0.5 }}
                                        style={{ transformOrigin: "top" }}
                                        className="absolute h-auto w-[25rem] bg-gray-dk right-0"
                                    >
                                        <div onClick={handleToggle} className="px-5 py-3 hover:bg-gray-bg cursor-pointer mt-3">
                                            <Link to="/sign-up">
                                                <p>Create account</p>
                                                <p className="text-white/70">Join for free & enjoy</p>
                                            </Link>
                                        </div>
                                        <div onClick={handleToggle} className="px-5 py-3 hover:bg-gray-bg cursor-pointer">
                                            <Link to="/sign-in">
                                                <p>Login</p>
                                                <p className="text-white/70">Already joined Vidstream? Welcome back</p>
                                            </Link>
                                        </div>
                                        <div onClick={handleToggle} className="m-5 flex h-[2.7rem] bg-amber-500 text-black items-center justify-center gap-2 cursor-pointer">
                                            <PiCrownSimple size={22} />
                                            <p>TRY FREE PREMIUM</p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </>
                        }
                    </div>
                </div>
            </div>
            {isVisible &&
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-gray-bg bg-opacity-80 z-50" onClick={handleToggle}
                    />
                </AnimatePresence>
            }
        </>
    )
}

export default Navbar;