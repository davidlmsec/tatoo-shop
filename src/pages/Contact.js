import React, { useState } from 'react';
import Nav from '../components/Nav'; // Assurez-vous que le chemin d'importation est correct
import Footer from '../components/Footer'; // Assurez-vous que le chemin d'importation est correct
import backgroundImage from '../assets/img/image_fond.png';
import artistImage from '../assets/img/artist.png';

const Contact = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        age: '',
        mail: '',
        sujet: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Logique d'envoi du formulaire ici
    };

    return (
        <div className="page-container">
            <div className="contact-page">
                <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div className="content-wrapper">
                    <div className="artist-photo">
                        <img src={artistImage} alt="Artiste tatoueur" />
                    </div>
                    <div className="contact-form">
                        <h2>Contactez moi</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
                            <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
                            <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
                            <input type="email" name="mail" placeholder="Mail/Tel" onChange={handleChange} required />
                            <input type="text" name="sujet" placeholder="Objet" onChange={handleChange} required />
                            <textarea name="message" placeholder="Message" onChange={handleChange} required></textarea>
                            <button type="submit">Envoyer</button>
                        </form>
                    </div>
                    <div className="salon-info">
                        <div className="google-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.1755185334296!2d4.268456776536305!3d44.68030828442991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b4ed8e9cbf8a8d%3A0x4078821166b2c50!2s180%20Rue%20Grande%2C%2007380%20Meyras!5e0!3m2!1sfr!2sfr!4v1698225516010!5m2!1sfr!2sfr"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                        <div className="salon-details">
                            <h3>Au 180</h3>
                            <p>180 rue grande</p>
                            <p>07380 MEYRAS</p>
                            <p>Tel: +337.78.52.00.52</p>
                            <p>Mail: contact@au180-tatoo.fr</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;