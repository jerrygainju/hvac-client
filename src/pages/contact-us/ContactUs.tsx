import { useState } from "react";
import Navigation from "../homepage/navigation";
import ContactImage from "../../public/contact.jpg";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import MapComponent from "./Map";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import '../homepage/home.css'


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
    paddingTop: "45px",
    justifyContent: "center",
    borderRadius: '15px',
    border: '1px solid #ddd',
  };

  return (
    <div>
        <Navigation />
      <div className="pt-[8px] w-[1490px] pl-[42px] slide-from-left">
        <div style={containerStyles} className="items-center">
          <div className="text-5xl font-serif">
            Contact Us
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-12 mt-8 justify-center">
        <div className="flex flex-col w-3/12  p-6  bg-gray-200 border rounded-xl shadow-2xl text-gray-600 card">
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
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700">Submit</button>
          </form>
        </div>
        <div className="shadow-2xl card">
          <MapComponent />
        </div>
        <div className="flex flex-col border rounded-xl px-12 pt-12 shadow-2xl gap-10 bg-gray-200 text-gray-600 w-96 card">
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
              <PhoneOutlined style={{ transform: 'rotate(90deg)' }}/> Phone
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
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
