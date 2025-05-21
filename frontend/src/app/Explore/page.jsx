import React from "react";
import Link from "next/link";
import Head from 'next/head';

function ExplorePage() {
    return (
        <div className="container mx-auto px-5 py-8 bg-gray-800 my-10">
            <Head>
                <title>Explore</title>
            </Head>

            <h1 className="text-3xl font-bold mb-8 text-white">Explore</h1>

            {/* Movies Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Movies</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            <Link href="/Topratedmovies">
                                <span className="text-blue-500 hover:underline cursor-pointer">Top Rated Movies</span>
                            </Link>
                        </h3>
                        <p className="text-white">List of the top Rated movies</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            <Link href="/MostPopularMovies">
                                <span className="text-blue-500 hover:underline cursor-pointer">Most Popular Movies</span>
                            </Link>
                        </h3>
                        <p className="text-white">List of the most popular movies</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-gray-700 p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            <Link href="/TopBoxOffice">
                                <span className="text-blue-500 hover:underline cursor-pointer">Top Box Office</span>
                            </Link>
                        </h3>
                        <p className="text-white">List of the top box office movies</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            <Link href="/BrowseByGenre">
                                <span className="text-blue-500 hover:underline cursor-pointer">Browse by Genre</span>
                            </Link>
                        </h3>
                        <p className="text-white">Browse movies by genre</p>
                    </div>
                </div>
            </div>

            {/* TV Shows Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-white">TV Shows</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            <Link href="/TopRatedTvShows">
                                <span className="text-blue-500 hover:underline cursor-pointer">Top Rated TV Shows</span>
                            </Link>
                        </h3>
                        <p className="text-white">List of the top rated TV shows</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            <Link href="/MostPopularTvShows">
                                <span className="text-blue-500 hover:underline cursor-pointer">Most Popular TV Shows</span>
                            </Link>
                        </h3>
                        <p className="text-white">List of the most popular TV shows</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-gray-700 p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            <Link href="/BrowseByGenre">
                                <span className="text-blue-500 hover:underline cursor-pointer">Browse by Genre</span>
                            </Link>
                        </h3>
                        <p className="text-white">Browse TV shows by genre</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExplorePage;
