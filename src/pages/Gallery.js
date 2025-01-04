import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import backgroundImage from '../assets/img/image_fond.png';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
        fetchCategories();
    }, []);

    useEffect(() => {
        filterImages();
    }, [selectedCategory, searchTerm, images]);

    const fetchImages = async () => {
        try {
            const response = await fetch('http://your-api-url/api/images');
            const data = await response.json();
            setImages(data);
            setFilteredImages(data);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://your-api-url/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const filterImages = () => {
        let filtered = [...images];

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(img => img.category_id === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(img =>
                img.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredImages(filtered);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">Toutes les catégories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                /* Image Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map(image => (
                        <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={`http://your-server-url${image.file_path}`}
                                alt={image.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{image.name}</h3>
                                <p className="text-sm text-gray-600">
                                    {categories.find(cat => cat.id === image.category_id)?.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No Results Message */}
            {filteredImages.length === 0 && !loading && (
                <div className="text-center py-12">
                    <p className="text-gray-600">Aucune image trouvée</p>
                </div>
            )}
        </div>
    );
};

export default Gallery;