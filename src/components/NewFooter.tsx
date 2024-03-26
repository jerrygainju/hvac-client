import React from "react";
import { Layout, Row, Col, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const NewFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Layout>
        <Footer className="" style={{ backgroundColor: "#dbd7d2", marginTop: "auto", paddingBottom:'0px' }}>
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
                          href="https://sgdg.com.au/"
                          className="hover:text-blue-500"
                        >
                          Home
                        </a>
                      </li>
                      <li className="pb-4">
                        <a
                          href="https://sgdg.com.au/contact-us/"
                          className="hover:text-blue-500"
                        >
                          Contact Us
                        </a>
                      </li>
                      <li className="pb-4">
                        <a
                          href="https://sgdg.com.au/our-team/"
                          className="hover:text-blue-500"
                        >
                          Our Team
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
                          href="https://sgdg.com.au/our-services/"
                          className="hover:text-blue-500"
                        >
                          HVAC Design
                        </a>
                      </li>
                      <li className="pb-4">
                        <a
                          href="https://sgdg.com.au/our-services/"
                          className="hover:text-blue-500"
                        >
                          HVAC Documentation
                        </a>
                      </li>
                      <li className="pb-4">
                        <a
                          href="https://sgdg.com.au/our-services/"
                          className="hover:text-blue-500"
                        >
                          BIM Coordination Services
                        </a>
                      </li>
                      <li className="pb-4">
                        <a
                          href="https://sgdg.com.au/our-services/"
                          className="hover:text-blue-500"
                        >
                          Business Process Outsourcing
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
                    />
                    <Input.TextArea
                      placeholder="Enter your queries"
                      style={{ marginBottom: "10px" }}
                    />
                    <Button type="primary" style={{ background: "red" }}>
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
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
                <span>by SG Design Group</span>
              </strong>
            </div>
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

export default NewFooter;
