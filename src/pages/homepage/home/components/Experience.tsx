import { Image } from 'antd';
import { experience } from '../HomeData';
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
        <div className='pt-12 flex justify-center'>
            {experience.map((item, index) => (
                <div key={index} className='flex flex-row border rounded-xl shadow-2xl w-[1300px] bg-gray-200'>
                    <div className='p-6 zoom-animation'>
                        <Image src={item.image} width={500} height={500} className='rounded-2xl shadow-2xl'  />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div ref={ref} className={`flex font-mono text-2xl justify-center text-yellow-500 pt-12 ${inView ? 'slide-from-top' : ''}`} >
                            {item.title}
                        </div>
                        <div ref={ref}  className={`font-mono text-4xl font-semibold justify-center items-center text-center text-gray-600 ${inView ? 'slide-from-left' : ''}`}>
                            {item.subTitle}
                        </div>
                        <div className={`font-mono justify-center items-center pt-6 px-14 text-lg text-gray-600 ${inView ? 'slide-from-right' : ''}`}>
                            {item.description}
                        </div>
                        <div className='text-center'>
                            <button onClick={learnMore} className={`px-4 py-2 zoom-animation bg-yellow-500 text-white rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue ${inView ? 'slide-from-bottom' : ''}`}>Learn More</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
