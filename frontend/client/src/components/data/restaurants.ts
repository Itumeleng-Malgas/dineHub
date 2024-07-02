export interface Menu {
    item: string;
    price: number;
}

export interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
}

export interface Restaurant {
    [x: string]: any;
    id: number;
    name: string;
    description: string;
    location: string;
    cuisine: any;
    county: string;
    state: string;
    city: string;
    imageUrl: string;
    gallery: string[];
    rating: number;
    preview: string;
    menu: Menu[];
    reviews: Review[];
}

export const mockRestaurants: Restaurant[] = [
    {
        id: 1,
        name: "House of Grill",
        description: "Best BBQ in town",
        location: "123 Main St, Sandton",
        country: "ZA",
        state: "GP",
        city: "Sandton",
        imageUrl: "/dd.jpeg",
        gallery: ["/sushi.jpeg", "/mainpic.jpeg", "/wine.jpeg", "/th.jpeg"],
        rating: 4.5,
        preview: "Experience the finest grilled meats and authentic BBQ flavors at House of Grill. Our chefs use only the freshest ingredients to create mouthwatering dishes that will leave you craving more.",
        menu: [
            { item: "Beef Ribs", price: 250 },
            { item: "Chicken Wings", price: 150 },
            { item: "Pulled Pork Sandwich", price: 120 },
            { item: "Coleslaw", price: 50 },
        ],
        reviews: [
            {
                user: "Kennedy", rating: 5, comment: "Absolutely amazing! The best BBQ I've ever had.",
                id: 0
            },
            {
                user: "Yolanda", rating: 4.5, comment: "The ribs were so tender and flavorful. Loved it!",
                id: 0
            },
            {
                user: "Samantha", rating: 4, comment: "Great food, but the service could be better.",
                id: 0
            },
            {
                user: "tekoh", rating: 4.5, comment: "Highly recommended for any meat lover!",
                id: 0
            },
        ],
        cuisine: "BBQ",
        county: ""
    },
    {
        id: 2,
        name: "Solo Pizza",
        description: "Authentic Italian pizza and pasta",
        location: "13 Vista St, Rosebank",
        county: "ZA",
        state: "GP",
        city: "Johannesburg",
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
            {
                user: "Ken", rating: 5, comment: "Absolutely amazing! The best BBQ I've ever had.",
                id: 0
            },
            {
                user: "Yol", rating: 4.9, comment: "The maxican pizza was super tasty and flavorful. Loved it!",
                id: 0
            },
            {
                user: "Sam", rating: 4, comment: "Great food, but the service could be better.",
                id: 0
            },
            {
                user: "Ike", rating: 4.5, comment: "Highly recommended for any meaty pizza lover!",
                id: 0
            },
        ],
        cuisine: "Italian",

    },
    {
        id: 3,
        name: "Braai Master's",
        description: "Authentic South African braai experience",
        location: "159 Jacaranda Blvd, Rietfontein, Pretoria",
        county: "ZA",
        state: "GP",
        city: "Johannesburg",
        imageUrl: "/wors.png",
        gallery: ["/Sbraai.png", "/beef.jpeg", "/sal.png", "/steak.png"],
        rating: 4.5,
        preview: "Step into the vibrant heart of South Africa at Braai Republic. Indulge in the smoky aromas and delectable flavors of our world-renowned braai (barbecue) dishes, prepared with the finest local ingredients and traditional recipes.",
        menu: [
            { item: "Boerewors Suasage Platter", price: 250 },
            { item: "Grilled Ostrich Steak", price: 200 },
            { item: "Pap and Chakalaka", price: 120 },
            { item: "Mohodu", price: 50 },
        ],
        reviews: [
            {
                user: "Kuhle", rating: 5, comment: "Absolutely amazing! The best BBQ I've ever had.",
                id: 0
            },
            {
                user: "Themba", rating: 4.9, comment: "The boerewors sausage is the best I've ever tasted, just like back home in South Africa!",
                id: 0
            },
            {
                user: "Nicole", rating: 4, comment: "Great food, but the service could be better.",
                id: 0
            },
            {
                user: "Inno", rating: 4.5, comment: "The grilled ostrich steak was a delightful surprise. The flavors are truly authentic.",
                id: 0
            },
        ],
        cuisine: "Pizza",

    },

    {
        id: 4,
        name: "LIFE GRAND",
        description: "Best BBQ in town",
        location: "456 Maple St, Sandton",
        county: "ZA",
        state: "CA",
        city: "Cape Town",
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
            {
                user: "Kennedy", rating: 5, comment: "Absolutely amazing! The best BBQ I've ever had.",
                id: 0
            },
            {
                user: "Yolanda", rating: 4.5, comment: "The ribs were so tender and flavorful. Loved it!",
                id: 0
            },
            {
                user: "Samantha", rating: 4, comment: "Great food, but the service could be better.",
                id: 0
            },
            {
                user: "tekoh", rating: 4.5, comment: "Highly recommended for any meat lover!",
                id: 0
            },
        ],
        cuisine: 'Grill',
    },

    {
        id: 5,
        name: "Ebuka's Corner",
        description: "Best BBQ in town",
        location: "456 Maple St, Sandton",
        county: "Nigeria",
        state: "Abuja",
        city: "Kuje",
        imageUrl: "/rice.jpeg",
        gallery: ["/dd.jpeg", "/yummy.jpeg", "/yam.jpeg", "/fi.jpeg"],
        rating: 4.5,
        preview: "Experience the finest grilled meats and authentic BBQ flavors at House of Grill. Our chefs use only the freshest ingredients to create mouthwatering dishes that will leave you craving more.",
        menu: [
            { item: "Efo firo", price: 250 },
            { item: "Chicken and rice", price: 150 },
            { item: "Pappered Snails", price: 120 },
            { item: "Moi moi", price: 50 },
        ],
        reviews: [
            {
                user: "Chioma", rating: 5, comment: "Absolutely amazing! The best local dishes I've ever had.",
                id: 0
            },
            {
                user: "Tayo", rating: 4.5, comment: "The okro was so tender and flavorful. Loved it!",
                id: 0
            },
            {
                user: "Lola", rating: 4, comment: "Great food, but the service could be better.",
                id: 0
            },
            {
                user: "Uche", rating: 4.5, comment: "Highly recommended for any spicy meat lover!",
                id: 0
            },
        ],
        cuisine: 'Nigerian',
    },


    {
        id: 6,
        name: "Pasta Paradise",
        description: "Fresh sushi rolls and sashimi",
        location: "789 Oak St, Durban",
        county: "ZA",
        state: "KZN",
        city: "Durban",
        imageUrl: "/two.jpeg",
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
            {
                user: "Ebuka", rating: 5, comment: "This is the best Italian food I've had outside of Italy. The pasta is cooked to perfection!",
                id: 0
            },
            {
                user: "Noble", rating: 4.5, comment: "The tiramisu was absolutely divine. I will be back for more!",
                id: 0
            },
            {
                user: "Nonku", rating: 4, comment: "Great food, but the service could be better.",
                id: 0
            },
            {
                user: "Amanda", rating: 4.5, comment: "The atmosphere is so cozy and authentic. The service was also top-notch.",
                id: 0
            },
        ],
        cuisine: 'sushi',

    },
    {
        id: 7,
        name: "Afro Fusion",
        description: "Authentic African cuisine with a modern twist",
        location: "45 7th street, Randburg",
        county: "ZA",
        state: "GP",
        city: "Johannesburg",
        imageUrl: "/rice.jpeg",
        gallery: ["/yam.jpeg", "/fry.jpeg", "/jallof.jpeg", "/yummy.jpeg"],
        rating: 4.5,
        preview: "Discover the vibrant flavors of Africa at Afro Fusion. Our menu features a delightful blend of traditional dishes and contemporary culinary creations, all prepared with the freshest ingredients and authentic spices.",
        menu: [
            { item: "Jallof Rice", price: 80 },
            { item: "Fries Rice", price: 100 },
            { item: "Egusi", price: 120 },
            { item: "Kelewele (Fried Plantains", price: 90 },
            { item: "Beef Suya", price: 100 },
        ],
        reviews: [
            {
                user: "Ayomide", rating: 5, comment: "The flavors at Afro Fusion are simply divine. It's like a culinary journey through Africa.",
                id: 0
            },
            {
                user: "Simie", rating: 4, comment: "Great food and service. Highly recommend Egusi soup!",
                id: 0
            },
            {
                user: "Ebube", rating: 4.5, comment: "This place captures the essence of African cuisine perfectly. Highly recommended!",
                id: 0
            },
            {
                user: "Joe", rating: 4, comment: "The atmosphere is warm and inviting, and the staff is extremely knowledgeable and helpful.",
                id: 0
            },
        ],
        cuisine: "African",

    },
    {
        id: 8,
        name: "Spice Lounge",
        description: "Experience the vibrant flavors of Nigerian cuisine",
        "location": "21 Admiralty Way, Lekki",
        "county": "NG",
        "state": "Lagos",
        "city": "Lagos",
        "imageUrl": "/jalo.jpeg",
        "gallery": ["/ewa.jpeg", "/puna.jpeg", "/moin-moin.jpeg", "/ofada.jpeg"],
        "rating": 4.8,
        "preview": "Spice Lounge invites you to embark on a culinary journey through the diverse and tantalizing flavors of Nigeria. Savor our authentic dishes, made with the finest local ingredients and generations-old recipes.",
        "menu": [
            { "item": "Jollof Rice", "price": 120 },
            { "item": "Ewa Agoyin", "price": 90 },
            { "item": "Puna Soup", "price": 110 },
            { "item": "Moin-Moin", "price": 80 },
            { "item": "Ofada Rice", "price": 100 }
        ],
        "reviews": [
            {
                "user": "Amina", "rating": 5, "comment": "The best Nigerian food I've had outside of my own home. Spice Lounge is a must-visit!",
                id: 0
            },
            {
                "user": "Tayo", "rating": 4.5, "comment": "Authentic flavors and excellent service. Highly recommended for a taste of Nigeria.",
                id: 0
            },
            {
                "user": "Bimbo", "rating": 4.7, "comment": "Spice Lounge has quickly become my go-to spot for Nigerian cuisine. Consistently delicious!",
                id: 0
            },
            {
                "user": "Lola", "rating": 4.3, "comment": "The ambiance and attention to detail make Spice Lounge a truly remarkable dining experience.",
                id: 0
            }
        ],
        "cuisine": "Nigerian"
    },
    {
        "id": 9,
        "name": "Riad Maison Bleue",
        "description": "Discover the rich flavors of Moroccan cuisine in a stunning riad setting",
        "location": "27 Derb Chorfa Laksour, Marrakech",
        "county": "MA",
        "state": "Marrakech-Safi",
        "city": "Marrakech",
        "imageUrl": "/m5.jpeg",
        "gallery": ["/m1.jpeg", "/m2.jpeg", "/m3.jpeg", "/m4.jpeg"],
        "rating": 4.7,
        "preview": "Riad Maison Bleue invites you to experience the authentic, time-honored flavors of Morocco in a serene and beautifully-designed riad setting. Savor our renowned Moroccan dishes and immerse yourself in the rich cultural heritage.",
        "menu": [
            { "item": "Tagine", "price": 200 },
            { "item": "Couscous", "price": 150 },
            { "item": "Harira Soup", "price": 120 },
            { "item": "Pastilla", "price": 180 },
            { "item": "Mint Tea", "price": 50 }
        ],
        "reviews": [
            {
                "user": "Fatima", "rating": 5, "comment": "Riad Maison Bleue offers an unparalleled Moroccan culinary experience. The atmosphere and flavors are absolutely captivating.",
                id: 0
            },
            {
                "user": "Ahmed", "rating": 4.8, "comment": "Exceptional Moroccan cuisine in a stunning, traditional riad setting. I highly recommend this place.",
                id: 0
            },
            {
                "user": "Yasmin", "rating": 4.6, "comment": "The Tagine and Couscous dishes were out of this world. A true taste of Morocco.",
                id: 0
            },
            {
                "user": "Samir", "rating": 4.4, "comment": "Wonderful, authentic Moroccan fare in a serene and beautiful environment. The staff was also very attentive and knowledgeable.",
                id: 0
            }
        ],
        "cuisine": "Moroccan"
    },
    {
        "id": 10,
        "name": "Nile View",
        "description": "Savor the flavors of Egyptian cuisine with a stunning view of the Nile River",
        "location": "1 Sharia Abul Ela Al-Marsafy, Zamalek, Cairo",
        "county": "EG",
        "state": "Cairo Governorate",
        "city": "Cairo",
        "imageUrl": "/eg1.jpeg",
        "gallery": ["/eg2.jpeg", "/eg3.jpeg", "/eg4.jpeg", "/eg5.jpeg"],
        "rating": 4.6,
        "preview": "Nile View offers a unique dining experience where you can savor the rich flavors of authentic Egyptian cuisine while taking in the breathtaking views of the Nile River. Immerse yourself in the vibrant culture and hospitality of Egypt.",
        "menu": [
            { "item": "Koshary", "price": 100 },
            { "item": "Molokhia", "price": 120 },
            { "item": "Ful Medames", "price": 90 },
            { "item": "Mahshi", "price": 150 },
            { "item": "Umm Ali", "price": 80 }
        ],
        "reviews": [
            {
                "user": "Amira", "rating": 5, "comment": "Nile View is an absolute gem! The food is exceptional, and the view of the Nile is simply breathtaking.",
                id: 0
            },
            {
                "user": "Khaled", "rating": 4.7, "comment": "A truly authentic Egyptian dining experience. The Koshary and Molokhia were out of this world.",
                id: 0
            },
            {
                "user": "Hoda", "rating": 4.5, "comment": "Nile View has quickly become my go-to spot for Egyptian cuisine in Cairo. Highly recommended!",
                id: 0
            },
            {
                "user": "Mahmoud", "rating": 4.3, "comment": "The staff was incredibly friendly and knowledgeable. The food was delicious, and the Nile view was the perfect backdrop.",
                id: 0
            }
        ],
        "cuisine": "Egyptian"
    },


    // Add more restaurants here...
];
