import Navigation from "../navigation/navigation";
import "../style.css";
import { Experience } from "./components/Experience";
import { HomeCard } from "./components/HomeCard";
import { Carousel } from "./components/Carousel";
import NewFooter from "./footer/NewFooter";

const Home = () => {
  return (
    <div>
      <Navigation />
      <div className = "w-full max-w-[1450px]  h-[780px] pt-2 m-auto relative">
        <Carousel />
        <HomeCard />
        <Experience />
        <NewFooter />
      </div>
    </div>
  );
};

export default Home;
