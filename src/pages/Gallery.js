import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import backgroundImage from '../assets/img/image_fond.png';

const Gallery = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Ici, vous feriez normalement un appel API pour récupérer les catégories et les images
        // Pour l'exemple, nous utiliserons des données statiques
        setCategories(['Le salon', 'Dotwork', 'Graphique', 'Nature', 'Ornemental']);
        setSelectedCategory('Le salon');
        setImages([
            '/path/to/image1.jpg',
            '/path/to/image2.jpg',
            '/path/to/image3.jpg',
        ]);
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentImageIndex(0);
        // Ici, vous feriez un appel API pour récupérer les images de la catégorie sélectionnée
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="page-container">
            <div className="gallery-page">
                <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div className="content-wrapper">
                    <div className="category-nav">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={selectedCategory === category ? 'active' : ''}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="image-viewer">
                        <button className="nav-button prev" onClick={handlePrevImage}>
                            <FaChevronLeft />
                        </button>
                        <div className="image-container">
                            {images.length > 0 && (
                                <img src={images[currentImageIndex]} alt={`Tattoo ${currentImageIndex + 1}`} />
                            )}
                        </div>
                        <button className="nav-button next" onClick={handleNextImage}>
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;