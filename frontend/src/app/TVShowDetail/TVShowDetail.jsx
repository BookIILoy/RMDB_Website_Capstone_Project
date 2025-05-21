"use client"
import React from "react"
import { useRouter } from "next/navigation";

function TVShowDetailList(props) {
    const networks = props.networks.length;
    const companyLength = props.companies.length;
    const profileLength = props.createdBy.length;
    const homepage = props.page;
    const seasonLength = props.seasons.length;
    const Router = useRouter();
    const handleHomePage = () => {
        Router.push(`${homepage}`);
    }
    console.log(props);
    return(
        <div className="">
            <div className=" flex items-center flex-col">
                <h2 className="text-white font-bold">{props.TVName}</h2>
                <div className="flex my-4 phone:flex-col  tablet:flex tablet:flex-col tablet:items-center mx-4">
                    {props.backdrop !== null ? <img src={`https://image.tmdb.org/t/p/w500${props.backdrop}`} className="h-64 my-2 ease-linear duration-200  mx-5 hover:scale-105" />
                    :(
                        <img src="/noimg.jpg" className="mx-5"/>
                     )
                    }
                    {props.desc ?
                        <p className="text-white tablet:my-4 phone:my-4">{props.desc}
                            <div className="grid grid-cols-1 md:grid-cols-2">
                            <div>
                                        <p className="font-bold my-2 opacity-60">
                                            status: {props.status ? <span className="font-normal">In Production</span> :(
                                                <span className="font-normal">Not In Production</span>
                                            ) }</p>
                                        <p className="font-bold my-2 opacity-60">Genre:
                                        {props.genre?.map((item) => (
                                            <span className="font-normal"> {item.name}</span>
                                        ))}
                                        </p>
                                        <p className="font-bold my-2 opacity-60">Total Seasons: {props.totalSeason}</p>
                                        <p className="font-bold my-2 opacity-60">Total Episodes: {props.totalEp}</p>
                                        <p className="font-bold my-2 opacity-60">Score: {props.vote} </p>
                                    </div>
                                    <div className="md:mx-5">
                                        <p className="font-bold my-2 opacity-60">First Air Date : {props.firstAir}</p>
                                        <p className="font-bold my-2 opacity-60">Lastest Air Date: {props.lastAir}</p>
                                        <p className="font-bold my-2 opacity-60">Current Episode: {props.lastEpAir.name}</p>
                                        <p className="font-bold my-2 opacity-60">Next Episode Air Date: {props.nextEpAir ? (props.nextEpAir.air_date): <span>null</span>}</p>
                                    </div>
                            </div>
                            <p className="font-bold my-2 opacity-80">Tagline: {props.tag ? <span className="font-normal">{props.tag}</span>:(<span className="font-normal">Null</span>)}</p>
                        </p>
                    :(null)
                    }
                </div>
                {/*If description = null it will show this description text and change style page.*/}
                {props.desc ? null :(
                    <div className=" mb-4">
                        <p className="text-white flex items-center flex-col">This TVShow doesn't have description.
                            <div className="grid grid-cols-1 my-2 md:grid-cols-2 ">
                                    <div className="md:mx-8">
                                        <p className="font-bold my-2 opacity-60">
                                            status: {props.status ? <span className="font-normal">In Production</span> :(
                                                <span className="font-normal">Not In Production</span>
                                            ) }</p>
                                        <p className="font-bold my-2 opacity-60">Genre:
                                        {props.genre?.map((item) => (
                                            <span className="font-normal"> {item.name}</span>
                                        ))}
                                        </p>
                                        <p className="font-bold my-2 opacity-60">Total Seasons: {props.totalSeason}</p>
                                        <p className="font-bold my-2 opacity-60">Total Episodes: {props.totalEp}</p>
                                        <p className="font-bold my-2 opacity-60">Score: {props.vote} </p>
                                    </div>
                                    <div className="md:mx-8">
                                        <p className="font-bold my-2 opacity-60">First Air Date : {props.firstAir}</p>
                                        <p className="font-bold my-2 opacity-60">Lastest Air Date: {props.lastAir}</p>
                                        <p className="font-bold my-2 opacity-60">Current Episode: {props.lastEpAir.name}</p>
                                        <p className="font-bold my-2 opacity-60">Next Episode Air Date: {props.nextEpAir ? (props.nextEpAir.air_date): <span>null</span>}</p>
                                    </div>
                            </div>
                        </p>
                        <p className=" text-white font-bold opacity-80">Tagline: {props.tag ? <span className="font-normal">{props.tag}</span>:(<span className="font-normal">Null</span>)}</p>
                    </div>
                )}
                {props.page ? <button className="text-white border-2 border-solid border-white p-2 rounded-lg my-5 hover:text-black hover:bg-white hover:border-black ease-in-out duration-300" onClick={handleHomePage}>Homepage</button> :(null)}
                {/*This part is work by if item in .map = 1 it will show in the middle if = 2 it will show 2 column if = 3 will show 3 column and if <= 4 will show 4 column */}
                {/*Show Season part*/}
                {props.seasons ? <h2 className="text-white font-bold">Seasons</h2>:(null)}
                <div className={seasonLength === 1 ? "flex flex-col items-center":(
                    (seasonLength === 2 ? "grid grid-cols-1 my-4 p-2 tablet:grid-cols-2 macbook:grid-cols-2" :(
                        (seasonLength === 3 ? "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-3" :(
                            (seasonLength === 4 ? "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-4":(
                                "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-4"
                            ))
                        ))
                    ))
                    )}>
                    {props.seasons?.map((item) => (
                        <div className=" my-6 w-[14rem] flex flex-col items-center phone:flex phone:justify-center">
                            {item.poster_path !== null  ? <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="bg-white w-[10rem]" /> 
                            :(<img src="/noimg.jpg" className="w-[10rem] h-[240px] phone:hidden"/>)}
                            <div className=" items-start flex-col flex">
                                <span className="text-white mt-2">{item.name}</span>
                                <span className="text-white opacity-60">{item.episode_count} Episodes</span>
                                <p className="text-white opacity-60 font-bold">Air Date: <span className="font-normal">{item.air_date}</span></p>
                            </div>
                    </div>
                    ))}
                </div>
                {/*Show Created by part*/}
                {profileLength > 0 ? <h2 className="text-white font-bold">Created By</h2>:(null)}
                <div className={profileLength === 1 ? "flex flex-col items-center":(
                    (profileLength === 2 ? "grid grid-cols-1 my-4 p-2 tablet:grid-cols-2 macbook:grid-cols-2" :(
                        (profileLength === 3 ? "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-3" :(
                            (profileLength === 4 ? "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-4":(
                                "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-4"
                            ))
                        ))
                    ))
                    )}>
                        {props.createdBy?.map((item) => (
                             <div className=" my-6 w-[14rem] flex flex-col items-center phone:flex phone:justify-center">
                                {item.profile_path !== null  ? <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} className="bg-white w-[10rem]" /> 
                                :(<img src="/noimg.jpg" className="w-[10rem] h-[240px] phone:hidden"/>)}
                                <span className="text-white mt-2">{item.name}</span>
                            </div>
                        ))}
                </div>
                {/*Show networks part*/}
                {networks > 0 ? <h2 className="text-white font-bold">Networks</h2> :(null)}
                <div className={networks === 1 ? "flex flex-col items-center":(
                    (networks === 2 ? "grid grid-cols-1 my-4 p-2 tablet:grid-cols-2 macbook:grid-cols-2" :(
                        (networks === 3 ? "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-3" :(
                            (networks === 4 ? "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-4":(
                                "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-4"
                            ))
                        ))
                    ))
                    )}>
                        {props.networks?.map((item) => (
                             <div className=" my-4 w-[14rem] phone:flex phone:justify-center">
                                {item.logo_path !== null  ? <img src={`https://image.tmdb.org/t/p/w500${item.logo_path}`} className="bg-white w-[10rem] p-2" /> 
                                :(<img src="/noimg.jpg" className="w-[5rem] h-[5rem] phone:hidden"/>)}
                                <p className="text-white font-bold my-2 phone:hidden">Network Name: <span className="font-normal">{item.name}</span></p>
                                <p className="text-white font-bold my-2 phone:hidden">Country: <span className="font-normal">{item.origin_country}</span></p>
                            </div>
                        ))}
                </div>
                {/*Show Company part*/}
                {companyLength > 0 ? <h2 className="text-white font-bold">Companies</h2> :(null)}
                <div className={companyLength === 1 ? "flex flex-col items-center":(
                    (companyLength === 2 ? "grid grid-cols-1 my-4 p-2 tablet:grid-cols-2 macbook:grid-cols-2" :(
                        (companyLength === 3 ? "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-3" :(
                            (companyLength === 4 ? "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-4":(
                                "grid grid-cols-1 my-4 p-2 justify-items-center tablet:grid-cols-2 macbook:grid-cols-4"
                            ))
                        ))
                    ))
                    )}>
                        {props.companies?.map((item) => (
                             <div className=" my-4 w-[14rem] mx-5 phone:flex phone:justify-center">
                                {item.logo_path !== null  ? <img src={`https://image.tmdb.org/t/p/w500${item.logo_path}`} className="bg-white w-[10rem] p-2" /> 
                                :(<img src="/noimg.jpg" className="w-[5rem] h-[5rem] phone:hidden"/>)}
                                <p className="text-white font-bold my-2 phone:hidden">Company Name: <span className="font-normal">{item.name}</span></p>
                                <p className="text-white font-bold my-2 phone:hidden">Country: <span className="font-normal">{item.origin_country}</span></p>
                            </div>
                        ))}
                </div>  
            </div>
        </div>
    )
}

export default TVShowDetailList;