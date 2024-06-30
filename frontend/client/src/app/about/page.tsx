import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to our restaurant booking website! Our mission is to
        help you discover the best dining experiences all around Africa. Whether
        you're looking for a cozy cafe, a family-friendly restaurant, or a
        fine-dining establishment, we've got you covered.
      </p>
      <h2 className="text-xl font-bold mb-2">Our Vision</h2>
      <p className="text-lg mb-4">
        We believe that food is more than just sustenance; it's a way to connect
        with others, explore new cultures, and create lasting memories. Our
        vision is to make it easy for you to find the perfect restaurant for any
        occasion, whether you're planning a romantic dinner, a business lunch,
        or a casual brunch with friends.
      </p>
      <h2 className="text-xl font-bold mb-2">Our Services</h2>
      <p className="text-lg mb-4">
        Our website offers a variety of features to enhance your dining
        experience:
      </p>
      <ul className="list-disc pl-4 mb-4">
        <li>
          <strong>Restaurant Reviews:</strong> Read honest reviews from other
          diners to help you make informed decisions.
        </li>
        <li>
          <strong>Restaurant Details:</strong> Get detailed information about
          each restaurant, including menus, photos, and ratings.
        </li>
        <li>
          <strong>Booking Service:</strong> Reserve your table directly through
          our website with just a few clicks.
        </li>
        <li>
          <strong>Favorites:</strong> Save your favorite restaurants for easy
          access later.
        </li>
      </ul>
      <h2 className="text-xl font-bold mb-2">Our Team</h2>
      <p className="text-lg mb-4">
        Our team is passionate about food and dedicated to providing you with
        the best possible experience. We're constantly working to improve our
        website and add new features to make your dining experience even better.
      </p>
      <h2 className="text-xl font-bold mb-2">Contact Us</h2>
      <p className="text-lg mb-4">
        If you have any questions, feedback, or suggestions, we'd love to hear
        from you. Please feel free to reach out to us at
        contact@dinehub.com.
      </p>
      <p className="text-lg">
        Thank you for choosing our website to help you discover your next great
        dining experience. We hope you enjoy using our services as much as we
        enjoy providing them to you!
      </p>
    </div>
  );
};

export default AboutUs;
