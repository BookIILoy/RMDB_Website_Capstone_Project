'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2';

function MoviesByGenrePage() {
  const [genreId, setGenreId] = useState(null);
  const [genreName, setGenreName] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('genreId');
    setGenreId(id);
    console.log("Current URL:", window.location.href);
    console.log("genreId:", id);
  }, []);

  useEffect(() => {
    async function fetchMoviesByGenre() {
      try {
        if (genreId) {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`);
          const data = await response.json();
          setMovies(data.results);
        }
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      }
    }

    fetchMoviesByGenre();
  }, [genreId]);

  useEffect(() => {
    async function fetchGenreName() {
      try {
        if (genreId) {
          const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
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
        <title>{genreName} Movies</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8 text-white">{genreName} Movies</h1>

      <div className="grid grid-cols-1 gap-4">
        {movies.map((movie, index) => (
          <div key={movie.id} className="bg-gray-700 rounded-md p-4 flex">
            <Link href={`/MovieDetail?id=${movie.id}`}>
              <div className="cursor-pointer w-36 h-52 mr-4"> {/* Set fixed dimensions for the container and add margin-right */}
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover" /> {/* Use object-cover to maintain aspect ratio */}
              </div>
            </Link>
            <div>
              <h2 className="text-white text-lg font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-300 mb-2">{movie.overview}</p>
              <p className="text-gray-300">Genre: {genreName}</p>
              <p className="text-gray-300">Rating: {movie.vote_average}</p>
              <p className="text-gray-300">Release Date: {movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesByGenrePage;





