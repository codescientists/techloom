import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black py-10 text-white">
      <div className="container grid grid-cols-1 md:grid-cols-4 w-full">
            <div className="flex flex-col items-start">
                <h2 className="font-bold text-xl tracking-tight">TechLoom</h2>
                <div className="flex flex-col items-start">
                <a href="#" className="text-white hover:text-gray-300 mr-4">Subscribe
                </a>
                <p className="text-sm">Get 10% off your first order
                </p>
                </div>
            </div>
            <div className="flex flex-col md:items-start mb-4 md:mb-0">
                <h4 className="font-semibold text-md mb-2 md:mb-0">Support</h4>
                <div className="flex flex-col items-start">
                    <p className="text-sm">
                        Mumbai, Maharashtra, India.
                    </p>
                    <a href="#" className="text-white hover:text-gray-300">
                        +123-123-1233
                    </a>
                    <a href="#" className="text-white hover:text-gray-300">
                        techloom@gmail.com
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-start">
                <h4 className="font-semibold text-sm mb-2 md:mb-0">Account</h4>
                <ul className="mt-2">
                    <li className="mb-2">
                        <a href="#" className="text-white hover:text-gray-300">My Account</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-white hover:text-gray-300">Login / Register</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-white hover:text-gray-300">Cart</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-white hover:text-gray-300">Wishlist</a>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h4 className="font-semibold text-sm mb-2 md:mb-0">Quick Link</h4>
                <ul className="mt-2">
                    <li className="mb-2">
                    <a href="#" className="text-white hover:text-gray-300">Privacy Policy</a>
                    </li>
                    <li className="mb-2">
                    <a href="#" className="text-white hover:text-gray-300">Terms Of Use</a>
                    </li>
                    <li className="mb-2">
                    <a href="#" className="text-white hover:text-gray-300">FAQ</a>
                    </li>
                    <li className="mb-2">
                    <a href="#" className="text-white hover:text-gray-300">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
  );
};

export default Footer;