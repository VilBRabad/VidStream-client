import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { IMovie } from '../utils';
import { IoPlaySharp } from 'react-icons/io5';
import { GrBookmark } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

interface CloudinaryImageProps {
    movie: IMovie;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ movie }) => {

    const cld = new Cloudinary({ cloud: { cloudName: 'dr91ybej4' } });
    const navigate = useNavigate();


    const getShortDesc = (desc: string) => {
        if (desc.length > 70) {
            return desc.substring(0, 70);
        }
        return desc
    }

    const img = cld
        .image(movie.poster)
        .format('auto')
        .quality(10)
        .resize(auto().gravity(autoGravity()));

    return (
        <div onClick={()=>navigate(`/movie/${movie._id}`)} className="span-start overflow-hidden relative moviecard h-full poster cursor-pointer">
            <AdvancedImage className="poster-image absolute inset-0 w-full h-full object-cover transition duration-200 ease-in-out" cldImg={img} />
            <div className="movie-details transition ease-in-out duration-200 flex flex-col justify-end pb-6 opacity-0 absolute h-full w-full bg-gradient-to-b from-gray-bg/0 via-gray-bg/90 to-gray-bg bottom-0 pt-6 px-3">
                <p className='text-2xl font-semibold'>{movie.title}</p>
                <div className="flex mb-2 mt-2">
                    <p className="desc1">IMBD</p>
                    <p className="desc2">{movie.rating}</p>
                </div>
                <div className='flex gap-1'>
                    {
                        movie.genre.map((gen, ind) => (
                            <>
                                <p key={ind}>{gen} {ind === movie.genre.length - 1 ? "" : "| "}</p>
                            </>
                        ))
                    }
                </div>
                <div className='my-2 text-white/80'>
                    {getShortDesc(movie.description)}....
                </div>
                <p className='text-md'>Duration: {movie.duration} Minutes</p>
                <p className='text-md'>{movie.released_date}</p>
                <div className='flex gap-2 mt-2'>
                    <div className="bg-brand-color h-[2.2rem] w-auto px-4 flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-900/50 border border-brand-color transition">
                        <IoPlaySharp size={23} />
                        <p>Watch</p>
                    </div>
                    <div className="border px-1 flex items-center justify-center cursor-pointer bg-gray-900/50 hover:bg-brand-color transition border-brand-color">
                        <GrBookmark size={23} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CloudinaryImage