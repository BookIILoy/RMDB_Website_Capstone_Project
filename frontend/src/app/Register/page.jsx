"use client"
import Link from "next/link";
import React, { useState } from "react";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const router = useRouter();

    const handleRegister = () => {
        // Prepare data to send to the backend
        if( password === rePassword ){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "email": email,
            "password": password
            });

            const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
            };

            fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/api/users/register`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.success === 1){
                    Swal.fire({
                        title : 'Register Success',
                        text : 'Register Successful',
                        icon : 'success',
                        color : '#fff',
                        customClass : 'swal-respon',
                        background : '#333',
                        confirmButtonText : 'close'
                    }).then(res => {
                        router.push(`/Login`);
                    })
                }
                else{
                    Swal.fire({
                        title : 'Register Fail',
                        text : result.message,
                        icon : 'error',
                        color : '#fff',
                        customClass : 'swal-respon',
                        background : '#333',
                        confirmButtonText : 'close'
                    }).then(res => {
                        router.push(`/Register`);
                    })
                }
            })
            .catch((error) => console.error(error));
        }else{
            Swal.fire({
                title : 'Warning',
                text : 'Password not match',
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
            <div className=" border-2 border-solid 
            flex justify-center flex-col items-center
            border-white rounded-3xl backdrop-blur-md bg-white/10 p-5">
                <h2 className="text-white font-bold text-2xl md:text-4xl mt-5">Register</h2>
                <div className="my-5">
                <div className="grid grid-cols-2 px-2 phone:grid-cols-1">
                        <div className="px-2">
                            <p className="text-white text-xs my-2">Firstname</p>
                            <input type="text" placeholder="Firstname" required className=" border-2 border-solid rounded-2xl border-gray-400 bg-transparent text-white placeholder:p-2 outline-none p-1"
                            value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="px-2">
                            <p className="text-white text-xs my-2">Lastname</p>
                            <input type="text" placeholder="Lastname" required className=" border-2 border-solid rounded-2xl border-gray-400 bg-transparent text-white placeholder:p-2 outline-none p-1"
                            value={lastname} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="px-2">
                            <p className="text-white text-xs my-2">Username</p>
                            <input type="text" placeholder="Username" required className=" border-2 border-solid rounded-2xl border-gray-400 bg-transparent text-white placeholder:p-2 outline-none p-1"
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="px-2">
                            <p className="text-white text-xs my-2">Email</p>
                            <input type="email" placeholder="Email" required className=" border-2 border-solid rounded-2xl border-gray-400 bg-transparent text-white placeholder:p-2 outline-none p-1"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="px-2">
                            <p className="text-white text-xs my-2">Password</p>
                            <input type="password" placeholder="Password" required className=" border-2 border-solid rounded-2xl border-gray-400 bg-transparent text-white placeholder:p-2 outline-none p-1"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="px-2">
                            <p className="text-white text-xs my-2">Re-Password</p>
                            <input type="password" placeholder="Re-Password" required className=" border-2 border-solid rounded-2xl border-gray-400 bg-transparent text-white placeholder:p-2 outline-none p-1"
                            value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={handleRegister} className="text-black border-2 border-solid border-black w-[15rem] h-9 rounded-2xl
                    bg-white hover:bg-black hover:text-white 
                    hover:border-white ease-in-out duration-150">Register</button>
                </div>
                <div className="my-2 flex justify-center items-center flex-col">
                    <p className="text-white">Already have an account?</p>
                    <Link href='/Login'>
                        <button className="text-black border-2 border-solid 
                        border-black w-[15rem] h-9 rounded-2xl bg-white hover:bg-black hover:text-white 
                        hover:border-white ease-in-out duration-150 my-2">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;