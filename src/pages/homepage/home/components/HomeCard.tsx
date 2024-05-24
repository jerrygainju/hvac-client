import { Image } from 'antd';
import { card } from '../homeData';
import { useInView } from 'react-intersection-observer';

export const HomeCard = () => {
    const [ref, inView] = useInView({ 
        triggerOnce: true, 
        threshold: 0.5, 
    });
    return(
        <div className='flex justify-center pt-12 '>
            <div className='flex flex-col xl:w-[1440px] xl:flex-row gap-8'>
                {card.map((item, index) => (
                    <div key={index} className='border rounded-xl bg-gray-200 w-auto shadow-2xl py-4 px-8 zoom-animation'>
                        <div className='flex flex-row items-center gap-4'>
                            <div className='pt-16'>
                                <Image src={item.image} width={120} height={120} className='rounded-xl shadow-2xl ' />
                            </div>
                            <div className='flex flex-col'>
                                <div ref={ref} className={`text-3xl text-center start font-mono text-yellow-500 ${inView ? 'slide-from-top' : ''}`}>
                                    <b>{item.title}</b>
                                </div>
                                <div className='lg:text-xl lg:text-center text-justify pt-4 text-gray-600'>
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
