'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2';
const baseUrl = 'https://api.themoviedb.org/3/movie/top_rated';
const maxVisibleButtons = 5; // Maximum number of visible page number buttons

function TopRatedMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`${baseUrl}?api_key=${apiKey}&page=${page}`);
        const data = await response.json();
        const sortedMovies = data.results.sort((a, b) => b.vote_average - a.vote_average);
        setMovies(sortedMovies);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, [page]);

  // Calculate the starting number of each movie across pages
  const startingNumber = (page - 1) * 10;

  // Generate an array of page numbers based on the current page and the maximum visible buttons
  const getPageNumbers = () => {
    const middleButton = Math.ceil(maxVisibleButtons / 2);
    let startPage = Math.max(1, page - middleButton + 1);
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800">
      <Head>
        <title>Top Rated Movies</title>
      </Head>
      <h1 className="text-4xl font-bold mb-8 text-white">Top Rated Movies</h1>
      <div className="grid grid-cols-1 gap-8">
        {movies.map((movie, index) => (
          <div key={movie.id} className="flex items-center relative">
            <p className="text-white absolute top-0 left-0 z-10 font-bold text-lg">{startingNumber + index + 1}</p>
            <div className="w-1/4 relative pl-16">
            <Link href={`/MovieDetail?id=${movie.id}`}><img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md shadow-md cursor-pointer ease-linear duration-200 hover:scale-105"
              /></Link>
            </div>
            <div className="w-3/4 text-white pl-10">
              <p className="font-bold text-2xl">{movie.title}</p>
              <p>Release Date: {movie.release_date}</p>
              <p>Rating: {movie.vote_average}</p>
              <p className="mt-2 text-gray-400 leading-relaxed">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setPage(1)} // Go to the first page
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          First
        </button>
        {/* Page number buttons */}
        {getPageNumbers().map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-2 ${page === pageNumber ? 'bg-blue-700' : ''}`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => setPage(totalPages)} // Go to the last page
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default TopRatedMoviesPage;














