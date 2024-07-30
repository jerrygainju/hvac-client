import { Image } from 'antd';
import { experience } from '../homeData';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import '../../style.css';

export const Experience = () => {
    const navigate = useNavigate();
    const [ref, inView] = useInView({ 
        triggerOnce: true, 
        threshold: 0.5, 
    });
    const learnMore = () => {
        navigate('/');
    };

    return (
        <div className='w-full pt-12 flex justify-center'>
            {experience.map((item, index) => (
                <div key={index} className='lg:flex flex-row border rounded-xl shadow-2xl lg:w-[1300px] w-full bg-gray-200'>
                    <div className='p-6 zoom-animation flex justify-center items-center'>
                        <Image src={item.image} style={{ minHeight: '300px',maxHeight:"500px",maxWidth:"500px", minWidth:'300px'}} className='rounded-2xl shadow-2xl'  />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div ref={ref} className={`flex font-mono text-2xl justify-center text-yellow-500 pt-12 ${inView ? 'slide-from-top' : ''}`} >
                            {item.title}
                        </div>
                        <div ref={ref}  className={`font-mono lg:text-4xl font-semibold justify-center items-center text-center text-gray-600 ${inView ? 'slide-from-left' : ''}`}>
                            {item.subTitle}
                        </div>
                        <div className={`font-mono justify-center items-center pt-6 lg:px-14 px-4 text-justify lg:text-lg text-gray-600 ${inView ? 'slide-from-right' : ''}`}>
                            {item.description}
                        </div>
                        <div className='text-center pb-4'>
                            <button onClick={learnMore} className={`font-mono my-4 px-4 py-2 zoom-animation bg-yellow-500 text-white rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue ${inView ? 'slide-from-bottom' : ''}`}>Learn More</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
