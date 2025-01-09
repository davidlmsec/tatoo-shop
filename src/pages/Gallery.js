import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import backgroundImage from '../assets/img/image_fond.png';

const Gallery = () => {
    const [medias, setMedias] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    // Configuration de base pour les requêtes fetch
    const fetchConfig = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des médias
                const mediasResponse = await fetch('http://localhost:3001/api/medias', fetchConfig);
                if (!mediasResponse.ok) {
                    throw new Error(`HTTP error! status: ${mediasResponse.status}`);
                }
                const mediasText = await mediasResponse.text();
                console.log('Réponse brute médias:', mediasText);
                const mediasData = JSON.parse(mediasText);
                setMedias(mediasData);

                // Récupération des catégories
                const categoriesResponse = await fetch('http://localhost:3001/api/categories', fetchConfig);
                if (!categoriesResponse.ok) {
                    throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
                }
                const categoriesText = await categoriesResponse.text();
                console.log('Réponse brute catégories:', categoriesText);
                const categoriesData = JSON.parse(categoriesText);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredMedias = selectedCategory === 'all'
        ? medias
        : medias.filter(media => media.category_id === parseInt(selectedCategory));

    if (loading) {
        return <div>Chargement...</div>;
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
                    {filteredMedias.map(media => (
                        <div key={media.id} className="image-container">
                            <img
                                src={`http://localhost:3001${media.file_path}`}
                                alt={media.title}
                                onLoad={() => console.log('Image chargée:', media.title)}
                                onError={(e) => console.error('Erreur de chargement de l\'image:', media.file_path)}
                            />
                            <div className="image-info">
                                <h3>{media.title}</h3>
                                <p>{media.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredMedias.length === 0 && (
                    <div className="no-results">
                        <p>Aucune image trouvée dans cette catégorie</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;