import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Restaurant, Review } from '@/data/restaurants';
import ReviewForm from './ReviewForm';

interface RestaurantModalProps {
    restaurant: Restaurant | null;
    isVisible: boolean;
    onClose: () => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ restaurant, isVisible, onClose }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [reviews, setReviews] = useState<Review[]>(restaurant ? restaurant.reviews : []);

    if (!restaurant) return null;

    const handleBookNowClick = () => {
        router.push(`/booking/${restaurant.id}`);
    };

    const handleAddReview = async (review: Review) => {
        await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...review, restaurantId: restaurant.id }),
        });

        setReviews([...reviews, { ...review, id: Date.now() }]);
        setEditingReview(null);
    };

    const handleUpdateReview = async (updatedReview: Review) => {
        await fetch(`/api/reviews/${updatedReview.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedReview),
        });
        setReviews(reviews.map(review => review.id === updatedReview.id ? updatedReview : review));
        setEditingReview(null);
    };

    const handleEditClick = (review: Review) => {
        setEditingReview(review);
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
    };

    return (
        <Modal
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width="80%"
            style={{ top: 20 }}
        >
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <Image src={restaurant.imageUrl} alt={restaurant.name} width={100} height={200} className="w-full h-full object-cover" />
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
                                {session?.user?.email === review.userEmail && (
                                    <Button type="link" onClick={() => handleEditClick(review)}>Edit</Button>
                                )}
                            </div>
                            <p className="text-gray-500">{review.comment}</p>
                        </div>
                    ))}
                    <div className='flex space-x-4'>
                        <Button type="primary" className="mt-4 bg-indigo-900 border-indigo-900"
                            onClick={() => setEditingReview({ id: 0, user: session?.user?.name || '', userEmail: session?.user?.email || '', rating: 0, comment: '' })}
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
        </Modal>
    );
};

export default RestaurantModal;
