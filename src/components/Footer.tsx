import { IoMdArrowDropdown } from 'react-icons/io'

function Footer() {
    return (
        <div className="min-h-[10vh] max-w-screen bg-black text-white/70 px-[3%] pt-8 flex flex-col justify-center">
            <div className="w-full flex justify-center gap-1 md:gap-4 max-sm:text-sm flex-wrap">
                <p className="hover:text-white/90 cursor-pointer">Term of use</p>
                <p>|</p>
                <p className="hover:text-white/90 cursor-pointer">Privacy policy</p>
                <p>|</p>
                <p className="hover:text-white/90 cursor-pointer">Privacy policy</p>
                <p>|</p>
                <p className="hover:text-white/90 cursor-pointer">Privacy policy</p>
                <p>|</p>
                <p className="hover:text-white/90 cursor-pointer">Privacy policy</p>
            </div>
            <div className="h-[1px] bg-white/70 mt-2"></div>
            <div className="mt-2 flex justify-between max-md:text-xs">
                <div className="flex gap-1 md:gap-3">
                    <p className="md:tracking-[0.5rem]">VILAS DEV</p>
                    <p>|</p>
                    <p>@VidStream</p>
                </div>
                <button className="flex items-center gap-1 text-white/90"><IoMdArrowDropdown size={20} /> ENGLISH (US)</button>
            </div>
        </div>
    )
}

export default Footer
