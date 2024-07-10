"use client";
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import ReviewForm from '@/components/client/ReviewForm';
import { mockRestaurants, Restaurant, Review } from '@/data/restaurants';

const PreviewPage = () => {
    const router = useRouter();
    const { restaurantId } = useParams(); // Extract restaurantId from the query params
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    // Type guard to ensure restaurantId is a string
    const getRestaurantId = (id: string | string[]): string => {
        return Array.isArray(id) ? id[0] : id;
    };

    // Fetch the restaurant data based on the restaurantId
    useEffect(() => {
        const id = getRestaurantId(restaurantId);
        const fetchedRestaurant = mockRestaurants.find((rest) => rest.id === parseInt(id));
        if (fetchedRestaurant) {
            setRestaurant(fetchedRestaurant);
            setReviews(fetchedRestaurant.reviews);
        }
    }, [restaurantId]);

    if (!restaurant) return null;

    // Handle "Book Now" button click
    const handleBookNowClick = () => {
        router.push(`/booking/${restaurant.id}`);
    };

    // Handle adding a new review
    const handleAddReview = async (review: Review) => {
        // Send the new review to the backend
        await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...review, restaurantId: restaurant.id }),
        });

        // Update the local state with the new review
        setReviews([...reviews, { ...review, id: Date.now() }]);
        setEditingReview(null);
    };

    // Handle updating an existing review
    const handleUpdateReview = async (updatedReview: Review) => {
        // Send the updated review to the backend
        await fetch(`/api/reviews/${updatedReview.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedReview),
        });
        // Update the local state with the updated review
        setReviews(reviews.map(review => review.id === updatedReview.id ? updatedReview : review));
        setEditingReview(null);
    };

    // Handle clicking the "Edit" button for a review
    const handleEditClick = (review: Review) => {
        setEditingReview(review);
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
    };

    return (
        <div className="flex gap-4">
            <div className='hidden md:block w-[50vw] h-[100vh]'>
                <Image src={restaurant.imageUrl} alt={restaurant.name} width={100} height={200} className="w-full h-full" />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">{restaurant.name}</h2>
                <div className="flex items-center mb-4">
                    <EnvironmentOutlined className="mr-2 text-indigo-900" />
                    <p className="text-gray-500">{restaurant.location}</p>
                </div>
                <p className="text-gray-500 mb-4">{restaurant.preview}</p>
                <p className="text-gray-500"><strong>Opening Hours:</strong> {restaurant.openingHours}</p>
                <p className="text-gray-500"><strong>Contact:</strong> {restaurant.contact}</p>
                <p className="text-gray-500"><strong>Features:</strong> {restaurant.features.join(', ')}</p>
                <h3 className="text-lg font-bold mb-4">Restaurant Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                    {restaurant.gallery.map((image, index) => (
                        <Image key={index} src={image} alt={`Gallery ${index}`} width={100} height={200} className="w-full h-32 object-cover" />
                    ))}
                </div>
                <h3 className="text-lg font-bold mb-4 mt-4">Menu</h3>
                <ul className="list-disc pl-4">
                    {restaurant.menu.map((item, index) => (
                        <li key={index} className="text-gray-500">
                            {item.item} - R{item.price}
                        </li>
                    ))}
                </ul>
                <h3 className="text-lg font-bold mb-4 mt-4">Reviews</h3>
                {reviews.map((review, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex items-center mb-2">
                            <p className="font-bold mr-2">{review.user}</p>
                            <p className="text-gray-500">Rating: {review.rating}</p>
                            <Button type="link" onClick={() => handleEditClick(review)}>Edit</Button>
                        </div>
                        <p className="text-gray-500">{review.comment}</p>
                    </div>
                ))}
                <div className='flex space-x-4'>
                    <Button type="primary" className="mt-4 bg-indigo-900 border-indigo-900"
                        onClick={() => setEditingReview({ userEmail: '', id: 0, user: '', rating: 0, comment: '' })}
                    >
                        Add Review
                    </Button>
                    {editingReview && (
                        <ReviewForm
                            review={editingReview}
                            onSubmit={editingReview.id ? handleUpdateReview : handleAddReview}
                            onCancel={handleCancelEdit}
                        />
                    )}
                </div>
                <Button type="primary" className="mt-4 bg-indigo-900 border-indigo-900" style={{ marginTop: '24px' }} onClick={handleBookNowClick}>
                    Book Now
                </Button>
            </div>
        </div>
    );
};

export default PreviewPage;