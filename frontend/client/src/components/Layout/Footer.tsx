import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-transparent text-white py-6">
      <div className="flex justify-center gap-8">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Facebook</a>
        <a href="/about" className="hover:text-gray-400">About Us</a>
        <a href="/contact" className="hover:text-gray-400">Contact</a>
        <a href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</a>
      </div>
      <p className="text-center mt-4">© 2024 DineHub. All rights reserved.</p>
    </footer>
  );
};

export default FooterComponent;
