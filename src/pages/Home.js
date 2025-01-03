import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import logoImage from '../assets/img/logo.png';
import backgroundImage from '../assets/img/image_fond.png';
import tattooistImage from '../assets/img/logo.png';

const Home = () => {
    const [backgroundOpacity, setBackgroundOpacity] = useState(0);
    const [showNavigation, setShowNavigation] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const startTransition = setTimeout(() => {
            const transitionDuration = 1000; // 1 second
            const startTime = Date.now();

            const updateOpacity = () => {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime < transitionDuration) {
                    setBackgroundOpacity(elapsedTime / transitionDuration);
                    requestAnimationFrame(updateOpacity);
                } else {
                    setBackgroundOpacity(1);
                }
            };

            requestAnimationFrame(updateOpacity);
        }, 500); // Start after 0.5 seconds

        return () => clearTimeout(startTransition);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowNavigation(true);
                setShowContent(true);
            } else {
                setShowNavigation(false);
                setShowContent(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`home ${showContent ? 'show-content' : ''}`}>
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    opacity: backgroundOpacity
                }}
            />
            <img src={logoImage} alt="AU 180 Logo" className="center-logo" />

            {backgroundOpacity > 0 && !showNavigation && (
                <div className="nav-links-only">
                    <Link to="/">Bio</Link>
                    <Link to="/gallery">Galerie</Link>
                    <Link to="/services">Divers</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            )}

            {showNavigation && <Nav />}

            <div className="content">
                <img src={tattooistImage} alt="Tatoueur" className="tattooist-image" />
                <div className="card">
                    <p>
                        Je me suis installé depuis début 2023 dans un salon intimiste au cœur d’un charmant village de caractère en Ardèche : Meyras.
                        Riche de plus de 10 ans de pratique dans différents studios implantés, je propose de multiple styles des plus classiques aux plus originaux.
                        Je mets un point d’honneur à saisir le souhait de chaque personne, et à l’aider à traduire ses envies à travers une création graphique unique et originale.
                        L’écoute, l’empathie et l’intuition me guident dans cette démarche. C’est pourquoi j’accorde beaucoup d’importance à une entrevue « en physique » au salon pour cerner aux mieux vos attentes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;