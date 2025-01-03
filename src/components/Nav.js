import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/img/logo.png'; // Assurez-vous que le chemin est correct

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navigation fixed-nav">
            <div className="logo-container">
                <img src={logoImage} alt="AU 180 Logo" className="logo" />
            </div>
            <div className="burger-menu" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><Link to="/" onClick={toggleMenu}>Bio</Link></li>
                <li><Link to="/gallery" onClick={toggleMenu}>Galerie</Link></li>
                <li><Link to="/info" onClick={toggleMenu}>Info&Tarifs</Link></li>
                <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;