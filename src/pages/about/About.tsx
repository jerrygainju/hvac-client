import { cards, progress } from "../homepage/home/homeData";
import Navigation from "../homepage/navigation/navigation";
import background from "../../public/cons2.jpg";
import newBg from "../../public/cons.jpg";
import sideImg from "../../public/const.jpg";
import ModalVideo from "./components/ModalVideo";
import NewFooter from "../homepage/footer/Footer";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/contact-us");
  };

  return (
    <div className=" w-screen">
      <Navigation />
      <div className="flex pt-2 justify-center">
        <div
          className="w-screen h-[350px] bg-center bg-cover
          relative overflow-hidden block z-10 
          before:absolute
          before:inset-0
          before:block
          before:bg-black
          before:opacity-60"
          style={{ backgroundImage: `url(${background})`, opacity: "0.9" }}
        >
          <h1 className="font-mono md:text-4xl text-3xl lg:text-5xl font-semibold text-center relative z-10 text-white pt-40 ">
            About O
            <span className="border-b-4 border-yellow-500 pb-1">ur C</span>
            ompany
          </h1>
        </div>
      </div>
      {/**First component */}
      <div className="pt-16 md:pt-20">
        <div className="md:flex justify-center  xl:gap-5 lg:p-7 2xl:w-7/12 lg:w-full md:w-full mx-auto border bg-gray-200 shadow-xl rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 lg:hover:scale-110 duration-300">
          <div className="p-5 md:p-0 md:w-1/2 md:pb-5">
            <h2 className="text-yellow-500 lg:text-2xl font-mono pb-8 my-2 slide-from-top">
              Welcome to HVAC Design
            </h2>
            <h1 className="font-mono text-4xl text-gray-600 pb-9">
              We understand the importance of{" "}
              <span className="font-semibold">
                innovation and professionalism
              </span>
            </h1>
            <div className="md:w-11/12 w-full">
              <p className="font-mono text-xl pb-8 text-justify text-yellow-500">
                At SG Design, we believe success comes from blending innovation
                with professionalism. Our team pushes HVAC technology
                boundaries, always seeking efficient ways to keep your
                environments comfortable and energy-efficient.
              </p>
              <p className="font-mono text-gray-600 lg:text-lg pb-6 text-justify">
                Coupled with our unwavering commitment to professional service,
                we ensure that every project is executed with the highest
                standards of quality and reliability. Whether it's through
                cutting-edge products or exceptional customer care, we strive to
                set new benchmarks in the HVAC industry, delivering solutions
                that are both forward-thinking and meticulously crafted.
              </p>
            </div>
            <div className="border-2 border-yellow-500 rounded-full md:w-2/5 w-1/2">
              <button className="flex items-center font-medium mx-auto md:p-3 p-2 text-yellow-500">
                Learn More
              </button>
            </div>
          </div>
          <div className="pt-6 md:pt-0 md:w-[40%] md:-translate-y-0">
            <img
              src={sideImg}
              className="object-contain mx-auto h-full w-[500px] "
              alt="img"
            />
          </div>
        </div>
      </div>
      {/**----------video-playback-----progress-bar----*/}
      <div className="my-10">
        <div className="flex lg:justify-center md:justify-evenly md:gap-4 lg:gap-7 py-16 border bg-gray-200 shadow-2xl">
          <div className="hidden md:block ">
            <ModalVideo />
          </div>
          <div className="md:w-2/5 p-4 md:p-0">
            <div className="flex flex-col gap-8">
              <h2 className="font-mono uppercase lg:text-xl font-medium text-yellow-500 text-justify">
                Our Skill and Expertise
              </h2>
              <h1 className="lg:text-4xl font-mono justify-center text-gray-600 items-center slide-from-left">
                <span className="font-semibold">Expertise</span>, discipline and
                precision
              </h1>
              <p className="font-mono lg:text-lg text-gray-600">
                Expertise, discipline and precision are the cornerstones of our
                approach. Our skilled team brings deep knowledge and unwavering
                commitment, ensuring every project is executed with meticulous
                attention to detail and exceptional accuracy.
              </p>
            </div>
            <div className="container pt-7 ">
              {progress.map((item: any) => (
                <div className="pb-6">
                  <div className="flex justify-between pb-2">
                    <span className="font-mono lg:text-lg font-semibold text-gray-600 dark:text-white">
                      {item.title}
                    </span>
                    <span
                      className="font-mono text-md font-semibold text-yellow-500 dark:text-white"
                      style={{ width: `calc(100% - ${item.completion})` }}
                    >
                      {item.completion}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full"
                      style={{ width: item.completion }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/**card-components */}
      <div className="flex flex-col justify-center 2xl:w-4/5 mx-auto gap-16 lg:p-9 p-6 bg-gray-200 border shadow-2xl rounded-lg">
        <div className="md:flex xl:gap-0 md:gap-20 lg:gap-0">
          <div className="flex flex-col justify-center gap-5 ">
            <h2 className="font-mono uppercase text-gray-600 text-xl text-yellow-500 font-semibold">
              Our Company
            </h2>
            <h2 className="font-mono lg:text-4xl text-gray-600">
              We stay current with the latest{" "}
              <span className="font-semibold">applications</span> and{" "}
              <span className="font-semibold">building technologies</span>
            </h2>
          </div>
          <div className="lg:flex justify-end lg:text-lg text-gray-600 text-justify md:pt-6 pt-8 xl:mr-10 mr-0">
            <p className="font-mono lg:w-4/5 ">
              We are dedicated to crafting exceptional homes and structures that
              perfectly align with our clients' vision, budget, and timeline
              without compromising quality or workmanship. Our expertise extends
              to incorporating green energy solutions and sustainable practices
              into every project. By staying at the forefront of eco-friendly
              building technologies and materials, we empower our clients to
              create not just house, but sustainable living spaces that reflect
              their values and aspirations.
            </p>
          </div>
        </div>
        <div className="lg:flex justify-center md:gap-10 lg:gap-2 xl:gap-6">
          {cards.map((card) => (
            <div className="pb-6 text-gray-600">
              <div
                className="flex justify-center p-5
                lg:p-3 md:gap-5 lg:gap-0 xl:gap-4 border
                border-blue-300 shadow-lg rounded-lg 
                transition ease-in-out delay-150 
                hover:-translate-y-1 xl:hover:scale-110
                 hover:scale-100 duration-300"
              >
                <div className="p-2 lg:p-3 -my-1 object-contain h-28 w-44 md:h-10 md:w-20 lg:w-32">
                  <img src={card.icon} alt="card-icon" />
                </div>
                <div className="flex flex-col justify-center gap-4 font-mono text-gray-600">
                  <h1 className="md:text-3xl lg:text-2xl xl:text-4xl text-lg font-semibold">
                    {card.title}
                  </h1>
                  <p className="text-justify lg:text-lg w-11/12 slide-from-left">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/**get a quote */}
      <div className="translate-y-12">
        <div
          className="w-screen h-[500px] bg-center bg-cover 
          relative overflow-hidden block z-10 
          before:absolute
          before:inset-0
          before:block
          before:bg-black
          before:opacity-75
  "
          style={{ backgroundImage: `url(${newBg})`, opacity: "0.9" }}
        >
          <div className="flex flex-col justify-center gap-8 text-center relative text-white sm:py-20 md:py-40 lg:py-32 py-20">
            <h1 className="font-mono lg:text-4xl text-2xl">Call us and get it done</h1>
            <p className="font-mono lg:text-2xl w-4/5 mx-auto">
              "Ready to elevate your comfort with unmatched expertise and
              precision? Contact us today and let's create the perfect HVAC
              solution for you!"
            </p>
            <button
              onClick={() => onClick()}
              className="p-3 lg:text-lg text-white w-36 mx-auto bg-yellow-500 hover:bg-gray-300 hover:text-black rounded-lg"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
      <NewFooter />
    </div>
  );
};

export default About;
