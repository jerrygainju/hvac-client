import { cards, progress } from "../../homepage/home/homeData";
import Navigation from "../../homepage/navigation/navigation";
import background from "../../../public/cons2.jpg";
import newBg from "../../../public/cons.jpg";
import sideImg from "../../../public/const.jpg";
import ModalVideo from "./ModalVideo";
import NewFooter from "../../homepage/footer/Footer";

const About = () => {
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
          <h1 className="md:text-4xl text-3xl lg:text-5xl font-medium text-center relative z-10 text-white pt-40 ">
            About O
            <span className="border-b-4 border-yellow-500 pb-1">ur C</span>
            ompany
          </h1>
        </div>
      </div>
      {/**First component */}
      <div className="pt-16 md:pt-20">
        <div className="md:flex justify-center  xl:gap-5 lg:p-7 2xl:w-7/12 lg:w-full md:w-full mx-auto border bg-gray-100 shadow-xl rounded-lg">
          <div className="p-5 md:p-0 md:w-1/2">
            <h2 className="text-gray-400 lg:text-xl font-medium pb-8">
              Welcome to HVAC Design
            </h2>
            <h1 className="lg:text-5xl text-4xl pb-9">
              We understand the importance of{" "}
              <span className="font-medium">
                innovation and professionalism
              </span>
            </h1>
            <div className="">
              <p className="text-xl pb-8">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Distinctio corporis non, incidunt aliquam cupiditate est error
                quibusdam quam, itaque, quasi ratione adipisci? Vero possimus
              </p>
              <p className="text-gray-500 lg:text-lg pb-6">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
                totam rerum obcaecati culpa doloremque voluptatum, laudantium
                illo delectus, sed corporis voluptates molestiae amet accusamus
                eius neque illum asperiores unde odit.
              </p>
            </div>
            <div className="border-2 border-yellow-500 rounded-full md:w-2/5 w-1/2 ">
              <button className="flex items-center font-medium mx-auto md:p-3 p-2 text-yellow-500">
                Learn More
              </button>
            </div>
          </div>
          <div className="pt-6 md:pt-0 md:w-[40%] md:-translate-y-24 2xl:translate-y-2">
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
      <div className="flex lg:justify-center md:justify-evenly md:gap-4 lg:gap-7 py-16 border shadow-2xl">
        <div className="hidden md:block ">
          <ModalVideo />
        </div>
        <div className="md:w-2/5 p-4 md:p-0">
          <div className="flex flex-col gap-8">
            <h2 className="uppercase lg:text-lg font-medium text-gray-500">
              Our Skill and Expertise
            </h2>
            <h1 className="text-5xl">
              <span className="font-medium">Expertise</span>, discipline and
              precision
            </h1>
            <p className="lg:text-xl text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex minima
              veniam officia quaerat quas. Eveniet nihil rerum iure error.
              Similique, reprehenderit necessitatibus sunt commodi nam hic
              temporibus ipsam? Praesentium, sint.
            </p>
          </div>
          <div className="container pt-7 ">
            {progress.map((item: any) => (
              <div className="pb-6">
                <div className="flex justify-between pb-2">
                  <span className="lg:text-lg font-medium text-black dark:text-white">
                    {item.title}
                  </span>
                  <span
                    className="text-md font-medium text-yellow-500 dark:text-white"
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
      <div className="flex flex-col justify-center 2xl:w-3/5 mx-auto gap-16 lg:p-9 p-6 bg-gray-100 border shadow-2xl rounded-lg">
        <div className="md:flex justify-between xl:gap-0 md:gap-20 lg:gap-0">
          <div className="flex flex-col justify-center gap-5 ">
            <h2 className="uppercase text-gray-600 text-lg font-medium">Our Company</h2>
            <h2 className="text-5xl font-light text-justified">
              We stay current with the latest{" "}
              <span className="font-medium">applications</span> and{" "}
              <span className="font-medium">building technologies</span>
            </h2>
          </div>
          <div className="lg:flex justify-end text-xl text-gray-700 md:pt-6 pt-8">
            <p className="lg:text-2xl lg:w-4/5 ">
              We build the finest homes and structures within our client's
              budgets and time frame without sacrificing quality and
              workmanship. We work with you on all of your green energy ideas.
              We keep you up to date on the latest greenest building practices
              and materials.
            </p>
          </div>
        </div>
        <div className="lg:flex justify-center md:gap-10 lg:gap-2 xl:gap-6">
          {cards.map((card) => (
            <div className="pb-6">
              <div className="flex justify-center p-5 md:gap-5 lg:gap-0 border rounded-lg">
              <div className="p-2 lg:p-3 -my-1 object-contain h-28 w-44 md:h-10 md:w-20 lg:w-32">
                <img
                  src={card.icon}
                  alt="card-icon"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 ">
                <h1 className="md:text-3xl text-xl font-medium ">{card.title}</h1>
                <p className="text-gray-600 text-justified md:text-xl w-11/12">
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
          <div className="flex flex-col justify-center gap-8 text-center relative text-white pt-40">
            <h1 className="lg:text-5xl text-2xl">Call us and get it done</h1>
            <p className="lg:text-2xl w-4/5 mx-auto">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta,
              earum saepe sapiente rerum et modi. Nobis ut deserunt tempore
              sapiente? Facilis, id voluptatum quod ad fuga atque aspernatur.
              Nam, nostrum.
            </p>
            <button className="p-4 lg:text-lg text-black w-40 mx-auto bg-yellow-500 hover:bg-gray-300 hover:text-black rounded-full">Get a Quote</button>
          </div>
        </div>
      </div>
     <NewFooter />
    </div>
  );
};

export default About;
