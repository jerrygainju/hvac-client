import React, { useState, useEffect } from 'react';
import Navigation from "./navigation";
import Contact from '../../public/contact.jpg';
import SGLogo from '../../public/log.jpeg';
import SGLog from '../../public/cons2.jpg';

const Home = () => {
    const images = [
        Contact,
        SGLogo,
        SGLog,
    ];

    const duplicatedImages = [...images, ...images];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex === duplicatedImages.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [duplicatedImages.length]);

    const carouselStyle: React.CSSProperties = {
        overflow: 'hidden',
        width: '100%',
        justifyItems:'center',
        maxWidth: '1400px',
        height: '400px',
        position: 'relative',
    };

    const innerContainerStyle = {
        display: 'flex',
        transition: 'transform 0.5s ease-in-out',
        transform: `translateX(-${(currentIndex % images.length) * 100}%)`,
    };

    const imgStyle: React.CSSProperties = {
        flex: '0 0 auto',
        flexDirection:'row',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    return (
        <div className="pt-52">
            <Navigation />
            <div className="pt-6 font-serif text-4xl text-center">
                <div style={carouselStyle}>
                    <div style={innerContainerStyle}>
                        {duplicatedImages.map((image, index) => (
                            <img key={index} src={image} className='pl-20' alt={`Image ${index + 1}`} style={imgStyle} />
                        ))}
                    </div>
                </div>
                <div className='pt-6 font-serif text-3xl'>
                            Welcome to HVAC Calculation
                </div>
            </div>
        </div>
    );
};

export default Home;
