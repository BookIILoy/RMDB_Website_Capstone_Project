import React from "react";
import Link from "next/link";

function PopularList(props) {
    return(
        <div className="my-4 w-[13rem] mx-10">
            <Link href={`/MovieDetail?id=${props.movieId}`}><img src={`https://image.tmdb.org/t/p/w500${props.poster}`} className="h-64 my-2 ease-linear duration-200
             hover:scale-105" /></Link>
        </div>
    )
}

export default PopularList;