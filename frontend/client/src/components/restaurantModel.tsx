import React from 'react';
import { Modal, Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Restaurant } from '@/components/data/restaurants';
import Image from 'next/image';

interface RestaurantModalProps {
    restaurant: Restaurant | null;
    isVisible: boolean;
    onClose: () => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ restaurant, isVisible, onClose }) => {
    if (!restaurant) return null;

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
                    <Image src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">{restaurant.name}</h2>
                    <div className="flex items-center mb-4">
                        <EnvironmentOutlined className="mr-2 text-indigo-900" />
                        <p className="text-gray-500">{restaurant.location}</p>
                    </div>
                    <p className="text-gray-500 mb-4">{restaurant.preview}</p>
                    <h3 className="text-lg font-bold mb-4">Restaurant Gallery</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {restaurant.gallery.map((image, index) => (
                            <Image key={index} src={image} alt={`Gallery ${index}`} className="w-full h-32 object-cover" />
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
                    {restaurant.reviews.map((review, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex items-center mb-2">
                                <p className="font-bold mr-2">{review.user}</p>
                                <p className="text-gray-500">Rating: {review.rating}</p>
                            </div>
                            <p className="text-gray-500">{review.comment}</p>
                        </div>
                    ))}
                    <Button type="primary" className="mt-4 bg-indigo-900 border-indigo-900">
                        Book Now
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default RestaurantModal;
