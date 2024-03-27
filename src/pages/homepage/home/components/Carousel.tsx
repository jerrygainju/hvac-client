import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { slides } from '../HomeData';

export const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return(
        <>
         {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`w-full h-[450px] rounded-2xl shadow-2xl bg-center bg-cover duration-500 absolute ${currentIndex === index ? 'opacity-100' : 'opacity-0'} `}
                        style={{ backgroundImage: `url(${slide.url})` }}
                    >
                        <div className={`text-gray-600 text-4xl font-mono flex items-center justify-center pt-52 ${currentIndex === index ? 'slide-from-top' : ''}`}>
                            {slide.description}
                        </div>
                    </div>
                ))}
                <div className='relative' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className={`group-hover:block absolute top-[45%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ${!isHovered && 'hidden'}`}>
                        <BsChevronCompactLeft onClick={prevSlide} size={30} />
                    </div>
                    <div className={`group-hover:block absolute top-[45%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ${!isHovered && 'hidden'}`}>
                        <BsChevronCompactRight onClick={nextSlide} size={30} />
                    </div>
                    <div className='flex top-4 justify-center pt-[470px]'>
                        {slides.map((_slide, slideIndex) => (
                            <div
                                key={slideIndex}
                                onClick={() => setCurrentIndex(slideIndex)}
                                className='text-2xl cursor-pointer'
                            >
                                <div
                                    style={{ width: '40px', height: '3px', backgroundColor: currentIndex === slideIndex ? 'black' : 'gray', marginRight: slideIndex !== slides.length - 1 ? '20px' : '0' }}
                                    className='line'
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
        </>
    )
}