
'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; // Importing useRouter from next/navigation

const apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2';

function BrowseByGenrePage() {
  const router = useRouter();

  const [movieGenres, setMovieGenres] = useState([]);
  const [tvShowGenres, setTvShowGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        // Fetch movie genres
        const movieResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        const movieData = await movieResponse.json();
        setMovieGenres(movieData.genres);

        // Fetch TV show genres
        const tvShowResponse = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`);
        const tvShowData = await tvShowResponse.json();
        setTvShowGenres(tvShowData.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }

    fetchGenres();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800">
      <Head>
        <title>Browse By Genre</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8 text-white">Browse By Genre</h1>

      {/* Popular movies by genre */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-white">Popular Movies by Genre</h2>
        <div className="grid grid-cols-5 gap-4">
          {movieGenres.map(genre => (
            <div key={genre.id} className="bg-gray-700 rounded-md p-4" onClick={() => router.push(`/MoviesByGenre?genreId=${genre.id}`)}>
              <div className="text-white hover:underline">{genre.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular TV series by genre */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-white">Popular TV series by Genre</h2>
        <div className="grid grid-cols-5 gap-4">
          {tvShowGenres.map(genre => (
            <div key={genre.id} className="bg-gray-700 rounded-md p-4" onClick={() => router.push(`/TvShowsByGenre?genreId=${genre.id}`)}>
              <div className="text-white hover:underline">{genre.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrowseByGenrePage;










