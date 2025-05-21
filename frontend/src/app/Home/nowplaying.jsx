"use client"
import React, { useState } from "react"
import NowPlayingList from "./nowplayinglist";

function NowPlaying() {
    const [active, setActive] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState('1');
    const [nowplayingMovie, setNowPlayingMovie] = useState([]);
    const [showItems, setShowItems] = useState(12);
    const handleShowMore = () => {
        if(showItems >= nowplayingMovie.length){
            setShowItems(showItems);
        }
        else{
            setShowItems(showItems+8);
        }
    }
    const handleNextPage = () => {
        if(page === totalPages){
            setPage(page);
        }
        else{
            setPage(page+1);
            setShowItems(12);
            setActive(!active);
        }
    }
    if(!active){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          const API_KEY = "22bd8561d5f68d41d4d6f2f5e3e28ab2";
          fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${API_KEY}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setNowPlayingMovie(result.results);
                setTotalPages(result.total_pages);
                setActive(!active)
            })
            .catch((error) => console.error(error));
    }
    return(
        <div className="container mx-auto flex justify-center flex-col phone:items-center tablet:items-center">
            <h2 className="text-white font-bold text-4xl">Now Playing</h2>
            { active ? 
                <div className="my-5 grid phone:grid-cols-1 tablet:grid-cols-2 macbook:grid-cols-4">
                    {nowplayingMovie?.slice(0,showItems)?.map((item, id) => (
                        <NowPlayingList key={id} 
                            movieId = {item.id}
                            movieName = {item.title}
                            poster = {item.poster_path}
                            genre = {item.genre_ids}
                        />
                    ))}
                </div>
            :(
                <div className="text-white font-bold text-xl">
                    <p>Loading...</p>
                </div>
            )}
            <div className="flex justify-center items-center">
            {showItems !== 20 ? 
            <button onClick={handleShowMore} 
                className="border-2 border-solid rounded-lg border-gray-800 my-4
                 bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out 
                 duration-150 w-[10rem]">See More</button>:(
            <button onClick={handleNextPage} 
                className="border-2 border-solid rounded-lg border-gray-800 my-4
                bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out 
                duration-150 w-[10rem]">Next Page</button>
             )}
            </div>
        </div>
    )
}

export default NowPlaying;