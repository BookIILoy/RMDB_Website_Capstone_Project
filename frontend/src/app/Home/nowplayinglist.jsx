import Link from "next/link";
import React, { useEffect, useState } from "react";

function NowPlayingList(props) {
    const [active, setActive] = useState(false);
    const [allGenre, setAllGenre] = useState([]);
    const genre = props.genre;
    if(!active){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          const API_KEY = "22bd8561d5f68d41d4d6f2f5e3e28ab2";
          fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setAllGenre(result.genres);
                setActive(!active);
            })
            .catch((error) => console.error(error));
    }
    return(
        <div className="my-4  w-[13rem] mx-10 phone:w-[13rem]">
            <Link href={`/MovieDetail?id=${props.movieId}`}><img src={`https://image.tmdb.org/t/p/w500${props.poster}`} className="h-64 my-2 ease-linear duration-200
             hover:scale-105" /></Link>
            <p className="text-white">{props.movieName}</p>
                <span className="text-white opacity-50 text-xs"> | {allGenre?.map((item) => 
                    (genre?.map((id)=>(
                        (id === item.id  ? <span>{item.name} | </span>: (null))
                    )))
                )}</span>
        </div>
    )
}
/*{allGenre?.map((allItem) => 
                {genre?.map((item) => (
                    <p className="text-white">{allItem.id === item ? <span>{allItem.name} </span>:(null)}</p>
                ))}
            )} 
            (id === item.id ? <span className="text-white">{item.name},</span> : (null))*/
export default NowPlayingList;
