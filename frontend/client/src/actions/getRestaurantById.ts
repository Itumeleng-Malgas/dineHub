// src/actions/getRestaurantById.ts
export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviews: string[];
}

const mockRestaurants: Restaurant[] = [
  {
      id: '1',
      name: 'Restaurant 1',
      rating: 4.5,
      reviews: ['Great food!', 'Excellent service.']
  },
  {
      id: '2',
      name: 'Restaurant 2',
      rating: 4.0,
      reviews: ['Nice ambiance.', 'Good value for money.']
  }
];

const getRestaurantById = async (id: string): Promise<Restaurant> => {
  return new Promise((resolve, reject) => {
      const restaurant = mockRestaurants.find((r) => r.id === id);
      if (restaurant) {
          setTimeout(() => resolve(restaurant), 1000); // Simulate network delay
      } else {
          reject(new Error('Restaurant not found'));
      }
  });
};

export default getRestaurantById;
