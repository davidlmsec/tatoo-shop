import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ showLogo }) => {
    return (
        <header className="fixed w-full bg-black bg-opacity-50 text-white z-10">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className={`transition-opacity duration-300 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/logo-trans.png" alt="Logo" className="h-12" />
                </div>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:text-gray-300">Accueil</Link></li>
                    <li><Link to="/gallery" className="hover:text-gray-300">Galerie</Link></li>
                    <li><Link to="/services" className="hover:text-gray-300">Services</Link></li>
                    <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;