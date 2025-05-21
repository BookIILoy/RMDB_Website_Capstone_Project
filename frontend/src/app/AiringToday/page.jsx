'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2';
const baseUrl = 'https://api.themoviedb.org/3/tv/airing_today';

function AiringTodayPage() {
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchTvShows() {
      try {
        const response = await fetch(`${baseUrl}?api_key=${apiKey}&page=${page}`);
        const data = await response.json();
        setTvShows(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    }

    fetchTvShows();
  }, [page]);


  const startingNumber = (page - 1) * 10;

  // Generate an array of page numbers based on the current page and the maximum visible buttons
  const maxVisibleButtons = 5; 
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
        <title>Airing Today TV Shows</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8 text-white">Airing Today TV Shows</h1>
      <div className="grid grid-cols-1 gap-8">
        {tvShows && tvShows.map((tvShow, index) => (
          <div key={tvShow.id} className="flex items-center relative">
            <p className="text-white absolute top-0 left-0 z-10 font-bold text-lg">{startingNumber + index + 1}</p>
            <div className="w-1/4 relative pl-10">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
                className="rounded-md shadow-md cursor-pointer"
              />
            </div>
            <div className="w-3/4 text-white pl-10">
              <p className="font-bold">{tvShow.name}</p>
              <p>First On Air Date: {tvShow.first_air_date}</p>
              <p>Rating: {tvShow.vote_average}</p>
              <p className="mt-2 text-gray-400 leading-relaxed">{tvShow.overview}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setPage(1)} 
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          First
        </button>

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
          onClick={() => setPage(totalPages)} 
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default AiringTodayPage;