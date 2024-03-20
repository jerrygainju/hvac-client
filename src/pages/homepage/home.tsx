import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Navigation from './navigation';
import { Image } from 'antd';
import { card, slides, experience  } from './homeData';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
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

    const navigate = useNavigate()
    const learnMore = () => {
        navigate('/')
    }


    return (
        <div>
            <Navigation />
            <div className=' w-[1450px]  h-[780px] pt-2 m-auto relative'>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`w-full h-[450px] rounded-2xl shadow-2xl bg-center bg-cover duration-500 absolute ${currentIndex === index ? 'opacity-100' : 'opacity-0'} `}
                        style={{ backgroundImage: `url(${slide.url})` }}
                    >
                        <div className={`text-gray-300 text-4xl font-mono flex items-center justify-center pt-52 ${currentIndex === index ? 'slide-from-top' : ''}`}>
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
                <div className='flex flex-col md:flex-row md:pt-12 gap-8'>
                    {card.map((item, index) => (
                        <div key={index} className='border rounded-xl bg-gray-200 w-auto shadow-2xl py-4 px-8 zoom-animation md:w-1/3'>
                            <div className='flex flex-row gap-4'>
                                <div className='pt-16'>
                                    <Image src={item.image} width={120} height={120} className='rounded-xl shadow-2xl ' />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-3xl text-center font-mono text-gray-700'>
                                        <b>{item.title}</b>
                                    </div>
                                    <div className='text-xl text-center pt-4 text-gray-600'>
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='pt-12 flex justify-center'>
                    {experience.map((item, index) => (
                    <div key={index} className='flex flex-row border rounded-xl shadow-2xl w-[1300px] bg-gray-200'>
                        <div className='p-6 zoom-animation'>
                            <Image src={item.image} width={500} height={500} className='rounded-2xl  shadow-2xl' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex font-mono text-2xl justify-center text-yellow-500 pt-12'>
                                {item.title}
                            </div>
                            <div className='font-mono text-4xl font-semibold justify-center items-center text-center text-gray-600'>
                                {item.subTitle}
                            </div>
                            <div className='font-mono justify-center items-center pt-6 px-14 text-lg text-gray-600'>
                              {item.description}
                            </div>
                            <div className='text-center'>
                                <button onClick= {learnMore} className="px-4 py-2 zoom-animation bg-yellow-500 text-white rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue">Learn More</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;
