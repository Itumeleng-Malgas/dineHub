"use client";
import { Layout, Input, Button, Row, Col, Card, Modal } from 'antd';
import { EnvironmentOutlined, HeartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import FooterComponent from '@/components/Layout/Footer';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

interface Menu {
    item: string;
    price: number;
}

interface Review {
    user: string;
    rating: number;
    comment: string;
}

interface Restaurant {
    name: string;
    description: string;
    location: string;
    imageUrl: string;
    gallery: string[];
    rating: number;
    preview: string;
    menu: Menu[];
    reviews: Review[];
}

const mockRestaurants: Restaurant[] = [
    {
        name: "Solo Pizza",
        description: "Authentic Italian pizza and pasta",
        location: "123 Main St, Sandton",
        imageUrl: "/sushi.jpeg",
        gallery: ["/sushi.jpeg", "/mainpic.jpeg", "/wine.jpeg", "/beef.jpeg"],
        rating: 4.5,
        preview: "Experience the finest pizza and authentic BBQ flavors at House of Grill. Our chefs use only the freshest ingredients to create mouthwatering dishes that will leave you craving more.",
        menu: [
            { item: "Beef pizza", price: 150 },
            { item: "Maxican pizza", price: 150 },
            { item: "Pulled Pork Sandwich", price: 120 },
            { item: "Coleslaw", price: 50 },
        ],
        reviews: [
            { user: "Ken", rating: 5, comment: "Absolutely amazing! The best BBQ I've ever had." },
            { user: "Yol", rating: 4.9, comment: "The maxican pizza was super tasty and flavorful. Loved it!" },
            { user: "Sam", rating: 4, comment: "Great food, but the service could be better." },
            { user: "Ike", rating: 4.5, comment: "Highly recommended for any meaty pizza lover!" },
        ],
    },
    {
        name: "Braai Master's",
        description: "Authentic South African braai experience",
        location: "159 Jacaranda Blvd, Sandton",
        imageUrl: "/wors.png",
        gallery: ["/Sbraa.png", "/beef.jpeg", "/grill.png", "steak.png"],
        rating: 4.5,
        preview:  "Step into the vibrant heart of South Africa at Braai Republic. Indulge in the smoky aromas and delectable flavors of our world-renowned braai (barbecue) dishes, prepared with the finest local ingredients and traditional recipes.",
        menu: [
            { item: "Boerewors Suasage Platter", price: 250 },
            { item: "Grilled Ostrich Steak", price: 200 },
            { item: "Pap and Chakalaka", price: 120 },
            { item: "Mohodu", price: 50 },
        ],
        reviews: [
            { user: "Kuhle", rating: 5, comment: "Absolutely amazing! The best BBQ I've ever had." },
            { user: "Themba", rating: 4.9, comment: "The boerewors sausage is the best I've ever tasted, just like back home in South Africa!" },
            { user: "Nicole", rating: 4, comment: "Great food, but the service could be better." },
            { user: "Inno", rating: 4.5, comment: "The grilled ostrich steak was a delightful surprise. The flavors are truly authentic."},
        ],
    },

    {
        name: "House of Grill",
        description: "Best BBQ in town",
        location: "456 Maple St, Sandton",
        imageUrl: "/thee.jpeg",
        gallery: ["/dd.jpeg", "/steak.jpeg", "/two.jpeg", "/grill.jpeg"],
        rating: 4.5,
        preview: "Experience the finest grilled meats and authentic BBQ flavors at House of Grill. Our chefs use only the freshest ingredients to create mouthwatering dishes that will leave you craving more.",
        menu: [
            { item: "Beef Ribs", price: 250 },
            { item: "Chicken Wings", price: 150 },
            { item: "Pulled Pork Sandwich", price: 120 },
            { item: "Coleslaw", price: 50 },
        ],
        reviews: [
            { user: "Kennedy", rating: 5, comment: "Absolutely amazing! The best BBQ I've ever had." },
            { user: "Yolanda", rating: 4.5, comment: "The ribs were so tender and flavorful. Loved it!" },
            { user: "Samantha", rating: 4, comment: "Great food, but the service could be better." },
            { user: "tekoh", rating: 4.5, comment: "Highly recommended for any meat lover!" },
        ],
    },
    
    {
        name: "Pasta Paradise",
        description: "Fresh sushi rolls and sashimi",
        location: "789 Oak St, Sandton",
        imageUrl: "/wine.jpeg",
        gallery: ["/salom.jpeg", "/mainpic.jpeg", "/fi.jpeg", "/spaghetti.jpeg"],
        rating: 4.5,
        preview: "Experience the authentic flavors of Italy at Pasta Paradise. Our handmade pasta and sauces are crafted with the finest ingredients,transporting you to the heart of the Mediterranean.",
        menu: [
            { item: "Chicken pasta", price: 250 },
            { item: "Chicken and Chesse", price: 150 },
            { item: "Lasagna", price: 120 },
            { item: "Spaghetti Alfedo", price: 50 },
        ],
        reviews: [
            { user: "Ebuka", rating: 5, comment: "This is the best Italian food I've had outside of Italy. The pasta is cooked to perfection!" },
            { user: "Noble", rating: 4.5, comment: "The tiramisu was absolutely divine. I will be back for more!"},
            { user: "Nonku", rating: 4, comment: "Great food, but the service could be better." },
            { user: "Amanda", rating: 4.5, comment: "The atmosphere is so cozy and authentic. The service was also top-notch." },
        ],
    },
    {
        name: "Afro Fusion",
        description: "Authentic African cuisine with a modern twist",
        location: "45 7th street, Park Tow",
        imageUrl: "/rice.jpeg",
        gallery: ["/yam.jpeg", "/fry.jpeg", "/jallof.jpeg", "/yummy.jpeg"],
        rating: 4.5,
        preview: "Discover the vibrant flavors of Africa at Afro Fusion. Our menu features a delightful blend of traditional dishes and contemporary culinary creations, all prepared with the freshest ingredients and authentic spices.",
        menu: [
            { item: "Jallof Rice", price: 80 },
            { item: "Fries Rice", price: 100 },
            { item: "Egusi", price: 120 },
            { item: "Kelewele (Fried Plantains", price : 90 },
            { item: "Beef Suya", price: 100 },
        ],
        reviews: [
            { user: "Ayomide", rating: 5, comment: "The flavors at Afro Fusion are simply divine. It's like a culinary journey through Africa." },
            { user: "Simie", rating: 4, comment: "Great food and service. Highly recommend Egusi soup!" },
            { user: "Ebube", rating: 4.5, comment: "This place captures the essence of African cuisine perfectly. Highly recommended!" },
            { user: "Joe", rating: 4, comment:  "The atmosphere is warm and inviting, and the staff is extremely knowledgeable and helpful." },
        ],
    },
    
   
    // ... other restaurant objects
];

export default function Home() {
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (restaurant: Restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Layout className="min-h-screen">
            <Header className="flex justify-between items-center bg-white shadow-md p-4 z-10">
                <div className="text-indigo-900 font-bold text-xl">Restaurant Reservation</div>
                <Button type="primary" shape="round" icon={<HeartOutlined />} className="bg-indigo-900 border-indigo-900">
                    Favorites
                </Button>
            </Header>
            <Content className="p-12 text-center z-10">
                {/* Search Bar */}
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">From Casual Eats to Fine Dining: Reserve Your Perfect Spot!</h1>
                    <Row gutter={[16, 16]} className="mt-5">
                        <Col xs={24} md={8}>
                            <Input
                                size="large"
                                placeholder="Sandton"
                                prefix={<EnvironmentOutlined />}
                                className="w-full"
                            />
                        </Col>
                        <Col xs={24} md={16}>
                            <Search
                                size="large"
                                placeholder="Cuisine, restaurant name..."
                                enterButton="Search"
                                className="w-full"
                            />
                        </Col>
                    </Row>
                </div>
                <Row gutter={[16, 16]} className="mt-10">
                    {mockRestaurants.map((restaurant, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card
                                hoverable
                                cover={
                                    <div className="relative">
                                        <img alt={restaurant.name} src={restaurant.imageUrl} className="w-full h-48 object-cover" />
                                        <HeartOutlined className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2 cursor-pointer" />
                                    </div>
                                }
                                className="mb-5 shadow-md"
                                onClick={() => showModal(restaurant)}
                            >
                                <Card.Meta
                                    title={restaurant.name}
                                    description={
                                        <div>
                                            <p className="text-gray-500">{restaurant.description}</p>
                                            <p className="text-gray-500">{restaurant.location}</p>
                                        </div>
                                    }
                                />
                                <Button type="primary" className="mt-4 bg-indigo-900 border-indigo-900">
                                    Book Tonight
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
            <Footer className="text-center bg-indigo-900 text-white p-4">
                <FooterComponent />
            </Footer>

            {selectedRestaurant && (
                <Modal
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    width="80%"
                    style={{ top: 20 }}
                >
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <img src={selectedRestaurant.imageUrl} alt={selectedRestaurant.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{selectedRestaurant.name}</h2>
                            <div className="flex items-center mb-4">
                                <EnvironmentOutlined className="mr-2 text-indigo-900" />
                                <p className="text-gray-500">{selectedRestaurant.location}</p>
                            </div>
                            <p className="text-gray-500 mb-4">{selectedRestaurant.preview}</p>
                            <h3 className="text-lg font-bold mb-4">Restaurant Gallery</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {selectedRestaurant.gallery.map((image, index) => (
                                    <img key={index} src={image} alt={`Gallery ${index}`} className="w-full h-32 object-cover" />
                                ))}
                            </div>
                            <h3 className="text-lg font-bold mb-4 mt-4">Menu</h3>
                            <ul className="list-disc pl-4">
                                {selectedRestaurant.menu.map((item, index) => (
                                    <li key={index} className="text-gray-500">
                                        {item.item} - R{item.price}
                                    </li>
                                ))}
                            </ul>
                            <h3 className="text-lg font-bold mb-4 mt-4">Reviews</h3>
                            {selectedRestaurant.reviews.map((review, index) => (
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
            )}
        </Layout>
    );
}
