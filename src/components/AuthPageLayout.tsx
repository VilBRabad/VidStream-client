import { ReactNode, useEffect } from 'react'

interface AuthPageLayoutProps {
  children: ReactNode;
}

function AuthPageLayout({ children }: AuthPageLayoutProps) {


  return (
    <div
      className='relative h-screen w-screen bg-black flex items-center justify-center'>
      <div
        style={{
          backgroundImage: `${window.innerWidth > 681 ? "linear-gradient(to bottom left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('/assets/regi_2.jpeg')":"black"}`}}
          className='absolute  bg-cover bg-no-repeat h-[100%] w-[50rem] grayscale-[50%] rotate-y-180 right-0'
      >
      </div>
      {children}
      <div className='absolute bottom-6 w-full flex gap-4 items-center justify-center text-xs'>
        <p className='text-gray-400 hover:text-white transition cursor-pointer'>Terms & conditions applied</p>
        <p>|</p>
        <p className='text-gray-400 hover:text-white transition cursor-pointer'>Privacy & policies</p>
        <p>|</p>
        <p className='text-gray-400 hover:text-white transition cursor-pointer'>Contact us</p>
      </div>
    </div>
  )
}

export default AuthPageLayout
