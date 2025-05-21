'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons"; // Importing regular user icon
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const id = useSearchParams().get('movieId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_DJANGO}/api/reviews/?movie_id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data.reviews);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to fetch reviews',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    return (
        <div className="container mx-auto flex flex-col my-4 min-h-screen">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1 className="text-white text-3xl font-bold mb-4">Reviews</h1>
                    <div className="mt-4">
                        {reviews.map((review, index) => (
                            <div key={review.id} className={`bg-blue-950 rounded-md p-4 mb-4 flex items-center ${index !== 0 ? 'mt-4' : ''}`}>
                                <FontAwesomeIcon icon={faUser} className="text-white mr-4 text-5xl" />
                                <div>
                                    <p className="text-white font-bold text-xl mb-1">{review.user_name}</p>
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reviews;
