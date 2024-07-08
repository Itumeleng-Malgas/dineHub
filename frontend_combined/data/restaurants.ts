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
    openingHours: string;
    contact: string;
    features: string[];
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
        county: "",
        openingHours: "Mon-Fri: 9am - 10pm, Sat-Sun: 10am - 11pm",
        contact: "+27110345632",
        features: ['Outdoor Seating', 'Free Wi-Fi', 'Live Music']
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
        openingHours: "Mon-Fri: 9am - 10pm, Sat-Sun: 10am - 11pm",
        contact: "+27110345632",
        features: ['Outdoor Seating', 'Free Wi-Fi', 'Live Music']

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
        openingHours: "Mon-Fri: 9am - 10pm, Sat-Sun: 10am - 11pm",
        contact: "+27110345632",
        features: ['Outdoor Seating', 'Free Wi-Fi', 'Live Music']

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
        openingHours: "Mon-Fri: 9am - 10pm, Sat-Sun: 10am - 11pm",
        contact: "+27110345632",
        features: ['Outdoor Seating', 'Free Wi-Fi', 'Live Music']
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
        openingHours: "Mon-Fri: 9am - 10pm, Sat-Sun: 10am - 11pm",
        contact: "+27110345632",
        features: ['Outdoor Seating', 'Free Wi-Fi', 'Live Music']
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
        openingHours: "Mon-Fri: 9am - 10pm, Sat-Sun: 10am - 11pm",
        contact: "+27110345632",
        features: ['Outdoor Seating', 'Free Wi-Fi', 'Live Music']

    },

    // Add more restaurants here...
];
