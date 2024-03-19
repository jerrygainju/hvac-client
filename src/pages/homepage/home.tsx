import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Contact from '../../public/contact.jpg';
import SGLogo from '../../public/log.jpeg';
import Navigation from './navigation';
import { Image } from 'antd';
import User from '../../public/user.jpg';
import Construct from '../../public/const.jpg';
import Call from '../../public/call.jpg';
import './Home.css'; // Import CSS file for custom styling

const Home = () => {
    const slides = [
        {
            url: Contact,
            description: "HVAC calculations ensure comfort and efficiency.",
        },
        {
            url: SGLogo,
            description: "Engineers design systems for optimal performance.",
        },
        {
            url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
            description: "Factors considered: size, insulation, occupancy.",
        },
        {
            url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
            description: "Analyze heat, airflow, equipment for efficiency.",
        },
        {
            url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
            description: "Tailor solutions to specific environmental needs.",
        },
    ];

    const card = [
        {
            image: User,
            title: 'Expert Worker',
            description: 'Experienced professionals dedicated to delivering high-quality results efficiently, with a focus on precision, innovation, and client satisfaction'
        },
        {
            image: Construct,
            title: 'Quality Work',
            description: 'Commitment to excellence, ensuring top-notch craftsmanship, reliability, and attention to detail in every project undertaken.'
        },
        {
            image: Call,
            title: '24/7 Support',
            description: 'Round-the-clock assistance, responsive communication, immediate resolutions, ensuring uninterrupted support for all your needs'
        },
    ]
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const goToSlide = (slideIndex: any) => {
        setCurrentIndex(slideIndex);
    };


    return (
        <div className='pt-[502px]'>
            <Navigation />
            <div className='max-w-[1460px] h-[780px] w-full pt-2 m-auto relative group'>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`w-full h-[450px] rounded-2xl shadow-2xl bg-center bg-cover duration-500 absolute ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${slide.url})` }}
                    >
                        <div className={`text-gray-300 text-5xl font-mono flex items-center justify-center pt-52 ${currentIndex === index ? 'slide-from-left' : ''}`}>
                            {slide.description}
                        </div>
                        <div className='text-white text-4xl font-mono flex items-center justify-center pt-16'>
                            Welcome To HVAC Calculation
                        </div>
                    </div>
                ))}
                <div className='hidden group-hover:block absolute top-[25%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
                <div className='hidden group-hover:block absolute top-[25%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
                <div className='flex top-4 justify-center pt-[470px]'>
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className='text-2xl cursor-pointer'
                        >
                            <div style={{ width: '40px', height: '3px', backgroundColor: 'gray', marginRight: slideIndex !== slides.length - 1 ? '20px' : '0' }} className='line'>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-row pt-12 gap-10 pb-10'>
                    {card.map((item, index) => (
                        <div key={index} className='border rounded-lg bg-gray-200 w-auto shadow-2xl py-4 px-8 card'>
                            <div className='flex flex-row gap-4'>
                                <div className='pt-12'>
                                    <Image src={item.image} width={120} height={120} className='rounded-xl shadow-2xl' />
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
            </div>
        </div>
    )
}

export default Home;
