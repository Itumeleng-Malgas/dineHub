export interface Menu {
    item: string;
    price: number;
}

export interface Review {
    user: string;
    rating: number;
    comment: string;
}

export interface Restaurant {
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

export const mockRestaurants: Restaurant[] = [
    {
        name: "House of Grill",
        description: "Best BBQ in town",
        location: "123 Main St, Sandton",
        imageUrl: "/beef.jpeg",
        gallery: ["/sushi.jpeg", "/mainpic.jpeg", "/wine.jpeg", "th.jpeg"],
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
            name: "Solo Pizza",
            description: "Authentic Italian pizza and pasta",
            location: "13 Vista St, Sandton",
            imageUrl: "/pizzaa.jpeg",
            gallery: ["/pizzaa.jpeg", "/mainpic.jpeg", "/wine.jpeg", "/beef.jpeg"],
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
            name: "LIFE GRAND",
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
            imageUrl: "/sushi.jpeg",
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
    // Add more restaurants here...
];