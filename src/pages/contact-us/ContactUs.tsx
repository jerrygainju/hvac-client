import { useState } from "react";
import Navigation from "../homepage/navigation";
import ContactImage from "../../public/contact.jpg";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";

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
    // Add your logic to handle form submission
    console.log("Form submitted:", formData);
  };

  const containerStyles = {
    backgroundImage: `url(${ContactImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "500px",
    display: "flex",
    paddingTop: "50px",
    justifyContent: "center",
    borderRadius: '10px',
    border: '1px solid #ddd',
  };

  const titleStyles = {
    fontSize: '5rem',
    color: '#332',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  };

  return (
    <div className="pt-[763px] pb-20">
      <Navigation />
      <div className="pt-[18px]">
        <div style={containerStyles}>
          <div style={titleStyles}>
            <b>Contact Us</b>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-4/12 mt-8 p-6  bg-white border rounded-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-600 font-medium">Your Name</label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">Your Email</label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-600 font-medium">Your Message</label>
            <TextArea id="message" name="message" value={formData.message} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"></TextArea>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
