import React from 'react'

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 py-6">
      <div className="flex justify-center gap-8">
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">Facebook</a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">About Us</a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">Contact</a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">Privacy Policy</a>
      </div>
      <p className="text-center text-white mt-4">© 2024 Dine-Hub. All rights reserved.</p>
    </footer>
  )
}

export default FooterComponent