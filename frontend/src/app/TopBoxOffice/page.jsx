'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2';
const topMoviesEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

function TopBoxOfficePage() {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    async function fetchTopMovies() {
      try {
        // Fetch top movies from the first API endpoint
        const response = await fetch(topMoviesEndpoint);
        const data = await response.json();

        // Extract movie IDs
        const movieIds = data.results.map(movie => movie.id);

        // Fetch details for each movie
        const movieDetailsPromises = movieIds.map(async id => {
          const movieDetailResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
          const movieDetailData = await movieDetailResponse.json();
          return movieDetailData;
        });

        // Resolve all promises
        const movieDetails = await Promise.all(movieDetailsPromises);

        // Sort movies by revenue (highest to lowest)
        const sortedMovies = movieDetails.sort((a, b) => b.revenue - a.revenue);

        // Set the top 100 movies with revenue and budget information
        setTopMovies(sortedMovies.slice(0, 100));
      } catch (error) {
        console.error('Error fetching top movies:', error);
      }
    }

    fetchTopMovies();
  }, []);

  const formatCurrency = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800">
      <Head>
        <title>Top Box Office</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8 text-white">Top Box Office</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-white border border-white">Rank</th>
              <th className="px-4 py-2 text-left text-white border border-white">Poster</th>
              <th className="px-4 py-2 text-left text-white border border-white">Title</th>
              <th className="px-4 py-2 text-left text-white border border-white">Revenue</th>
              <th className="px-4 py-2 text-left text-white border border-white">Budget</th>
              <th className="px-4 py-2 text-left text-white border border-white">Production Companies</th>
            </tr>
          </thead>
          <tbody>
            {topMovies.map((movie, index) => (
              <tr key={movie.id} className="bg-gray-700 border border-white">
                <td className="px-4 py-2 text-white border border-white">{index + 1}</td>
                <td className="px-4 py-2 text-white border border-white"><img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} /></td>
                <td className="px-4 py-2 text-white border border-white">{movie.title}</td>
                <td className="px-4 py-2 text-white border border-white">${formatCurrency(movie.revenue)}</td>
                <td className="px-4 py-2 text-white border border-white">${formatCurrency(movie.budget)}</td>
                <td className="px-4 py-2 text-white border border-white">
                  {movie.production_companies.map(company => (
                    <div key={company.id}>{company.name}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopBoxOfficePage;

