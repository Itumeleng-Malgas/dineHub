import Link from 'next/link'
import React from 'react'

const ClientFooter = () => {
  return (
    <footer>
        <div className="flex justify-center gap-8">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Facebook</a>
        <Link href="/about" className="hover:text-gray-400">About Us</Link>
        <Link href="/contact" className="hover:text-gray-400">Contact</Link>
        <Link href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
        </div>
        <p className="text-center mt-2">© 2024 DineHub. All rights reserved.</p>
    </footer>
  )
}

export default ClientFooter