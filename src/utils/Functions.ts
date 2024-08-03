import { Cloudinary } from '@cloudinary/url-gen';
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { auto } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({ cloud: { cloudName: 'dr91ybej4' } });

const getUrl = (publicId: string) => {
    const img = cld
        .image(publicId)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()))

    const imgUrl = img.toURL();

    return imgUrl;
}


export {getUrl};