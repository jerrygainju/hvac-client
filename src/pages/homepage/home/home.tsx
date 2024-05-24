import Navigation from '../navigation/navigation';
import '../style.css';
import { Experience } from './components/Experience';
import { HomeCard } from './components/HomeCard';
import { Carousel } from './components/Carousel';
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";
import Customer from './components/Customers';
import NewFooter from '../footer/Footer';


const Home = () => {
    return (
        <div className='w-screen'>
            <Navigation />
            <Carousel />
            <HomeCard />
            <Experience />
            <Customer />
            <NewFooter />
            <ChatBot />
        </div>
    )
}

export default Home;
