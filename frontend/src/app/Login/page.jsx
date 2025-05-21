"use client"
import Link from "next/link";
import React, { useState } from "react";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if(username !== '' || password !== ''){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
            "email": username,
            "password": password
            });

            const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
            };

            fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/api/users/login`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.success === 0){
                    Swal.fire({
                        title : 'Login Fail',
                        text : result.message,
                        icon : 'error',
                        color : '#fff',
                        customClass : 'swal-respon',
                        background : '#333',
                        confirmButtonText : 'close'
                    })
                }else{
                    localStorage.setItem('token', result.token);
                    Swal.fire({
                        title : 'Login Success',
                        text : 'Login Sccess!',
                        icon : 'success',
                        color : '#fff',
                        customClass : 'swal-respon',
                        background : '#333',
                        confirmButtonText : 'close'
                    }).then(res => {
                        window.location.href = '/';
                    })
                }
            })
            .catch((error) => console.error(error));
        }
        else{
            Swal.fire({
                title : 'Warning',
                text : 'Missing Username or Password',
                icon : 'warning',
                color : '#fff',
                customClass : 'swal-respon',
                background : '#333',
                confirmButtonText : 'close'
            })
        }
    }

    return(
        <div className="container mx-auto flex justify-center flex-col items-center min-h-screen
          bg-center bg-cover bg-repeat max-w-full">
            <div className="my-[8rem] border-2 border-solid 
            flex justify-center flex-col items-center
            border-white rounded-3xl backdrop-blur-md bg-white/10 w-[20rem]">
            <h2 className="text-white font-bold text-2xl md:text-4xl my-5">Login</h2>
            <div className="my-5">
                <p className="text-white text-xs my-2">Username/Email</p>
                <input type="text" placeholder="username" required className=" border-2 border-solid rounded-2xl border-gray-400 bg-transparent text-white placeholder:p-2 outline-none p-1"
                value={username} onChange={(e) => setUsername(e.target.value)} />
                <p className="text-white text-xs my-2">Password</p>
                <input type="password" placeholder="password" required className=" border-2 border-solid rounded-2xl border-gray-400 bg-transparent text-white placeholder:p-2 outline-none p-1"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button className="text-black border-2 border-solid border-black w-[15rem] h-9 rounded-2xl
                bg-white hover:bg-black hover:text-white 
                hover:border-white ease-in-out duration-150" onClick={handleLogin}>Login</button>
                
            </div>
            <div className="my-2 flex justify-center items-center flex-col">
                <p className="text-white">Don't have account?</p>
                <Link href='/Register'><button className="text-black border-2 border-solid 
                border-black w-[15rem] h-9 rounded-2xl bg-white hover:bg-black hover:text-white 
                hover:border-white ease-in-out duration-150 my-2">Sign Up</button></Link>
            </div>
            </div>
        </div>
    )
}

export default LoginPage;