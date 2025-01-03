import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Info from './pages/Info';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Nav from './components/Nav'

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Nav />
                <div className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/info" element={<Info />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;