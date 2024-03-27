import Navigation from '../navigation/Navigation';
import '../style.css';
import { Experience } from './components/Experience';
import { HomeCard } from './components/HomeCard';
import { Carousel } from './components/Carousel';
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";
import Customer from './components/Customers';


const Home = () => {
    return (
        <div>
            <Navigation />
            <div className=' w-[1450px]  h-[780px] pt-2 m-auto relative'>
                <Carousel />
                <HomeCard />
                <Experience />
                <Customer />
                <ChatBot />
            </div>
        </div>
    )
}

export default Home;
