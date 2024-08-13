import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { Cloudinary } from '@cloudinary/url-gen/index';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import React from 'react'

type NormalCloudImageProps = {
    movie: IMovie;
}

const NormalCloudImage: React.FC<NormalCloudImageProps> = ({ movie }) => {
    const cld = new Cloudinary({ cloud: { cloudName: 'dr91ybej4' } });
    const img = cld
        .image(movie.poster)
        .format('auto')
        .quality(10)
        .resize(auto().gravity(autoGravity()));
        
  return (
        <AdvancedImage className="w-full h-full object-cover" cldImg={img} />
  )
}

export default NormalCloudImage