
import { Image } from 'antd';
import { card } from '../homeData';
import { useInView } from 'react-intersection-observer';

export const HomeCard = () => {
    const [ref, inView] = useInView({ 
        triggerOnce: true, 
        threshold: 0.5, 
    });
    return(
        <div className='flex flex-col lg:flex-row md:pt-12 gap-8'>
        {card.map((item, index) => (
            <div key={index} className='border rounded-xl bg-gray-200 w-auto shadow-2xl py-4 px-8 zoom-animation md:w-full'>
                <div className='flex flex-row items-center gap-4'>
                    <div className='pt-16'>
                        <Image src={item.image} width={120} height={120} className='rounded-xl shadow-2xl ' />
                    </div>
                    <div className='flex flex-col'>
                        <div ref={ref} className={`text-3xl text-center font-mono text-gray-700 ${inView ? 'slide-from-top' : ''}`}>
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
    )
}