interface IMovie {
    _id: string;
    title: string;
    description: string;
    duration: number;
    rating: number;
    poster: string;
    url: string;
    genre: string[];
    actors: string[];
    released_date: string;
    director: string;
    producer: string[];
    writer: string[];
    __v: any;
}