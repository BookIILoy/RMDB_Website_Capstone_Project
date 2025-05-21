'use client'
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar, faThumbsUp, faThumbsDown, faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Profile() {
    const [user, setUser] = useState({});
    const [firstname, setFirstName] = useState('');
    const [isUpdateFirstname, setIsUpdateFirstname] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isUpdateLastname, setIsUpdateLastname] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [lastname, setLastname] = useState('');
    const router = useRouter();
    const [reviews, setReviews] = useState([]);
    const [reviewItems, setReviewItems] = useState(4);
    const [totalReviews, setTotalReviews] = useState(0);
    const [haveReviews, setHaveReviews] = useState(false);
    const handleEditFirstname = () => { setIsUpdateFirstname(!isUpdateFirstname) };
    const handleEditLastname= () => { setIsUpdateLastname(!isUpdateLastname) };

    const handleUpdateFirstname = () => {
        setIsUpdate(!isUpdate);
        setIsUpdateFirstname(!isUpdateFirstname);
    }

    const handleUpdateLastname = () => {
        setIsUpdate(!isUpdate);
        setIsUpdateLastname(!isUpdateLastname);
    }

    const handleShowMore = () => {
        if(reviewItems === totalReviews){
            setReviewItems(reviewItems);
        } else if ( totalReviews - reviewItems > 5){ // if totalReviews - reviewItems more than 5 its mean it can show more 5 reviews
                setReviewItems(reviewItems + 5);
        } else { // if totalReviews - reviewItems less than 5 its mean maximum reviewsItems that not showing is not enough to show more than 5
            setReviewItems(reviewItems + (totalReviews - reviewItems)); // so we set reviewItems that want to show equal to reviewItems + maximum reviews that not showing.
        }
    }

        if(isUpdate) {
            if(typeof window !== 'undefined'){
                const token = localStorage.getItem('token');
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + token);
    
                if(firstname !== ''){
                    const raw = JSON.stringify({ "firstname": firstname });
                    const requestOptions = { method: "PATCH", headers: myHeaders, body: raw, redirect: "follow" };
                    fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/api/users/update/${user.id}`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        localStorage.setItem('token', result.token);
                        setIsAuth(!isAuth);
                    })
                    .catch((error) => console.error(error));
                    setFirstName('');
                }
    
                if(lastname !== ''){
                    const raw = JSON.stringify({ "lastname": lastname });
                    const requestOptions = { method: "PATCH", headers: myHeaders, body: raw, redirect: "follow" };
                    fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_IP}/api/users/update/${user.id}`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        localStorage.setItem('token', result.token);
                        setIsAuth(!isAuth);
                    })
                    .catch((error) => console.error(error));
                    setLastname('');
                }
                setIsUpdate(!isUpdate);
            }
        }

    const handleLogout = () => {
        Swal.fire({
            title : 'Logout Success',
            text : 'Logout Success!',
            icon : 'success',
            color : '#fff',
            customClass : 'swal-respon',
            background : '#333',
            confirmButtonText : 'close'
        }).then(res => {
            localStorage.removeItem('token');
            window.location.href = '/';
        })
    }

    const handleDeleteReview = (_id) => {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
          };
          
          fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_DJANGO}/api/reviews/${_id}/delete/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if(result.success === 1){
                    Swal.fire({
                        title : 'Review Deleted',
                        text : 'test',
                        icon : 'success',
                        color : '#fff',
                        customClass : 'swal-respon',
                        background : '#333',
                        confirmButtonText : 'close'
                    });
                    setIsAuth(!isAuth);
                } else {
                    Swal.fire({
                        title : 'Review Not Found',
                        text : result.message,
                        icon : 'error',
                        color : '#fff',
                        customClass : 'swal-respon',
                        background : '#333',
                        confirmButtonText : 'close'
                    });
                }
            })
            .catch((error) => console.error(error));
        }
    
    

    if(typeof window !== 'undefined'){
        if(!isAuth){
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
                    setIsAuth(!isAuth);
                    fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_DJANGO}/api/reviews/?id=${result.user.id}`, requestOptions)
                    .then((res) => res.json())
                    .then((results => {
                        setReviews(results.reviews);
                        setTotalReviews(results.total_reviews);
                        if(results.total_reviews === 0){
                            setHaveReviews(false);
                        } else if(results.total_reviews < 4){
                            setReviewItems(results.total_reviews);
                            setHaveReviews(true);
                        } else {
                            setHaveReviews(true);
                        }
                    }))
                    .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.error(error));
        }
    }


    return (
        <div className="container mx-auto min-h-screen my-4 tablet:ml-20">
            <div className="bg-blue-950 rounded-md p-4">
                <div className="flex flex-col phone:items-center phone:ml-2">
                    <h2 className="text-white font-bold text-2xl">Profile</h2>
                    <div className="flex items-center my-2">
                        <FontAwesomeIcon icon={faUser} className="text-white mr-4 text-5xl" />
                        <div>
                            {isUpdateFirstname ? 
                                <div className="flex">
                                    <input type="text" placeholder={`${user.firstname}`} className="text-white px-2 border-2 border-solid border-white bg-transparent rounded-lg outline-none" 
                                    value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                                    <button className="border-2 border-solid border-black mx-4 rounded-lg w-[80px]  text-black bg-white ease-in-out duration-300 
                                        hover:text-white hover:bg-black hover:border-white" onClick={handleUpdateFirstname}>Save</button>
                                </div>
                                :(
                                    <div className="flex">
                                        <p className="text-white font-bold w-[20rem]">Firstname: <span className="font-normal">{user.firstname}</span></p>
                                        <button className="border-2 border-solid border-black mx-4 rounded-lg w-[80px]  text-black bg-white ease-in-out duration-300 
                                        hover:text-white hover:bg-black hover:border-white" onClick={handleEditFirstname}>Edit</button>
                                    </div>
                                )
                            }
                            {isUpdateLastname ? 
                                <div className="flex my-2">
                                    <input type="text" placeholder={`${user.lastname}`} className="text-white px-2 border-2 border-solid border-white bg-transparent rounded-lg outline-none" 
                                    value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                    <button className="border-2 border-solid border-black mx-4 rounded-lg w-[80px]  text-black bg-white ease-in-out duration-300 
                                        hover:text-white hover:bg-black hover:border-white" onClick={handleUpdateLastname}>Save</button>
                                </div>
                                :(
                                    <div className="flex">
                                        <p className="text-white font-bold w-[20rem]">Lastname: <span className="font-normal">{user.lastname}</span></p>
                                        <button className="border-2 border-solid border-black mx-4 rounded-lg w-[80px]  text-black bg-white ease-in-out duration-300 
                                        hover:text-white hover:bg-black hover:border-white" onClick={handleEditLastname}>Edit</button>
                                    </div>
                                )
                            }
                            <p className="text-white font-bold">Email: <span className="font-normal">{user.email}</span></p>
                        </div>
                    </div>
                    <button className="border-2 border-solid border-black rounded-lg w-[80px] my-4 text-black bg-white ease-in-out duration-300 
                    hover:text-white hover:bg-black hover:border-white" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {haveReviews ? (
                <div className="bg-blue-950 rounded-md p-4 mt-4">
                    <div className="bg-white h-1 w-full my-4 phone:hidden">
                        <br />
                    </div>
                    <h1 className="text-white text-3xl font-bold mb-4 tablet:mx-2 phone:mx-2">Reviews</h1>
                    <div className="mt-4">
                        {reviews?.slice(0,reviewItems).map((review, index) => (
                            <div key={review.id} className={`bg-blue-950 rounded-md p-4 mb-4 flex items-center phone:w-[365px]
                                phone:mx-3 tablet:w-[740px] tablet:mx-4 ${index !== 0 ? 'mt-4' : ''}`}>
                                <FontAwesomeIcon icon={faUser} className="text-white mr-4 text-5xl" />
                                <div className="phone:w-[300px]">
                                    <p className="text-white font-bold text-xl mb-1">{review.user_name}</p>
                                    <p className="text-white font-bold text-base mb-1">Movie : <span className="font-normal">{review.movie_name}</span></p>
                                    <p className="text-white text-lg mb-1">
                                        {review.overall === 'Positive' ? (
                                            <span>
                                                <FontAwesomeIcon icon={faThumbsUp} className="text-white mr-1" />
                                                Positive
                                            </span>
                                        ) : (
                                            <span>
                                                <FontAwesomeIcon icon={faThumbsDown} className="text-white mr-1" />
                                                Negative
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-white text-lg mb-1">
                                        <FontAwesomeIcon icon={faStar} className="text-white mr-1" />
                                        {review.score}
                                    </p>
                                    <p className="text-gray-500 font-bold mb-1">
                                        {review.subject}
                                    </p>
                                    <p className="text-gray-500 mb-0">
                                        Review: {review.comment}
                                    </p>
                                    {/* Edit and Delete Icons */}
                                    <div className="flex mt-2">
                                        <FontAwesomeIcon icon={faPenToSquare} className="text-white mr-2 cursor-pointer" onClick={() => handleEditReview(review.id)} />
                                        <FontAwesomeIcon icon={faTrash} className="text-white cursor-pointer" onClick={() => handleDeleteReview(review._id)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center">
                            {reviewItems !== totalReviews ? 
                                (reviewItems === totalReviews ? null : (
                                    <button className="text-white border-2 border-solid border-white 
                                        bg-blue-950 rounded-md px-2 py-1 my-4 ease-in-out duration-300 
                                        p-1 hover:bg-white hover:text-black hover:border-black" onClick={handleShowMore}>More Reviews</button>
                                )) : (null)}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-blue-950 rounded-md p-4 mt-4">
                    <div className="bg-white h-1 w-full my-4 phone:hidden">
                        <br />
                    </div>
                    <h1 className="text-white text-3xl font-bold mb-4 tablet:mx-2 phone:mx-2">Reviews</h1>
                    <div className="mt-4">
                        <p className="text-white text-2xl font-bold">This user has no reviews.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
