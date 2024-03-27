import { Image } from "antd"
import Company from '../../../../public/company.jpg';
import { useInView } from 'react-intersection-observer';
import '../../style.css'


const Customer = () => {
    const [ref, inView] = useInView({ 
        triggerOnce: true, 
        threshold: 0.5, 
    });
    return (
        <>
            <div className="flex flex-row pt-12 gap-2">
                <div ref={ref} className={`flex flex-col border rounded-xl shadow-2xl bg-gray-200 ${inView ? 'slide-from-left' : ''}`}>
                    <div className="font-mono text-xl p-8 text-center text-yellow-500 ">
                        SG Design Mechanical Company
                    </div>
                    <div className="font-mono text-2xl text-center text-gray-600">
                        Best Provider for Mechanical Services
                    </div>
                    <div className="font-mono text-xl px-12 pt-6 text-yellow-500 text-center">
                        Best Provider for Mechanical ServicesFar far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                    </div>
                    <div className="font-mono text-xl px-14 pt-6 text-center text-gray-600">
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean
                    </div>
                </div>
                <div ref={ref} className={`${inView ? 'slide-from-right' : ''}`}>
                <Image src={Company} width={700} height={500} className='rounded-2xl shadow-2xl'  />
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default Customer