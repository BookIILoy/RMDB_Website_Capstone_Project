'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

function Header() {
    const [click , setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const handleSearch = () => setIsSearch(!isSearch);
    const [search, setSearch] = useState('');
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/api/users/auth`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if(result.success === 1){
                setUser(result.user);
                setIsAuth(true);
            }
            else{
                setIsAuth(false);
            }
        })
        .catch((error) => console.error(error));
    },[])
    const handleSubmitSearch = (e) => {
            e.preventDefault();
            router.push(`/Search?id=${search}&s=${isSearch}`);
            setIsSearch(!isSearch);
            if(click){
                setClick(!click);
            }
    }
    return(
        <nav className="text-white">
        <div className="text-white flex justify-between items-center p-2 mx-4">
            <Link href='/' className=" font-bold">RMDB</Link>
            {click ? <div className="md:hidden" onClick={handleClick}><IoCloseSharp /></div> : 
            (
                <div className="md:hidden" onClick={handleClick}><IoMenu /></div>
            )}
                <ul className="hidden md:flex space-x-4 tablet:text-xs">
                    <form className={isSearch ? "opacity-100 ease-linear duration-500" : "opacity-0"} onSubmit={handleSubmitSearch}>
                        <li>
                            <input type="text" className="border-2 border-solid rounded-2xl outline-none text-black pl-3"
                            placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                        </li>
                    </form>
                    <li className="mx-4">
                        <Link href = '/'>Movies</Link>
                    </li>
                    <li className="mx-4">
                        <Link href= '/TvShows'>TV Shows</Link>
                    </li>
                    <li className="mx-4">
                        <Link href='/Explore'>Explore</Link>
                    </li>   
                    <li className="mx-4 text-cyan-400">
                        <Link href= '/recomendation'>Movies Recomendation</Link>
                    </li>  
                    <li className={isSearch ? "hidden" : 
                    "mx-4 border-2 border-solid rounded-lg border-gray-400 bg-gray-400 w-7 flex justify-center items-center"}>
                        <button onClick={handleSearch}><FaSearch /></button>
                    </li> 
                    <li className="mx-4">
                        {isAuth ? <Link href= '/Profile'>{user.firstname}</Link> : (<Link href= '/Login'>Login/Register</Link>)}
                    </li>
                </ul>
        </div>
            {/*Mobile Menu*/}
            {click  ? <ul className="flex items-center flex-col md:hidden">
            <form className={isSearch ? "opacity-100 ease-linear duration-500" : "opacity-0"} onSubmit={handleSubmitSearch}>
                        <li>
                            <input type="text" className="boder-2 border-solid rounded-2xl outline-none text-black pl-3"
                            placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            </li>
                    </form>
                <li className="my-2">
                    <Link href = '/Movie' onClick={handleClick}>Movies</Link>
                </li>
                <li className="my-2">
                    <Link href= '/TvShows' onClick={handleClick}>TV Shows</Link>
                </li>   
                <li className="my-2 text-cyan-400">
                    <Link href= '/recomendation' onClick={handleClick}>Movies Recomendation</Link>
                </li>  
                <li className={isSearch ? "hidden" : 
                    "mx-4 border-2 border-solid rounded-lg border-gray-400 bg-gray-400 w-7 flex justify-center items-center"}>
                        <button onClick={handleSearch}><FaSearch /></button>
                    </li> 
                <li className="my-2">
                    {isAuth ? <Link href= '/Profile' onClick={handleClick}>{user.firstname}</Link> : (<Link href= '/Login'>Login/Register</Link>)}
                </li>
            </ul> : (null)}
    </nav>
    )
    
}

export default Header;