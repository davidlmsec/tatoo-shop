import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import backgroundImage from '../assets/img/image_fond.png';

const Gallery = () => {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Données de test
        const mockCategories = [
            { id: 1, name: 'Le salon', slug: 'salon' },
            { id: 2, name: 'Dotwork', slug: 'dotwork' },
            { id: 3, name: 'Graphique', slug: 'graphique' },
            { id: 4, name: 'Nature', slug: 'nature' },
            { id: 5, name: 'Ornemental', slug: 'ornemental' }
        ];

        const mockMedias = [
            {
                id: 1,
                title: "Image Test 1",
                description: "Description test 1",
                file_path: "/uploads/images/graphisme/tattooer-working-with-machine.jpg",
                file_type: "image",
                category_id: 3
            }
            // Vous pouvez ajouter plus d'images de test ici
        ];

        setCategories(mockCategories);
        setMedias(mockMedias);
        setFilteredMedias(mockMedias);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredMedias(medias);
        } else {
            const filtered = medias.filter(media => media.category_id === parseInt(selectedCategory));
            setFilteredMedias(filtered);
        }
    }, [selectedCategory, medias]);

    if (isLoading) {
        return <div>Chargement en cours...</div>;
    }

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
                        <div>Aucune image trouvée</div>
                    ) : (
                        filteredMedias.map(media => (
                            <div key={media.id} className="image-container">
                                <img
                                    src={media.file_path}
                                    alt={media.title}
                                    className="w-full h-full object-cover"
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
            </div>
        </div>
    );
};

export default Gallery;