"use client"
import React, { useState } from "react";
import UpComingList from "./upcominglist";

function UpComingMovie() {
    const [active, setActive] = useState(false);
    const [pages, setPages] = useState(1);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [showItems, setShowItems] = useState(4);

    const handleShowMore = () => {
        if(showItems >= movies.length){
            setShowItems(showItems);
        }
        else{
            setShowItems(showItems + 4);
        }
    }
    const handleNextPage = () => {
        if(pages === totalPages){
            setPages(pages);
        }
        else{
            setPages(pages+1);
            setShowItems(4);
            setActive(!active);
        }
    }
    const handlePrevPage = () => {
        if(pages === 1){
            setPages(pages)
        }
        else{
            setPages(pages - 1);
            setShowItems(4);
            setActive(!active)
        }
    }
    if(!active){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          const API_KEY = "22bd8561d5f68d41d4d6f2f5e3e28ab2";
          
          fetch(`https://api.themoviedb.org/3/movie/upcoming?page=${pages}&api_key=${API_KEY}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTotalPages(result.total_pages);
                setActive(!active)
                setMovies(result.results)
            })
            .catch((error) => console.error(error));
        }
    return(
        <div className="container mx-auto flex justify-center flex-col phone:items-center">
            <h2 className=" text-white font-bold text-4xl">Upcoming Movies</h2>
            {active ? 
                <div className="container mx-auto flex justify-center flex-col phone:items-center">
                    {movies?.slice(0,showItems)?.map((item, id) => (
                        <UpComingList key={id}
                        movieId = {item.id}
                        movieName = {item.title}
                        backdrop = {item.backdrop_path}
                        genre = {item.genre_ids}
                        date = {item.release_date}
                        desc = {item.overview}
                        />
                    ))}
                </div>
                :(
                    <div className="text-white font-bold text-xl">
                        <p>Loading...</p>
                    </div>
                )
            }
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
                 {pages > 1 ? 
                    <button onClick={handlePrevPage} 
                    className="border-2 border-solid rounded-lg border-gray-800 my-4
                     bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out 
                    duration-150 w-[10rem]">Prev Page</button> :(null)
                 }
            </div>
            <div className="flex justify-center items-center">
                <p className="text-white">{pages}/{totalPages}</p>
            </div>
        </div>
    )
}

export default UpComingMovie;