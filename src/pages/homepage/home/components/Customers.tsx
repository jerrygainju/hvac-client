import { Image } from "antd";
import Company from "../../../../public/company.jpg";
import { useInView } from "react-intersection-observer";

const Customer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="flex flex-col-reverse lg:flex-row xl:px-44 px-0 justify-center pt-12 gap-4 ">
      <div
        ref={ref}
        className={`lg:flex lg:flex-col border rounded-xl shadow-2xl bg-gray-200 lg:w-1/2 ${
          inView ? "slide-from-left" : ""
        }`}
      >
        <div className="font-mono text-2xl pt-8 justify-center text-center text-yellow-500 slide-from-top ">
          SG Design Mechanical Company
        </div>
        <div className="font-mono justify-center items-center font-semibold lg:text-4xl text-lg pt-8 text-center text-gray-600">
          Best Provider for Mechanical Services
        </div>
        <div className="font-mono lg:text-xl text-md lg:px-14 px-4 pt-6 text-yellow-500 text-justify slide-from-right">
          SG Design Group is recognized as a leading provider of top-quality
          mechanical services, offering expert solutions tailored to meet your
          needs with exceptional reliability and performance.
        </div>
        <div className="font-mono justify-center items-center lg:text-lg text-md lg:px-14 px-4 pt-6 pb-5 text-justify text-gray-600 slide-from-rignt">
          SG Design Group is your trusted partner for top-notch mechanical
          services. With a commitment to excellence and a focus on innovation,
          we deliver reliable and efficient solutions tailored to meet your
          specific needs. Our team of skilled professionals are dedicated to
          ensuring the highest standards of quality and customer satisfaction,
          making us the best choice for all your mechanical service
          requirements.
        </div>
      </div>
      <div
        ref={ref}
        className={`${
          inView ? "slide-from-right" : ""
        } lg:w-1/2 lg:self-center`}
      >
        <Image
          src={Company}
          className="rounded-2xl shadow-2xl w-full lg:max-h-350px lg:w-auto"
        />
      </div>
    </div>
  );
};

export default Customer;
