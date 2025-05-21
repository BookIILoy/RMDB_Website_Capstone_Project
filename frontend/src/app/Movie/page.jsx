"use client"
import React, { useState } from "react";
import MoviesList from "./movielist";

function TestAPIs() {
    const [year, setYear] = useState('2024');
    const [pages, setPages] = useState('1');
    const [totalPages, setTotalPages] = useState('1');
    const [movie, setMovie] = useState([]);
    const [active, setActive] = useState(false)
    const handleSubmit = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          const API_KEY = "22bd8561d5f68d41d4d6f2f5e3e28ab2";

          fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&page=${pages}&api_key=${API_KEY}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setMovie(result.results);
                setTotalPages(result.total_pages);
                if(active){
                    setActive(active);
                }else{
                    setActive(!active);
                }
            })
            .catch((error) => console.error(error));
    }
    return (
        <div className="container mx-auto background white flex my-5 flex-col items-center min-h-screen">
            <h1 className="text-white">Test Page</h1>
            <input type="text" className="text-center border-2 border-solid rounded-lg border-white" value={year} 
                onChange={(e) => setYear(e.target.value)} />
            <button onClick={handleSubmit} className="border-2 border-solid rounded-lg border-gray-800 my-4 bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out duration-150">Test APIs</button>
            { active ? 
                <div className="my-5 grid grid-cols-5 phone:grid-cols-1 tablet:grid-cols-2 macbook:grid-cols-3">
                    {movie?.map((item, id) => (
                        <MoviesList key={id} movieId = {item.id} poster = {item.poster_path} type = {item.adult} name = {item.title} language = {item.original_language} releaseDate = {item.release_date} Desc = {item.overview} voteCount = {item.vote_count} voteAverage = {item.vote_average}/>
                    ))}
                </div>
            :(
                <div className="test-con">
                    <p>Nothing</p>
                </div>
            )}
            <div className="">
                    <p className="text-white"><input type="text" placeholder="1" className="text-center border-2 border-solid rounded-lg border-black text-black w-6 bg-white" 
                        value={pages} onChange={(e) => setPages(e.target.value)} onKeyUp={handleSubmit}/>/{totalPages}</p>
            </div>
        </div>
    )
}

export default TestAPIs;