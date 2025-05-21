'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function TvShowPage() {
    const [tvShowsAiringToday, setTvShowsAiringToday] = useState([]);
    const [tvShowsPopular, setTvShowsPopular] = useState([]);
    const [tvShowsTopRated, setTvShowsTopRated] = useState([]);
    const [pageAiringToday, setPageAiringToday] = useState(1);
    const [pagePopular, setPagePopular] = useState(1);
    const [pageTopRated, setPageTopRated] = useState(1);
    const [totalPagesAiringToday, setTotalPagesAiringToday] = useState(1);
    const [totalPagesPopular, setTotalPagesPopular] = useState(1);
    const [totalPagesTopRated, setTotalPagesTopRated] = useState(1);
    const [showItemsAiringToday, setShowItemsAiringToday] = useState(12);
    const [showItemsPopular, setShowItemsPopular] = useState(4);
    const [showItemsTopRated, setShowItemsTopRated] = useState(5);
    const [activeAiringToday, setActiveAiringToday] = useState(false);
    const [activePopular, setActivePopular] = useState(false);
    const [activeTopRated, setActiveTopRated] = useState(false);

    useEffect(() => {
        fetchDataAiringToday();
        fetchDataPopular();
        fetchDataTopRated();
    }, [pageAiringToday, pagePopular, pageTopRated]);

    const fetchDataAiringToday = async () => {
        try {
            const apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2';
            const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&page=${pageAiringToday}`);
            const data = await response.json();
            setTvShowsAiringToday(data.results);
            setTotalPagesAiringToday(data.total_pages);
            setActiveAiringToday(true);
        } catch (error) {
            console.error('Error fetching airing today data:', error);
        }
    };

    const fetchDataPopular = async () => {
        try {
            const apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2';
            const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${pagePopular}`);
            const data = await response.json();
            setTvShowsPopular(data.results);
            setTotalPagesPopular(data.total_pages);
            setActivePopular(true);
        } catch (error) {
            console.error('Error fetching popular data:', error);
        }
    };

    const fetchDataTopRated = async () => {
        try {
            const apiKey = '22bd8561d5f68d41d4d6f2f5e3e28ab2';
            const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=${pageTopRated}`);
            const data = await response.json();
            setTvShowsTopRated(data.results);
            setTotalPagesTopRated(data.total_pages);
            setActiveTopRated(true);
        } catch (error) {
            console.error('Error fetching top rated data:', error);
        }
    };

    const handleShowMoreAiringToday = () => {
        if (showItemsAiringToday >= tvShowsAiringToday.length) {
            setShowItemsAiringToday(showItemsAiringToday);
        } else {
            setShowItemsAiringToday(showItemsAiringToday + 4);
        }
    };

    const handleShowMorePopular = () => {
        if (showItemsPopular >= tvShowsPopular.length) {
            setShowItemsPopular(showItemsPopular);
        } else {
            setShowItemsPopular(showItemsPopular + 4);
        }
    };

    const handleShowMoreTopRated = () => {
        if (showItemsTopRated >= tvShowsTopRated.length) {
            setShowItemsTopRated(showItemsTopRated);
        } else {
            setShowItemsTopRated(showItemsTopRated + 4);
        }
    };

    return (
        <div className="container mx-auto">
            <div>
                <h2 className="text-white font-bold text-4xl ml-4 mb-5 phone:text-2xl">Airing Today</h2>
                {activeAiringToday ? (
                    <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {tvShowsAiringToday.slice(0, showItemsAiringToday).map(tvShow => (
                            <div key={tvShow.id} className="w-full">
                                <div className="flex flex-col items-center">
                                <Link href={`/TVShowDetail?id=${tvShow.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w154/${tvShow.poster_path}`} alt={tvShow.name} 
                                    className="w-50 border border-solid border-gray-800 border-opacity-100 hover:scale-105 duration-200" /></Link>
                                    <div className="mt-4">
                                        <h3 className="text-white font-semibold text-center">{tvShow.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-white font-bold text-2xl">
                        <p>Loading Airing Today...</p>
                    </div>
                )}
                <div className="flex justify-center items-center">
                {showItemsAiringToday !== 20 ? (
                    <button onClick={handleShowMoreAiringToday} className="border-2 border-solid rounded-lg border-gray-800 my-4 bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out duration-150 w-[10rem]">
                        See More
                    </button>
                ) : (
                    <Link href="/AiringToday" className="border-2 border-solid rounded-lg border-gray-800 my-4 bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out duration-150 w-[10rem]">
                        <div className="flex justify-center items-center">
                            Show All
                        </div>
                    </Link>
                )}
                </div>
            </div>
            <div>
                <h2 className="text-white font-bold text-4xl ml-4 mb-5 phone:text-2xl">What's Popular</h2>
                {activePopular ? (
                    <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {tvShowsPopular.slice(0, showItemsPopular).map(tvShow => (
                            <div key={tvShow.id} className="w-full">
                            <div className="flex flex-col items-center">
                            <Link href={`/TVShowDetail?id=${tvShow.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w154/${tvShow.poster_path}`} alt={tvShow.name} 
                                className="w-50 border border-solid border-gray-800 border-opacity-100 hover:scale-105 duration-200" /></Link>
                                <div className="mt-4">
                                    <h3 className="text-white font-semibold text-center">{tvShow.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-white font-bold text-xl">
                    <p>Loading Popular...</p>
                </div>
            )}
            <div className="flex justify-center items-center">
                {showItemsPopular !== 12 ? (
                    <button onClick={handleShowMorePopular} className="border-2 border-solid rounded-lg border-gray-800 my-4 bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out duration-150 w-[10rem]">
                        See More
                    </button>
                ) : (
                    <Link href="/MostPopularTvShows" className="border-2 border-solid rounded-lg border-gray-800 my-4 bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out duration-150 w-[10rem]">
                        <div className="flex justify-center items-center">
                            Show All
                        </div>
                    </Link>
                )}
            </div>
        </div>
        <div>
        <h2 className="text-white font-bold text-4xl ml-4 mb-5 phone:text-xl">Top Rated TV Shows</h2>
                {activeTopRated ? (
                    <div className="my-5">
                        {tvShowsTopRated.slice(0, showItemsTopRated).map(tvShow => (
                            <div key={tvShow.id} className="flex mb-6 px-5 phone:flex-col phone:items-center">
                                <div className=''>
                                <Link href={`/TVShowDetail?id=${tvShow.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w300/${tvShow.backdrop_path}`} alt={tvShow.name} 
                                className="border border-solid border-gray-800 border-opacity-100 mr-4 hover:scale-105 duration-200 max-w-max"/></Link>
                                </div>
                                <div className='px-5 phone:my-3 md:px-6'>
                                    <h3 className="text-white font-semibold">{tvShow.name}</h3>
                                    <p className="text-gray-600">{tvShow.first_air_date}</p>
                                    <p className="text-gray-600">{tvShow.overview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-white font-bold text-xl">
                        <p>Loading Top Rated TV Shows...</p>
                    </div>
                )}
                <div className="flex justify-center items-center">
                    {showItemsTopRated !== 5 ? (
                        <button onClick={handleShowMoreTopRated} className="border-2 border-solid rounded-lg border-gray-800 my-4 bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out duration-150 w-[10rem]">
                            See More
                        </button>
                    ) : (
                        <Link href="/TopRatedTvShows" className="border-2 border-solid rounded-lg border-gray-800 my-4 bg-slate-600 text-white px-2 hover:bg-orange-500 ease-in-out duration-150 w-[10rem]">
                            <div className="flex justify-center items-center">
                                Show All
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TvShowPage;
