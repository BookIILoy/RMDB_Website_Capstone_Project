'use client'

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';

const apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2';

function MovieRecommendationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [search, setSearch] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]); // State to hold recommended movies
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setMovieSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
        const data = await response.json();
        const filteredMovies = data.results.filter(movie => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        setMovieSuggestions(filteredMovies);
        setSearch(true)
        if(showSuggestions == false){
          if(search){
            setShowSuggestions(true);
          }
        }

      } catch (error) {
        console.error('Error fetching movie suggestions:', error);
      }
    };

    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_DJANGO}/api/recommend/`, { movie_title: searchQuery });
      const recommendedMoviesData = response.data.Recommend.flat(); 
      setRecommendedMovies(recommendedMoviesData); 
    } catch (error) {
      console.error('Error fetching movie recommendations:', error);
    }
  };

  const handleRecommendedMovieClick = (e, movie) => {
    e.stopPropagation();
    if(movie.movie_id){
      const movieId = movie.movie_id.toString(); 
      setSearchQuery(movieId.trim()); 
    } else {
      const movieId = movie.id.toString();
      setSearchQuery(movieId.trim());
    } 
  };

  const handleSuggestionClick = (e, movie) => {
    e.stopPropagation(); 
    setSearchQuery(movie.title);
    setShowSuggestions(false);
    setSearch(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800 min-h-screen">
      <Head>
        <title>Movie Recommendations</title>
      </Head>
      <h1 className="text-4xl font-bold mb-8 text-white">Movie Recommendations</h1>
      <p className="text-white mb-5 text-lg pl-4">What movie do you prefer watching?</p>
      <form onSubmit={handleSearchSubmit} className="mb-4 pl-4 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a movie..."
          className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
        />
        {/* Suggestions dropdown */}
        {showSuggestions && (
          <div ref={dropdownRef} className="absolute w-full bg-gray-700 z-10 border border-gray-500 rounded-b-md shadow-lg ease-linear duration-300">
            {movieSuggestions.map((movie) => (
            <div
              key={movie.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-600 text-white"
              onClick={(e) => handleSuggestionClick(e, movie)}
            >
              <div className='flex items-center'>
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  className='h-40 mx-4 my-2 ease-linear duration-200 hover:scale-105'
                  alt={movie.title} // Add alt attribute for accessibility
                />
                {movie.title}
              </div>
            </div>
          ))}
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-10 pl-4">Recommended</button>
      </form>
  
      {/* Display recommended movies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recommendedMovies.map((movie, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <div className="w-full relative" onClick={(e) => handleRecommendedMovieClick(e, movie)}>
              <Link href={`/MovieDetail?id=${movie.movie_id ? movie.movie_id : movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md shadow-md cursor-pointer ease-linear duration-200 hover:scale-105"
                />
              </Link>
            </div>
            <div className="w-full text-white pl-4 mt-4">
              <p className="font-bold">{movie.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default MovieRecommendationPage;