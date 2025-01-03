import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import backgroundImage from '../assets/img/image_fond.png';

const InfoBlock = ({ title, shortText, fullText }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className="info-block">
            <h2>{title}</h2>
            <div className="info-content">
                <p>{shortText}</p>
                <button
                    className="read-more"
                    onClick={() => setIsPopupOpen(true)}
                >
                    Lire la suite...
                </button>
            </div>

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-header">
                            <h3>{title}</h3>
                        </div>
                        <div className="popup-body">
                            {fullText.map((text, index) => (
                                <p key={index}>{text}</p>
                            ))}
                        </div>
                        <button className="close-button"
                            onClick={() => setIsPopupOpen(false)}>
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Info = () => {
    const infoData = [
        {
            title: "Les règles du salon",
            shortText: "- Merci de respecter l'horaire du Rendez-vous c'est important",
            fullText: [
                "- Merci de respecter l'horaire du Rendez-vous c'est important",
                "- Pas d'accompagnant sauf cas exceptionnel",
                "- Pas d'animaux de compagnie",
                "- Espace non adapté aux enfants",
                "- Merci de prendre une douche avant le rendez-vous (...J'en ferai autant)",
                "- Ne pas venir sous l'influence d'alcool ou de drogues",
                "- Les arrhes ne seront pas remboursés si absence sans raison valable -- ou si rendez-vous non annulé 48h avant"
            ]
        },
        {
            title: "Les soins",
            shortText: "Je fais 60 % du travail, 40 % vous appartiennent.",
            fullText: [
                "Je fais 60 % du travail, 40 % vous appartiennent.",
                "",
                "Avant :",
                "- Hydrater la zone avec crème pendant 2 ou 3 jours avant",
                "- Éviter le sport intense, fortes ivresses 2 jours avant",
                "- Hydratez vous en buvant beaucoup d'eau dès la veille",
                "- Le jour J ne venez pas l'estomac vide",
                "- Prévoyez un encas si grosse séance",
                "- Prévoyez éventuellement un plaid",
                "",
                "Après :",
                "- Gardez le cellophane 1h minimum à 3h maximum, ne PLUS en remettre ensuite",
                "- Le tatoo peut dégorger (encre, sang, lymphe) vous pouvez dès à présent le nettoyer avec du savon doux (PH neutre) et eau tiède.",
                "- Savon OK : PH neutre, glycérine, toilette intime, Alep",
                "- Savon PAS OK: gel douche style Axe, Ushuaïa, etc...",
                "- Le séchage se fait avec un tissu propre ou jetable style sopalin, en tappotant et sans frotter.",
                "- L’hydratation se fait avec des mains propres sur une peau correctement séchée.",
                "- Pas de bain pendant 3 semaines (rivières, Mer, SPA, sauna, bain à la maison, Piscine)",
                "- Pas de soleil sur le tatoo pendant 1 mois. Ensuite si exposition la première année : écran Total. C’est valable à vie si vous souhaitez conserver l’éclat du tatouage.",
                "- L’inflammation (rougeur) doit avoir disparu au bout de 4 jours.",
                "- A J+4 – J+7 le tatouage pêle, c’est normal, ne surtout pas se gratter ou enlever les croutes, cela nuirrait fortement à la qualité du tatouage.",
                "- En règle générale les soins se font pendant 14 jours. Hydratation 2 à 3 fois par jour en faisant pénétrer la crème et en laissant une fine pellicule.",
                "- Le tatouage ne doit jamais être sec pendant cette période.",
                "- Pommade OK : Bepanthen, Homeoplasmine, Dexeryl, Beurre de karité (propre), vaseline pour dépanner",
                "- Pommade/crème PAS OK : Nivéa, crème accélératrice de cicatrisation (style cicatryl), crèmes hydratantes parfumées, huile de palme et de vidange.",
                "- Si besoin vous pouvez couvrir votre tatouage d’un élément respirant (tissu coton, sopalin…)",
                "- Si exposition à la poussière ou au soleil par exemple.",
                "- Personne ne doit toucher votre tatouage.",
                "",
                "Pour toute question, vous pouvez me contacter",
                "Vous avez un beau tatouage, prenez en soin !",
            ]
        },
        {
            title: "La prise de rendez-vous",
            shortText: "- Si vous souhaitez vous renseigner pour un petit projet, je vous accueil sans Rendez-vous les mardi, jeudi et vendredi de 10h à 12h et de 13h30 à 16h30 (Hors vacances scolaires Zone A)",
            fullText: [
                "- Si vous souhaitez vous renseigner pour un petit projet, je vous accueil sans Rendez-vous les mardi, jeudi et vendredi de 10h à 12h et de 13h30 à 16h30 (Hors vacances scolaires Zone A)",
                "- Si vous souhaitez que nous nous rencontrions afin d'élaborer votre projet, merci de prendre rendez-vous (Je peux me rendre disponible les mercredi, week-end, jours fériés et vacances)",
                "- Si vous avez des difficultés à vous déplacer ou que vous êtes loin, vous pouvez remplir le formulaire de contact. Je pourrai alors répondre à vos demandes et éventuellement établir un devis. À partir de là un entretien téléphonique n'est pas exclu.",
                "- Pour les prises de rendez-vous et dessins complexes sans rencontre physique préalable je demanderai des arrhes (montant en fonction de la taille du projet -- 20€ à 100€ ou 25%) reversables via PayPal"
            ]
        },
        {
            title: "Les tarifs",
            shortText: "Les tarifs sont établis sur devis, en fonction de la taille, de la complexité et du temps nécessaire à la réalisation du tatouage.",
            fullText: [
                "Les tarifs sont établis sur devis, en fonction de la taille, de la complexité et du temps nécessaire à la réalisation du tatouage.",
                "Un acompte sera demandé pour toute réservation.",
                "Le montant minimum pour un tatouage est de 60€.",
                "Les arrhes demandées varient entre 20€ et 100€ selon la taille du projet, ou représentent 25% du montant total.",
                "Les arrhes sont reversables via PayPal."
            ]
        }
    ];

    return (
        <div className="page-container">
            <div className="info-page">
                <div
                    className="background-image"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                ></div>
                <div className="content-wrapper">
                    {infoData.map((info, index) => (
                        <InfoBlock key={index} {...info} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Info;