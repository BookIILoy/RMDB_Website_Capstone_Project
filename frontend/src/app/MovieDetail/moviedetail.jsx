"use client"
import React from "react"

function MovieDetailList(props) {
    const companyLength = props?.companies.length;
    return(
        <div className="">
           <div className="flex items-center flex-col">
                <h2 className="text-white font-bold">{props.movieName}</h2> 
                <div className="flex my-4 phone:flex-col  tablet:flex tablet:flex-col tablet:items-center mx-4">
                    {props.backdrop !== null ? <img src={`https://image.tmdb.org/t/p/w500${props.backdrop}`} className="h-64 my-2 ease-linear duration-200  mx-5 hover:scale-105" />
                    :(
                        <img src="/noimg.jpg" className="mx-5"/>
                     )
                    }
                        <p className="text-white tablet:my-4 phone:my-4">{props.desc}
                            <div className="my-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
                                    <div>
                                        <p className="font-bold my-2 opacity-60">Status : <span className="font-normal">{props.status}</span></p>
                                        <p className="font-bold my-2 opacity-60">Release Date : <span className="font-normal">{props.date}</span></p>
                                        <p className="font-bold my-2 opacity-60">Movie Runtime : <span className="font-normal">{props.time} Minutes</span></p>
                                        <p className="font-bold my-2 opacity-60">Budget : <span className="font-normal">{props.budget} $</span></p>
                                    </div>
                                    <div>
                                        <p className="font-bold my-2 opacity-60">Language : <span className="font-normal">{props.language}</span></p>
                                        <p className="font-bold my-2 opacity-60">Tag : <span className="font-normal">{props.tag}</span></p>
                                        <p className="font-bold my-2 opacity-60">Score : <span className="font-normal">{props.vote}</span></p>
                                        <p className="font-bold my-2 opacity-60">Revenue : {props.revenue === 0 ? <span className="font-normal">Not Update</span>:(<span className="font-normal">{props.revenue} $</span>)}</p>
                                    </div>
                                </div>
                                <div>
                            </div>
                            </div>
                        </p>
                </div>
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

export default MovieDetailList;