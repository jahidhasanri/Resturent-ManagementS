import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div
                className="relative w-full lg:w-[1200px] h-[400px] sm:h-[500px] md:h-[700px] bg-cover bg-center rounded-xl shadow-lg text-white text-center overflow-hidden"
                style={{
                    backgroundImage: `https://i.ibb.co/C5hqyDDj/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad.jpg`,
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-65"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
                    <h1 className="text-[80px] font-bold drop-shadow-md">404</h1>
                    <p className="text-2xl mt-1 drop-shadow-sm mb-2">Oops! Page not found</p>
                    <p className="text-sm mt-2 max-w-lg drop-shadow-sm mb-5">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                   
                    <Link to='/' className="bg-red-600 text-white px-4 py-2 text-sm flex items-center gap-1 hover:bg-red-700 transition rounded-md">
                                   Go Back Home
                     </Link>
                </div>
            </div>
        </div>
    );
};

export default Error;
