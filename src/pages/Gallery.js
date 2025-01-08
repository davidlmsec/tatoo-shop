import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';
import backgroundImage from '../assets/img/image_fond.png';

const Gallery = () => {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMedias();
        fetchCategories();
    }, []);

    const fetchMedias = async () => {
        try {
            console.log('Fetching medias...');
            const response = await fetch('http://localhost:3001/api/medias');
            const data = await response.json();
            console.log('Medias received:', data);
            setMedias(data);
            setFilteredMedias(data);
        } catch (error) {
            console.error('Error fetching medias:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            console.log('Fetching categories...');
            const response = await fetch('http://localhost:3001/api/categories');
            const data = await response.json();
            console.log('Categories received:', data);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredMedias(medias);
        } else {
            const filtered = medias.filter(media => media.category_id === parseInt(selectedCategory));
            setFilteredMedias(filtered);
        }
        setCurrentMediaIndex(0);
    }, [selectedCategory, medias]);

    const MediaDisplay = ({ media }) => {
        if (!media) return null;

        console.log('Rendering media:', media);
        const imageUrl = `http://localhost:3001${media.file_path}`;
        console.log('Image URL:', imageUrl);

        return (
            <div className="relative w-full h-full">
                <img
                    src={imageUrl}
                    alt={media.title}
                    className="w-full h-full object-contain"
                    onLoad={() => console.log('Image loaded successfully')}
                    onError={(e) => {
                        console.error('Error loading image:', e);
                        e.target.src = 'placeholder.jpg'; // Optionnel : image par défaut
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                    <h3 className="text-lg font-semibold">{media.title}</h3>
                    <p className="text-sm">{media.description}</p>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
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

                {filteredMedias.length > 0 ? (
                    <div className="image-viewer">
                        <button
                            className="nav-button prev"
                            onClick={() => setCurrentMediaIndex((prev) =>
                                prev === 0 ? filteredMedias.length - 1 : prev - 1
                            )}
                        >
                            <FaChevronLeft />
                        </button>

                        <div className="image-container">
                            <MediaDisplay media={filteredMedias[currentMediaIndex]} />
                        </div>

                        <button
                            className="nav-button next"
                            onClick={() => setCurrentMediaIndex((prev) =>
                                prev === filteredMedias.length - 1 ? 0 : prev + 1
                            )}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Aucun média trouvé dans cette catégorie</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;