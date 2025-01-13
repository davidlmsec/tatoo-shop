import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import backgroundImage from '../assets/img/image_fond.png';

const Gallery = () => {
    // Catégories statiques
    const categories = [
        { id: 1, name: 'Le salon', slug: 'salon' },
        { id: 2, name: 'Dotwork', slug: 'dotwork' },
        { id: 3, name: 'Graphique', slug: 'graphique' },
        { id: 4, name: 'Nature', slug: 'nature' },
        { id: 5, name: 'Ornemental', slug: 'ornemental' }
    ];

    // Images statiques
    const allMedias = [
        {
            id: 1,
            title: "Le salon",
            description: "Notre espace de travail",
            file_path: "/uploads/images/salon/salon1.jpg",
            category_id: 1
        },
        {
            id: 2,
            title: "Dotwork classique",
            description: "Technique pointilliste",
            file_path: "/uploads/images/dotwork/dotwork1.jpg",
            category_id: 2
        },
        {
            id: 3,
            title: "Design graphique",
            description: "Style moderne",
            file_path: "/uploads/images/graphisme/tattooer-working-with-machine.jpg",
            category_id: 3
        }
    ];

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Filtrage des médias selon la catégorie sélectionnée
    const filteredMedias = selectedCategory === 'all'
        ? allMedias
        : allMedias.filter(media => media.category_id === parseInt(selectedCategory));

    const handlePrevious = () => {
        setCurrentMediaIndex(prev =>
            prev === 0 ? filteredMedias.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentMediaIndex(prev =>
            prev === filteredMedias.length - 1 ? 0 : prev + 1
        );
    };

    const handleImageClick = (media) => {
        setSelectedImage(media);
        setShowPopup(true);
    };

    const Popup = () => {
        if (!showPopup || !selectedImage) return null;

        return (
            <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                <div className="popup-content" onClick={e => e.stopPropagation()}>
                    <button className="popup-close" onClick={() => setShowPopup(false)}>
                        <FaTimes />
                    </button>
                    <img
                        src={selectedImage.file_path}
                        alt={selectedImage.title}
                    />
                    <div className="popup-info">
                        <h3>{selectedImage.title}</h3>
                        <p>{selectedImage.description}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderMedia = () => {
        if (selectedCategory === 'all') {
            return (
                <div className="image-grid">
                    {filteredMedias.map(media => (
                        <div
                            key={media.id}
                            className="image-container"
                            onClick={() => handleImageClick(media)}
                        >
                            <img
                                src={media.file_path}
                                alt={media.title}
                                onError={(e) => {
                                    console.error('Erreur de chargement image:', media.file_path);
                                    e.target.src = backgroundImage;
                                }}
                            />
                            <div className="image-info">
                                <h3>{media.title}</h3>
                                <p>{media.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="single-image-viewer">
                    {filteredMedias.length > 0 && (
                        <>
                            <div
                                className="image-container"
                                onClick={() => handleImageClick(filteredMedias[currentMediaIndex])}
                            >
                                <img
                                    src={filteredMedias[currentMediaIndex].file_path}
                                    alt={filteredMedias[currentMediaIndex].title}
                                    onError={(e) => {
                                        console.error('Erreur de chargement image:', filteredMedias[currentMediaIndex].file_path);
                                        e.target.src = backgroundImage;
                                    }}
                                />
                                <div className="image-info">
                                    <h3>{filteredMedias[currentMediaIndex].title}</h3>
                                    <p>{filteredMedias[currentMediaIndex].description}</p>
                                </div>
                            </div>
                            <div className="navigation-buttons">
                                <button onClick={handlePrevious} className="nav-button prev">
                                    <FaChevronLeft />
                                </button>
                                <button onClick={handleNext} className="nav-button next">
                                    <FaChevronRight />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            );
        }
    };

    return (
        <div className="gallery-page">
            <div
                className="background-image"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            <div className="content-wrapper">
                <div className="category-nav">
                    <button
                        className={`${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        Tout visualiser
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`${selectedCategory === category.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {renderMedia()}
            </div>
            <Popup />
        </div>
    );
};

export default Gallery;