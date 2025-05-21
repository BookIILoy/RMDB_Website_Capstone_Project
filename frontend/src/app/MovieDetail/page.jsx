"use client"
import { useSearchParams } from "next/navigation";
import React, { useState } from "react"
import MovieDetailList from "./moviedetail";
import { TiArrowUp } from "react-icons/ti";
import { TiArrowDown } from "react-icons/ti";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons"; // Importing regular user icon
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2';
import Link from 'next/link';
import jwt_decode from 'jwt-decode'

function MovieDetail() {
    const id = useSearchParams();
    const [isActive, setIsActive] = useState(false);
    const [isReview, setIsReview] = useState(false);
    const [overall, setOverall] = useState("Positive");
    const [subject, setSubject] = useState('');
    const [comment, setComment] = useState('');
    const movieOption = ["Positive", "Negative"];
    const [option, setOption] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [score, setScore] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [reviewItems, setReviewItems] = useState(4);
    const [totalReviews, setTotalReviews] = useState(0);
    const [haveReviews, setHaveReviews] = useState(false);
    const totalScore = 5;
    const [movie, setMovie] = useState([]);
    const movieId = id ? id.get('id') : null;



    const handleCreate = () => {
        const isLoggedIn = localStorage.getItem('token');
        if (!isLoggedIn) {
            Swal.fire({
                title : 'Login Required',
                text : 'You need to login first to write a review',
                icon : 'info',
                color : '#fff',
                customClass : 'swal-respon',
                background : '#333',
                confirmButtonText : 'Close'
            });
        } else {
            setIsReview(!isReview);
        }
    }
    
    const handleSubmit = () => {
        const isLoggedIn = localStorage.getItem('token');
        if (!isLoggedIn) {
            Swal.fire({
                title: 'Login Required',
                text: 'You need to login first to write a review',
                icon: 'info',
                color: '#fff',
                customClass: 'swal-respon',
                background: '#333',
                confirmButtonText: 'Close'
            });
            return;
        }
    
        if (subject && comment) {
            const token = localStorage.getItem('token');
    
            // Fetch user data from the /auth endpoint
            fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/api/users/auth`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(userData => {
                const { id, firstname } = userData.user;
                const movieIdInt = parseInt(movieId);
                const reviewData = {
                    user_id: id,
                    user_name: firstname,
                    movie_id: movieIdInt,
                    movie_name: movie.title,
                    score: score,
                    overall: overall,
                    subject: subject,
                    comment: comment
                };
                console.log('Review data:', reviewData);
                // Submit review data
                fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_DJANGO}/api/reviews/create/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the token in the headers
                    },
                    body: JSON.stringify(reviewData)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to submit review');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Review submitted successfully:', data);
                    Swal.fire({
                        title: 'Create Review Success',
                        text: 'Create Review successfully',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    });
                    setIsReview(false); // Close the review form after submission
                    setIsActive(!isActive); // set isActive to false to fetch new data
                    // set all input to create reviews to default when already create reviews
                    setOverall("Positive");
                    setComment('');
                    setSubject('');
                    setScore(0);
                })
                .catch(error => {
                    console.error('Error submitting review:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to submit review',
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to fetch user data',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Missing Comment or Subject Line',
                icon: 'warning',
                color: '#fff',
                customClass: 'swal-respon',
                background: '#333',
                confirmButtonText: 'Close'
            });
        }
    };
    // after click show more button it will plus reviewItems by 1 and it will show one more reviews
    const handleShowMore = () => {
        if(reviewItems === totalReviews){
            setReviewItems(reviewItems); // If reviewItems equal to total reviews it mean reviewItems is maximum so we will set reviewItems equal to itself
        }
        else{
            setReviewItems(reviewItems + 1);
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
    if(!isActive){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          const API_KEY = "22bd8561d5f68d41d4d6f2f5e3e28ab2"
          fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setMovie(result);
                setIsActive(!isActive);
                setIsLoading(true);
                fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_DJANGO}/api/reviews/?movie_id=${movieId}`, requestOptions)
                .then((res) => res.json())
                .then((results => {
                    setReviews(results.reviews); //set reviews data that got from API 
                    setTotalReviews(results.total_reviews); // set total reviews to check the reviews that show in the page
                    if(results.total_reviews === 0){
                        setHaveReviews(false); // If total reviews = 0 mean the movie has no reviews yet so the page will not show any reviews
                    }
                    else if(results.total_reviews < 4){
                        setReviewItems(results.total_reviews); // If the movie have reviews but less than 4 it will set reviewItems = total reviews to show all reviews that we have
                        setHaveReviews(true);
                    }
                    else{
                        setHaveReviews(true);
                    }
                }))
                .catch((error) => console.log(error));
            })
            .catch((error) => console.error(error));
    }

    if(isLoading){
        return(
            <div className="container mx-auto flex flex-col my-4 min-h-screen">
                {/* List Movie Detail by using Function from other jsx file */}
                {isActive ? 
                    <MovieDetailList movieId = {movie.id} 
                    backdrop = {movie.backdrop_path}
                    poster = {movie.poster_path}
                    genre = {movie.genre}
                    movieName = {movie.title}
                    page = {movie.homepage}
                    type = {movie.adult}
                    budget = {movie.budget}
                    language = {movie.original_language}
                    companies = {movie.production_companies}
                    date = {movie.release_date}
                    revenue = {movie.revenue}
                    time = {movie.runtime}
                    status = {movie.status}
                    tag = {movie.tagline}
                    vote = {movie.vote_average}
                    desc = {movie.overview}
                    />
                    :(null)
                }
                <div className="bg-white h-1 w-full phone:hidden">
                    <br />
                </div>
                <div className="my-4 flex items-center phone:justify-center tablet:mx-4">
                    <h2 className="text-white font-bold text-2xl">User Review</h2>
                    <div className="mx-5">
                        <button className="text-white border-2 border-solid border-white p-2 rounded-xl ease-in-out duration-300
                         hover:text-black hover:bg-white hover:border-white" onClick={handleCreate}>Create Review</button>
                             <Link href={`/Reviews?movieId=${movieId}`}>
                        <button className="text-white border-2 border-solid border-white p-2 rounded-xl ease-in-out duration-300
                            hover:text-black hover:bg-white hover:border-white ml-2">
                            Show All Reviews
                        </button>
                    </Link>
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
                    <p className="text-white font-bold my-4">Movie Overall :</p>
                        <span className="text-white border-2 border-solid border-black bg-blue-950 rounded-xl p-1 mx-2 w-[11rem]">
                            {overall}
                            <button className="text-white ml-2 float-right mt-1" onClick={(e) => setOption(!option)}>
                                <MdKeyboardArrowDown />
                            </button>
                            {option ? 
                                (movieOption.map((item) => (
                                    <span className=" text-white mx-4 cursor-pointer flex flex-col" onClick={(e) => {setOverall(item); setOption(!option)}}>{item}</span>
                                )))
                                : null
                            }
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
                    {/*If this movie have/has review(s) it will show up here /base show reviews is 4 but if total reviews < 4 it will show maximum reviews that they have*/}
                    {haveReviews ?
                        <div>
                            <div className="bg-white h-1 w-full my-4 phone:hidden">
                                <br />
                            </div>
                        <h1 className="text-white text-3xl font-bold mb-4 tablet:mx-2 phone:mx-2">Reviews</h1>
                            <div className="mt-4 ">
                                {reviews?.slice(0,reviewItems).map((review, index) => (
                                    <div key={review.id} className={`bg-blue-950 rounded-md p-4 mb-4 flex items-center phone:w-[365px]
                                     phone:mx-3 tablet:w-[740px] tablet:mx-4 ${index !== 0 ? 'mt-4' : ''}`}>
                                        <FontAwesomeIcon icon={faUser} className="text-white mr-4 text-5xl" />
                                        <div className="phone:w-[300px]">
                                            <p className="text-white font-bold text-xl mb-1">{review.user_name}</p>
                                            <p className="text-white text-lg mb-1">
                                                {review.overall === 'Positive' ? (
                                                    <span>
                                                        <FontAwesomeIcon icon={faThumbsUp} className="text-white mr-1" />
                                                        Positive
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <FontAwesomeIcon icon={faThumbsDown} className="text-white mr-1" />
                                                        Negative
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-white text-lg mb-1">
                                                <FontAwesomeIcon icon={faStar} className="text-white mr-1" />
                                                {review.score}
                                            </p>
                                            <p className="text-gray-500 font-bold mb-1">
                                                {review.subject}
                                            </p>
                                            <p className="text-gray-500 mb-0">
                                                Review: {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-center">
                                    {/*If total reviews is more than 4 it will show more reviews button for show more review */}
                                    {totalReviews > 4 ? 
                                    (reviewItems === totalReviews ? null :(
                                        <button className="text-white border-2 border-solid border-white 
                                        bg-blue-950 rounded-md px-2 py-1 my-4 ease-in-out duration-300 
                                         p-1 hover:bg-white hover:text-black hover:border-black" onClick={handleShowMore}>More Reviews</button>
                                    )) :(null)}
                                </div>
                            </div> 
                            </div>
                        : (
                        <div>
                            <div className="bg-white h-1 w-full my-4 phone:hidden">
                                <br />
                            </div>
                            <h1 className="text-white text-3xl font-bold mb-4">Reviews</h1>
                            <div className="mt-4">
                                <p className="text-white font-bold text-2xl">No reviews in this movie.</p>
                            </div>
                        </div>
                            )
                    }
            </div>
        )
    }
    else{
        return(
            <div className="container mx-auto min-h-screen">
                <h2 className="text-white font-bold text-2xl">Loading ...</h2>
            </div>
        )
    }
}

export default MovieDetail;