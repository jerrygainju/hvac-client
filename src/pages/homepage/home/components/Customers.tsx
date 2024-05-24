import { Image } from "antd";
import Company from '../../../../public/company.jpg';
import { useInView } from 'react-intersection-observer';

const Customer = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <div className="flex flex-col-reverse lg:flex-row xl:px-44 px-0 justify-center pt-12 gap-4 ">
            <div ref={ref} className={`lg:flex lg:flex-col border rounded-xl shadow-2xl bg-gray-200 lg:w-1/2 ${inView ? 'slide-from-left' : ''}`}>
                <div className="font-mono text-xl pt-8 text-center text-yellow-500 ">
                    SG Design Mechanical Company
                </div>
                <div className="font-mono lg:text-2xl text-lg pt-8 text-center text-gray-600">
                    Best Provider for Mechanical Services
                </div>
                <div className="font-mono lg:text-xl text-md lg:px-12 px-5 pt-6 text-yellow-500 lg:text-center text-justify">
                    Best Provider for Mechanical ServicesFar far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                </div>
                <div className="font-mono lg:text-xl text-md lg:px-14 px-5 pt-6 pb-5 lg:text-center text-justify text-gray-600">
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean
                </div>
            </div>
            <div ref={ref} className={`${inView ? 'slide-from-right' : ''} lg:w-1/2 lg:self-center`}>
                <Image src={Company} className='rounded-2xl shadow-2xl w-full lg:max-h-350px lg:w-auto' />
            </div>
        </div>
    )
}

export default Customer;
