'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head'; 

const apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2';

function TVShowsByGenrePage() {
  const [genreId, setGenreId] = useState(null);
  const [genreName, setGenreName] = useState(''); 
  const [tvShows, setTVShows] = useState([]); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // Parse the URL to get query parameters
    const id = urlParams.get('genreId');
    setGenreId(id);
    console.log("Current URL:", window.location.href);
    console.log("genreId:", id); // Log the genreId
  }, []);

  useEffect(() => {
    async function fetchTVShowsByGenre() {
      try {
        // Fetch TV shows by genre if genreId is available
        if (genreId) {
          const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}`);
          const data = await response.json();
          setTVShows(data.results);
        }
      } catch (error) {
        console.error('Error fetching TV shows by genre:', error);
      }
    }

    fetchTVShowsByGenre();
  }, [genreId]);

  useEffect(() => {
    async function fetchGenreName() {
      try {
        // Fetch genre name if genreId is available
        if (genreId) {
          const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`);
          const data = await response.json();
          const genre = data.genres.find(genre => genre.id === parseInt(genreId));
          if (genre) {
            setGenreName(genre.name);
          }
        }
      } catch (error) {
        console.error('Error fetching genre name:', error);
      }
    }

    fetchGenreName();
  }, [genreId]); 

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800">
      <Head>
        <title>{genreName} TV Shows</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8 text-white">{genreName} TV Shows</h1>

      <div className="grid grid-cols-1 gap-4">
        {tvShows.map(show => (
          <div key={show.id} className="bg-gray-700 rounded-md p-4 flex">
            <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} className="mr-4 w-36" />
            <div>
              <h2 className="text-white text-lg font-bold mb-2">{show.name}</h2>
              <p className="text-gray-300 mb-2">{show.overview}</p>
              <p className="text-gray-300">Genre: {genreName}</p>
              <p className="text-gray-300">Rating: {show.vote_average}</p>
              <p className="text-gray-300">First Air Date: {show.first_air_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TVShowsByGenrePage;
