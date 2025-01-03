import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="contact-info">
                    <h2>Contactez moi</h2>
                    <p>Lieu : Au 180</p>
                    <p>Tél: +337.78.52.00.52</p>
                    <p>Mail: contact@au180-tatoo.fr</p>
                </div>
                <div className="copyright">
                    <p>Copyright - David LE MEUR 2024</p>
                </div>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;