import { useState } from "react";
import Navigation from "../homepage/navigation/navigation";
import ContactImage from "../../public/contact.jpg";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import MapComponent from "./components/Map";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import '../homepage/style.css'
import NewFooter from "../homepage/footer/Footer";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const containerStyles = {
    backgroundImage: `url(${ContactImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "450px",
    display: "flex",
    alignItems: "center", 
    justifyContent: "center",
    borderRadius: '15px',
    border: '1px solid #ddd',
  };

  return (
    <div className="w-screen">
      <Navigation />
      <div className="pt-[8px]">
        <div className="flex justify-center">
        <div style={containerStyles} className="w-[1452px]"> 
          <div className="text-5xl font-serif pb-40 slide-from-top text-gray-600">
            Contact Us
          </div>
        </div>
        </div>
      </div>
      <div className="lg:flex flex-row lg:gap-1 gap-12 mt-12 justify-center">
        <div className="flex flex-col lg:mx-10 mx-auto lg:w-96 md:w-96 px-6 pt-2  bg-gray-200 border rounded-xl shadow-2xl text-gray-600 card">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-600 font-medium">Your Name</label>
              <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 w-full border bg-gray-50 rounded-md shadow-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600 font-medium">Your Email</label>
              <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border bg-gray-50 rounded-md shadow-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-600 font-medium">Your Message</label>
              <TextArea id="message" name="message" value={formData.message} onChange={handleChange} className="mt-1 p-2 w-full border bg-gray-50 rounded-md shadow-lg focus:outline-none focus:border-blue-500"></TextArea>
            </div>
            <div className="pb-2">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700">Submit</button>
            </div>
          </form>
        </div>
        <div className="lg:shadow-2xl overflow-hidden">
          <MapComponent />
        </div>
        <div className="flex flex-col lg:mx-10 mx-auto border rounded-xl px-12 p-10 shadow-2xl gap-10 bg-gray-200 text-gray-600 lg:w-96 md:w-96 card">
          <div className="flex flex-col font-semibold text-2xl border rounded-xl p-2 bg-gray-50 text-center shadow-xl ">
            <div>
              <EnvironmentOutlined /> Location
            </div>
            <div className="text-lg">
              Koteshwor, Kathmandu
            </div>
          </div>
          <div className="flex flex-col font-semibold text-2xl border rounded-xl p-2 bg-gray-50 text-center shadow-xl ">
            <div>
              <PhoneOutlined style={{ transform: 'rotate(90deg)' }} /> Phone
            </div>
            <div className="text-lg">
              +01 6698634
            </div>
          </div>
          <div className="flex flex-col font-semibold text-2xl border rounded-xl p-2 bg-gray-50 text-center shadow-xl ">
            <div>
              <MailOutlined /> Email
            </div>
            <div className="text-lg">
              sgdg@gmail.com
            </div>
          </div>
        </div>
      </div>
      <NewFooter/>
    </div>
  );
};

export default ContactUs;
