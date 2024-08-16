import { Cloudinary } from '@cloudinary/url-gen';
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { auto } from "@cloudinary/url-gen/actions/resize";
import toast from 'react-hot-toast';
import axios from 'axios';

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


const addToWatchList = async(movieId?: string)=>{
    if(!movieId){
        toast.error("Invalid movie!");
        return;
    }
    try {
        const res = await axios.post("http://localhost:8000/api/v1/user/add-to-watchlist", {movieId}, {withCredentials: true});

        if(res.status === 200){
            toast.success("Added to watchlist");
        }
    } catch (error) {
        if(axios.isAxiosError(error)){
            const res = error.response;
            if(res){
                if(res.status === 402 ) toast.error("Un-authorized request!");
                else if(res.status === 400) toast.error("Movie not found");
                else if(res.status === 401) toast.error("Something went wrong! please try to login again");
                else if(res.status === 405) toast.error("Already in watch list");
            }
            else{
                toast.error("Server error");
                console.error('Unknown error: ', error);
            }
        }
        else{
            toast.error("Un-expected error");
        }
    }
}


const removeFromWatchList = async(movieId?: string)=>{
    if(!movieId){
        toast.error("Invalid movie!");
        return;
    }
    try {
        const res = await axios.post("http://localhost:8000/api/v1/user/remove-from-watchlist", {movieId}, {withCredentials: true});

        if(res.status === 200){
            toast.success("Successfully remove");
        }
    } catch (error) {
        if(axios.isAxiosError(error)){
            const res = error.response;
            if(res){
                if(res.status === 402 ) toast.error("Un-authorized request!");
                else if(res.status === 400) toast.error("Movie not found");
                else if(res.status === 401) toast.error("Something went wrong! please try to login again");
                else if(res.status === 405) toast.error("Already in watch list");
            }
            else{
                toast.error("Server error");
                console.error('Unknown error: ', error);
            }
        }
        else{
            toast.error("Un-expected error");
        }
    }
}

export {
    getUrl, 
    addToWatchList,
    removeFromWatchList
};