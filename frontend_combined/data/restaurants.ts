export interface Menu {
    item: string;
    price: number;
}

export interface Review {
    userEmail: string | null | undefined;
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
                id: 0,
                userEmail: "aaron.tumi@live.co.za"
            },
            {
                user: "Yolanda", rating: 4.5, comment: "The ribs were so tender and flavorful. Loved it!",
                id: 1,
                userEmail: "aaron.tumi@live.co.za"
            },
            {
                user: "Samantha", rating: 4, comment: "Great food, but the service could be better.",
                id: 0,
                userEmail: "aaron@live.co.za"
            },
            {
                user: "tekoh", rating: 4.5, comment: "Highly recommended for any meat lover!",
                id: 0,
                userEmail: "tumi@live.co.za"
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
                id: 0,
                userEmail: "aaron.t@live.co.za"
            },
            {
                user: "Yol", rating: 4.9, comment: "The maxican pizza was super tasty and flavorful. Loved it!",
                id: 0,
                userEmail: "aaron.tu@live.co.za"
            },
            {
                user: "Sam", rating: 4, comment: "Great food, but the service could be better.",
                id: 1,
                userEmail: "aaron.tum@live.co.za"
            },
            {
                user: "Ike", rating: 4.5, comment: "Highly recommended for any meaty pizza lover!",
                id: 0,
                userEmail: "aaron.tumi@live.co.za"
            },
        ],
        cuisine: "Italian",
        openingHours: "Mon-Fri: 9am - 10pm, Sat-Sun: 10am - 11pm",
        contact: "+27110345632",
        features: ['Outdoor Seating', 'Free Wi-Fi', 'Live Music']

    },
    

    // Add more restaurants here...
];
