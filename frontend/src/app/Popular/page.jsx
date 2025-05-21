"use client"
import React, { useState } from "react";
import NowPlayingList from "../Home/nowplayinglist";

function PopularPages() {
    const [isActive, setIsActive] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(1);
    const [movie, setMovie] = useState([]);

    const handleMorePage = () => {
        if(page >= totalPages){
            setPage(page);
        }
        else{
            setPage(page+1);
            setIsActive(!isActive)
        }
    }

    const handlePrevPage = () => {
        if(page === 1){
            setPage(page)
        }
        else{
            setPage(page-1);
            setIsActive(!isActive);
        }
    }

    if(!isActive){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
        const API_KEY = "22bd8561d5f68d41d4d6f2f5e3e28ab2";
          fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${API_KEY}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsActive(!isActive);
                setMovie(result.results);
                setTotalPages(result.total_pages);
                setTotalResults(result.total_results);
            })
            .catch((error) => console.error(error));
    }
    return(
        <div className="container mx-auto min-h-screen my-4">
            <div className="flex justify-center items-center flex-col">
                <h2 className="text-white font-bold text-2xl phone:text-xs">Popular Movies</h2>
                {totalResults === 0 ? <p className="text-white my-5">Movie Not Found.</p> : (
                    <div className="grid phone:grid-cols-1 tablet:grid-cols-2 macbook:grid-cols-4">
                        {movie?.map((item, id) => (
                        <NowPlayingList key={id} 
                            movieId = {item.id}
                            movieName = {item.title}
                            poster = {item.poster_path}
                            genre = {item.genre_ids}
                        />
                    ))}
                    </div>
                )}
                {totalResults !== 0 ?
                    <div className="my-4">
                        <p className="text-white text-center">{page}/{totalPages}</p>
                        {page === 1 ? null :(
                            <button className="text-black my-5 border-4 border-solid border-white rounded-xl p-2 bg-white mx-4
                            hover:bg-gray-500 hover:text-white hover:border-gray-500 ease-in-out duration-150" onClick={handlePrevPage}>Prev Page</button>
                        )}
                        {page === totalPages ? null :(
                            <button className="text-black my-5 border-4 border-solid border-white rounded-xl p-2 bg-white
                            hover:bg-gray-500 hover:text-white hover:border-gray-500 ease-in-out duration-150" onClick={handleMorePage}>Next Page</button>
                        )}
                    </div> 
                    :(null)
                }
            </div>
        </div>
    )
}

export default PopularPages;