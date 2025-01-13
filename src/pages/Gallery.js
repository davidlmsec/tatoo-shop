import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
        // Ajoutez d'autres images ici selon vos besoins
    ];

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

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

                <div className="image-grid">
                    {filteredMedias.length === 0 ? (
                        <div className="no-images">Aucune image trouvée</div>
                    ) : (
                        filteredMedias.map(media => (
                            <div key={media.id} className="image-container">
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
                        ))
                    )}
                </div>

                {filteredMedias.length > 1 && (
                    <div className="navigation-buttons">
                        <button onClick={handlePrevious} className="nav-button prev">
                            <FaChevronLeft />
                        </button>
                        <button onClick={handleNext} className="nav-button next">
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;