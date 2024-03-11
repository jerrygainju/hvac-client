import ContactImage from "../../public/contact.jpg";
import Navigation from "../homepage/navigation";

const ContactUs = () => {
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
    fontFamily: 'sansarif',
  };

  return (
    <div className="pt-[240px]">
          <Navigation />
      <div className="pt-[18px]">
        <div style={containerStyles}>
          <div style={titleStyles}>
            <b>Contact Us</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
