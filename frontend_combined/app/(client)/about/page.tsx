import Image from 'next/image';
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to our restaurant booking website! Our mission is to help you discover the best dining experiences all around Africa. Whether you&apos;re looking for a cozy cafe, a family-friendly restaurant, or a fine-dining establishment, we&apos;ve got you covered.
      </p>
      <p className="text-lg mb-4">
        Our mission is to make dining out easy and enjoyable. Whether you&apos;re looking for a new place to try or want to book your favorite spot, we&apos;ve got you covered!
      </p>
      <h2 className="text-xl font-bold mb-2">Our Vision</h2>
      <p className="text-lg mb-4">
        We believe that food is more than just sustenance; it&apos;s a way to connect with others, explore new cultures, and create lasting memories. Our vision is to make it easy for you to find the perfect restaurant for any occasion, whether you&apos;re planning a romantic dinner, a business lunch, or a casual brunch with friends.
      </p>
      <h2 className="text-xl font-bold mb-2">Our Services</h2>
      <p className="text-lg mb-4">
        Our website offers a variety of features to enhance your dining experience:
      </p>
      <ul className="list-disc pl-4 mb-4">
        <li>
          <strong>Restaurant Reviews:</strong> Read honest reviews from other diners to help you make informed decisions.
        </li>
        <li>
          <strong>Restaurant Details:</strong> Get detailed information about each restaurant, including menus, photos, and ratings.
        </li>
        <li>
          <strong>Booking Service:</strong> Reserve your table directly through our website with just a few clicks.
        </li>
        <li>
          <strong>Favorites:</strong> Save your favorite restaurants for easy access later.
        </li>
      </ul>
      <h2 className="text-xl font-bold mb-2">Our Team</h2>
      <p className="text-lg mb-4">
        Our team is passionate about food and dedicated to providing you with the best possible experience. We&apos;re constantly working to improve our website and add new features to make your dining experience even better.
      </p>
      <div className="team grid grid-cols-2 gap-4">
        <div className="team-member text-center">
          <Image src="/Yandah.jpeg" alt="Yandah" width={150} height={150} className="rounded-full" />
          <p className="text-lg font-bold mt-2">Nonkuu &quot;Yandah&quot; Khanyile</p>
          <p className="text-md">Frontend Developer</p>
        </div>
        <div className="team-member text-center">
          <Image src="/Tumi.jpeg" alt="Tumi" width={100} height={150} className="rounded-full" />
          <p className="text-lg font-bold mt-2">Itumeleng Malgas</p>
          <p className="text-md">Frontend Developer</p>
        </div>
        <div className="team-member text-center">
          <Image src="/Ebuka.jpeg" alt="Ebuka" width={100} height={150} className="rounded-full" />
          <p className="text-lg font-bold mt-2">Chukwuebuka Anyaeji</p>
          <p className="text-md">Backend Developer</p>
        </div>
        <div className="team-member text-center">
          <Image src="/Tekoh.jpeg" alt="Tekoh" width={150} height={150} className="rounded-full" />
          <p className="text-lg font-bold mt-2">Tekoh Palma</p>
          <p className="text-md">Backend Developer</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">Contact Us</h2>
      <p className="text-lg mb-4">
        If you have any questions, feedback, or suggestions, we&apos;d love to hear from you. Please feel free to reach out to us at contact@dinehub.com.
      </p>
      <p className="text-lg">
        Thank you for choosing our website to help you discover your next great dining experience. We hope you enjoy using our services as much as we enjoy providing them to you!
      </p>
    </div>
  );
};

export default AboutUs;
