import React, {useState} from "react";
import { Layout, Row, Col, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const NewFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    // Perform form validation
    if (!email || !query) {
      message.error("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      message.success("Form submitted successfully!");
      setSubmitting(false);
      // Clear form fields
      setEmail("");
      setQuery("");
    }, 2000);
  };


  return (
    <div>
      <Layout>
        <Footer style={{ backgroundColor: "#dbd7d2", paddingBottom:'0px', marginTop: '20px' }}>
          <div style={{ padding: "10px 0" }}>
            <div className="max-w-7xl mx-auto">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div>
                    <h4 className="text-2xl pb-4">Company</h4>
                    <p className="text-gray-500">
                      16B/2-4 Cross St <br />
                      Hurstville, NSW 2220 <br />
                      <br />
                      <strong>Phone: </strong>+61401 408 153
                      <br />
                      <strong>Email: </strong>info@sgdg.com.au
                      <br />
                    </p>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div>
                    <h4 className="pb-4 font-bold">Useful Links</h4>
                    <ul className="text-gray-500">
                      <li className="pb-4">
                        <a
                          href="/"
                          className="hover:text-blue-500"
                        >
                          Home
                        </a>
                      </li>
                      <li className="pb-4">
                        <a
                          href="/contact-us"
                          className="hover:text-blue-500"
                        >
                          Contact Us
                        </a>
                      </li>
                      <li className="pb-4">
                        <a
                          href="/about-us"
                          className="hover:text-blue-500"
                        >
                          About Us
                        </a>
                      </li>
                      <li className="pb-4">
                        <a
                          href="https://sgdg.com.au/documentmanager/"
                          className="hover:text-blue-500"
                        >
                          Document Manager
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div>
                    <h4 className="pb-4 font-bold">Our Services</h4>
                    <ul className="text-gray-500">
                      <li className="pb-4">
                        <a
                          href="/car-park-ventilation"
                          className="hover:text-blue-500"
                        >
                          Car Park Ventilation
                        </a>
                      </li>
                      <li className="pb-4">
                        <a
                          href="/duct-size-calculation"
                          className="hover:text-blue-500"
                        >
                          Duct Size Calculation
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                  <div>
                    <h4 className="pb-4 font-bold">Ask for your Designs</h4>
                    <p className="text-gray-500 pb-2">
                      Join 25,000 + others in this family
                    </p>
                    <Input
                      placeholder="Enter your email"
                      prefix={<MailOutlined />}
                      style={{ marginBottom: "10px" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input.TextArea
                      placeholder="Enter your queries"
                      style={{ marginBottom: "10px" }}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button
                      type="primary"
                      style={{ background: "red" }}
                      onClick={handleSubmit}
                      loading={submitting}
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          {/**-----Copyright----- */}
          <div
            style={{
              backgroundColor: "#001529",
              color: "#fff",
              padding: "20px 0",
              textAlign: "center",
            }}
          >
            <div>
              Copyright &copy; {currentYear}
              <strong>
                <span> by SG Design Group</span>
              </strong>
            </div>
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

export default NewFooter;
