import React, { useState } from "react";
import Link from "next/link";

function UpComingList(props) {
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
        <div className="my-4 grid grid-cols-2 w-auto  phone:w-[13rem]  
        phone:flex phone:flex-col
        macbook:w-[65rem]">
            <div>
                <Link href={`/MovieDetail?id=${props.movieId}`}><img src={`https://image.tmdb.org/t/p/w500${props.backdrop}`} className="my-2 ease-linear duration-200
                hover:scale-105" /></Link>
            </div>
            <div className="my-2 mx-3">
            <p className="text-white opacity-50 text-xs">{props.date}</p>
            <p className="text-white">{props.movieName}</p>
            <span className="text-white opacity-50 text-xs"> | {allGenre?.map((item) => 
                    (genre?.map((id)=>(
                        (id === item.id  ? <span>{item.name} | </span>: (null))
                    )))
                )}</span>
            <p className="text-white opacity-50 text-xs">{props.desc}</p>
            </div>
        </div>
    )
}

export default UpComingList;

