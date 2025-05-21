import React from "react";
import Link from "next/link";

function MoviesList(props) {
    return(
        <div className="my-4 border-2 border-solid rounded-lg p-3 border-white w-[15rem] mx-10 phone:w-[15rem]">
            <Link href={`/MovieDetail?id=${props.movieId}`}><img src={`https://image.tmdb.org/t/p/w500${props.poster}`} className="h-64 mx-auto my-2 ease-linear duration-200 hover:scale-105" /></Link>
            <p className="font-bold text-white">Movie Name : <span className="font-normal">{props.name}</span></p>
            <p className="font-bold text-white">Release Date : <span className="font-normal">{props.releaseDate}</span></p>
            <p className="font-bold text-white">Rating : {props.voteCount === 0 ? <span className="font-normal">Not Rating.</span>:(<span className="font-normal">{props.voteAverage}</span>)}</p>
        </div>
    )
}

export default MoviesList;