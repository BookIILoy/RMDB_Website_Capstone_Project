"use client"
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TiArrowUp } from "react-icons/ti";
import { TiArrowDown } from "react-icons/ti";
import { MdKeyboardArrowDown } from "react-icons/md";
import Swal from 'sweetalert2';
import TVShowDetailList from "./TVShowDetail";

function TVShowDetail() {
    const id = useSearchParams();
    const TVShowId = id ? id.get('id') : null;
    const [isActive, setIsActive] = useState(false);
    const [TVShow, setTVShow] = useState([]);
    const [isReview, setIsReview] = useState(false);
    const [score, setScore] = useState(0);
    const totalScore = 5;
    const [overall, setOverall] = useState("Positive/Negative");
    const [subject, setSubject] = useState('');
    const [comment, setComment] = useState('');
    const [option, setOption] = useState(false);
    const movieOption = ["Positive", "Negative"];

    const handleCreate = () => {
            setIsReview(!isReview);
    }
    const handleSubmit = () => {
        if(subject && comment){
            setIsReview(!isReview)
        }
        else{
            Swal.fire({
                title : 'Error',
                text : 'Missing in Comment / Subject Line',
                icon : 'warning',
                color : '#fff',
                customClass : 'swal-respon',
                background : '#333',
                confirmButtonText : 'close'
            })
        }
    }
    const handleAddScore = () => {
        if(score === totalScore){
            setScore(score);
        }
        else{
            setScore(score+0.5);
        }
    }
    const handleMinusScore = () => {
        if(score === 0){
            setScore(score);
        }
        else{
            setScore(score-0.5);
        }
    }

        if (!isActive) {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
            const API_KEY = "22bd8561d5f68d41d4d6f2f5e3e28ab2";
            fetch(`https://api.themoviedb.org/3/tv/${TVShowId}?api_key=${API_KEY}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setTVShow(result);
                    setIsActive(!isActive); // Set isActive to true after fetching data
                })
                .catch((error) => console.error(error));
        }

    return (
        <div className="container mx-auto flex flex-col my-4 min-h-screen">
            {isActive ?
                <TVShowDetailList TVShowId = {TVShow.id}
                type = {TVShow.adult}
                backdrop = {TVShow.backdrop_path}
                genre = {TVShow.genres}
                TVName = {TVShow.name}
                createdBy = {TVShow.created_by}
                firstAir = {TVShow.first_air_date}
                page = {TVShow.homepage}
                lastAir = {TVShow.last_air_date}
                lastEpAir = {TVShow.last_episode_to_air}
                nextEpAir = {TVShow.next_episode_to_air}
                networks = {TVShow.networks}
                totalEp = {TVShow.number_of_episodes}
                totalSeason = {TVShow.number_of_seasons}
                seasons = {TVShow.seasons}
                status = {TVShow.in_production}
                vote = {TVShow.vote_average}
                desc = {TVShow.overview}
                companies = {TVShow.production_companies}
                tag = {TVShow.tagline}
                />
                :(null)
            }
            <div className="bg-white h-1 w-full phone:hidden">
                <br />
            </div>
            <div className="my-4 flex items-center phone:justify-center tablet:mx-4">
                <h2 className="text-white font-bold text-2xl">User Review</h2>
                <div className="mx-5">
                    {isReview ? 
                        <button className="text-white border-2 border-solid border-white p-2 rounded-xl ease-in-out duration-300
                        hover:text-black hover:bg-white hover:border-white" onClick={handleCreate}>Close Review</button>
                    :(
                        <button className="text-white border-2 border-solid border-white p-2 rounded-xl ease-in-out duration-300
                      hover:text-black hover:bg-white hover:border-white" onClick={handleCreate}>Create Review</button>
                    ) 
                    }
                </div>
            </div>
            {isReview ? 
                <div className="flex flex-col phone:justify-center phone:items-center tablet:mx-4">
                {/*Score Part*/}
                    <p className="text-white font-bold">Score:
                    <span className="text-white font-normal mx-4">{score} / {totalScore}</span>
                        {score !== 5 ? <button className="border-2 border-solid border-white rounded-full ease-in-out duration-300 
                        justify-center p-1 mx-2 hover:bg-white hover:text-black hover:border-black" onClick={handleAddScore}><TiArrowUp /></button>:(null)}
                        {score === 0 ? null:
                        (<button className="border-2 border-solid border-white rounded-full ease-in-out duration-300 
                        justify-center p-1 hover:bg-white hover:text-black hover:border-black" onClick={handleMinusScore}><TiArrowDown /></button>)}
                    </p>
                {/*Positive or Negative Part*/}
                    <p className="text-white font-bold my-4">TVShow Overall :</p>
                    <span className="text-white border-2 border-solid border-black bg-blue-950 rounded-xl p-1 mx-2 w-[11rem]">{overall}
                    <button className="text-white ml-2 float-right mt-1" onClick={(e) => setOption(!option)}><MdKeyboardArrowDown /></button>
                    {option ? (movieOption.map((item) => (
                        <span className=" text-white mx-4 cursor-pointer flex flex-col" onClick={(e) => {setOverall(item); setOption(!option)}}>{item}</span>
                    ))):(null)}
                    </span>
                {/*Head Subject Part */}
                    <p className="text-white font-bold my-4">Subject Line</p>
                    <input type="text" placeholder="Subject Line" required value={subject} onChange={(e) => setSubject(e.target.value)} 
                    className="p-1 px-2 border-2 border-solid border-black bg-blue-950 rounded-md text-white placeholder:text-gray"/>
                {/*Comment Part */}
                    <p className="text-white font-bold my-4">Comment</p>
                    <textarea rows="4" name="comment" placeholder="comment" 
                    className="p-1 px-2 border-2 border-solid border-black bg-blue-950 rounded-md text-white placeholder:text-gray" 
                    required value={comment} onChange={(e) => setComment(e.target.value)}/>
                    <div className="flex justify-center">
                        <button type="submit" className="text-white border-2 border-solid border-white bg-blue-950 rounded-md px-2 py-1 my-4"
                        onClick={handleSubmit}>Submit</button>
                    </div>
                </div> :(null)}
        </div>
    );
}

export default TVShowDetail;