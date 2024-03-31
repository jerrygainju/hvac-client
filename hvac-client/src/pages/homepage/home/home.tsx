import Navigation from '../navigation/navigation';
import '../style.css';
import { Experience } from './components/Experience';
import { HomeCard } from './components/HomeCard';
import { Carousel } from './components/Carousel';
import NewFooter from '../footer/Footer';

const Home = () => {
    return (
        <div className='absolute left-0'>
            <Navigation />
            <div className='lg:w-[1450px] h-[780px] pt-2 m-auto relative'>
                <Carousel />
                <HomeCard />
                <Experience />
                <NewFooter/>
            </div>
        </div>
    )
}

export default Home;
