import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white bg-opacity-90 w-full">
    <div className="container px-0 py-4 mx-auto">
      <div className='lg:flex lg:items-center lg:justify-between'>
        <div className="lg:flex lg:items-center lg:justify-between grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="lg:col-span-2 lg:flex lg:flex-col lg:justify-center">
            <div className="font-semibold text-black mb-2">Quick Links</div>
            <div className="text-black mb-4">
              <Link to="/" className="transition-colors duration-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Home</Link>
              <br />
              <Link to="/about" className="transition-colors duration-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">About Us</Link>
            </div>
  
            <div className="font-semibold text-black mb-2">Properties</div>
            <div className="text-black">
              <div onClick={() => { window.location.href = '/search?type=sale' }} className="cursor-pointer transition-colors duration-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">For Sale</div>
              <div onClick={() => { window.location.href = '/search?type=rent' }} className="cursor-pointer transition-colors duration-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">For Rent</div>
            </div>
          </div>
  
          <div className="lg:col-span-2 lg:mt-4">
            <div className="font-semibold text-black mb-2">About Our Website</div>
            <div className="text-black">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac justo id nisl tincidunt commodo. In hac habitasse platea dictumst.
              </p>
            </div>
          </div>
        </div>
      
        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700"/>
      
        <div className="flex items-center justify-between">
          <a href="#">
            {/* Keep the logo link */}
          </a>
        </div>
      </div>
    </div>
  </footer>
  

  )
}
