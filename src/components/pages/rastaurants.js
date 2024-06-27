// pages/restaurants.js
import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { Grid } from "@shadcn/ui";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurant data from a backend API or local data source
    const fetchRestaurants = async () => {
      const response = await fetch("/api/restaurants");
      const data = await response.json();
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Grid className="gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </Grid>
    </div>
  );
};

export default RestaurantsPage;