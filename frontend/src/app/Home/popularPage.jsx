"use client"
import React, { useState } from "react";
import PopularList from "./popularlist";
import Link from "next/link";

function PopularHomePage() {
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
            setShowItems(showItems+4);
        }
    }
    if(!active){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          const API_KEY = "22bd8561d5f68d41d4d6f2f5e3e28ab2";
          
          fetch(`https://api.themoviedb.org/3/movie/popular?page=${pages}&api_key=${API_KEY}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setActive(!active);
                setMovies(result.results);
                setTotalPages(result.total_pages);
            })
            .catch((error) => console.error(error));
    }
    return(
        <div className="container mx-auto flex justify-center flex-col phone:items-center tablet:items-center">
            <h2 className="text-white font-bold text-4xl">What's Popular</h2>
            { active ?
                <div className="my-5 grid phone:grid-cols-1 tablet:grid-cols-2 macbook:grid-cols-4">
                    {movies?.slice(0,showItems)?.map((item,id) => (
                        <PopularList key={id}
                            movieId = {item.id}
                            poster = {item.poster_path}
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
                {showItems !== 20? 
                    <button onClick={handleShowMore}
                    className="border-2 border-solid rounded-lg border-gray-800 my-4
                    bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out 
                    duration-150 w-[10rem]">See More</button>
                :(
                    <Link href="/Popular" className="flex items-center justify-center border-2 border-solid rounded-lg border-gray-800 my-4
                    bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out 
                    duration-150 w-[10rem]">See All</Link>
                )
                }
            </div>
        </div>
    )
}

export default PopularHomePage;