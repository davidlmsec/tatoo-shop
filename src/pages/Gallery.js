import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
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

    useEffect(() => {
        filterMedias();
    }, [selectedCategory, medias]);

    const fetchMedias = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/medias`);
            const data = await response.json();
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const filterMedias = () => {
        if (selectedCategory === 'all') {
            setFilteredMedias(medias);
        } else {
            setFilteredMedias(medias.filter(media => media.category_id === selectedCategory));
        }
        setCurrentMediaIndex(0);
    };

    const handlePrevious = () => {
        setCurrentMediaIndex((prev) =>
            prev === 0 ? filteredMedias.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentMediaIndex((prev) =>
            prev === filteredMedias.length - 1 ? 0 : prev + 1
        );
    };

    const toggleFullscreen = () => {
        const element = document.documentElement;
        if (!isFullscreen) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    const MediaDisplay = ({ media }) => {
        if (media.file_type === 'video') {
            return (
                <video
                    controls
                    className="w-full h-full object-contain"
                    src={`${process.env.REACT_APP_API_URL}${media.file_path}`}
                />
            );
        }
        return (
            <img
                src={`${process.env.REACT_APP_API_URL}${media.file_path}`}
                alt={media.title}
                className="w-full h-full object-contain"
                loading="lazy"
            />
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

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <motion.div className="image-viewer">
                        <button
                            className="nav-button prev"
                            onClick={handlePrevious}
                            aria-label="Image précédente"
                        >
                            <FaChevronLeft />
                        </button>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentMediaIndex}
                                className="image-container"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {filteredMedias[currentMediaIndex] && (
                                    <>
                                        <MediaDisplay media={filteredMedias[currentMediaIndex]} />
                                        <button
                                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                            onClick={toggleFullscreen}
                                        >
                                            {isFullscreen ? <FaCompress /> : <FaExpand />}
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <button
                            className="nav-button next"
                            onClick={handleNext}
                            aria-label="Image suivante"
                        >
                            <FaChevronRight />
                        </button>
                    </motion.div>
                )}

                {filteredMedias.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Aucun média trouvé dans cette catégorie</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;