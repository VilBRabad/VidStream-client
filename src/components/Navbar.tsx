import { GrBookmark } from "react-icons/gr"
import { RiSearch2Line } from "react-icons/ri"
import { VscAccount } from "react-icons/vsc"
import logo from "/assets/logo2.svg"


function Navbar() {
    return (
        <div className="absolute w-full h-[3.5rem] flex justify-between px-4 md:px-20 bg-gray-bg z-50">
            <div className="font-bold text-xl text-brand-color flex gap-3 items-center">
                <img src={logo} alt="logo" className="w-[1.2rem] h-[1.9rem]" />
                <h1>VIDSTREAM</h1>
            </div>
            <div className="flex items-center ">
                <div className="hover:bg-gray-dk h-full px-4 flex items-center">
                    <RiSearch2Line size={21} />
                </div>
                <div className="hover:bg-gray-dk h-full px-4 flex items-center">
                    <GrBookmark size={20} />
                </div>
                <div className="hover:bg-gray-dk h-full px-4 flex items-center">
                    <VscAccount size={21} />
                </div>
            </div>
        </div>
    )
}

export default Navbar
