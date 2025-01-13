import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import backgroundImage from '../assets/img/image_fond.png';

const Gallery = () => {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Début du chargement des données');
                // Fetch des médias
                const mediasResponse = await fetch('http://localhost:3001/api/medias');
                if (!mediasResponse.ok) {
                    throw new Error(`HTTP error! status: ${mediasResponse.status}`);
                }
                const mediasData = await mediasResponse.json();
                console.log('Médias reçus:', mediasData);
                setMedias(mediasData);
                setFilteredMedias(mediasData);

                // Fetch des catégories
                const categoriesResponse = await fetch('http://localhost:3001/api/categories');
                if (!categoriesResponse.ok) {
                    throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
                }
                const categoriesData = await categoriesResponse.json();
                console.log('Catégories reçues:', categoriesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Erreur lors du chargement:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filtrage des médias
    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredMedias(medias);
        } else {
            const filtered = medias.filter(media =>
                media.category_id === parseInt(selectedCategory)
            );
            setFilteredMedias(filtered);
        }
    }, [selectedCategory, medias]);

    if (isLoading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>Erreur de chargement: {error}</div>;
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
                                {media.file_type === 'video' ? (
                                    <video
                                        controls
                                        src={`http://localhost:3001${media.file_path}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={`http://localhost:3001${media.file_path}`}
                                        alt={media.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            console.error('Erreur de chargement image:', media.file_path);
                                            e.target.src = backgroundImage; // Image par défaut
                                        }}
                                    />
                                )}
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