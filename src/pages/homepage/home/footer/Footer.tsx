import React, { useState } from "react";
import { Row, Col, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";


const NewFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [query, setQuery] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = () => {
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
            setEmail("");
            setQuery("");
        }, 1000);
    };


    return (
        <div className="pt-12">
            <div className=" pt-10 bg-gray-300 w-full shadow-2xl">
                <div className=" pl-32">
                    <div className="max-w-7xl mx-auto">
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={6}>
                                <div>
                                    <h4 className="text-xl pb-2">Company</h4>
                                    <p className="text-gray-500">
                                        16B/2-4 Cross St <br />
                                        Hurstville, NSW 2220 <br />
                                        <br />

                                        <label className="text-base">
                                            Phone:
                                        </label>
                                        +61401 408 153
                                        <br />
                                        <label className="text-base">
                                        Email:
                                        </label>
                                         info@sgdg.com.au
                                    </p>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={4}>
                                <div>
                                    <h4 className="pb-2 text-lg">Pages</h4>
                                    <ul className="text-gray-500">
                                        <li className="pb-2">
                                            <a
                                                href="/"
                                                className="hover:text-blue-500"
                                            >
                                                Home
                                            </a>
                                        </li>
                                        <li className="pb-2">
                                            <a
                                                href="/contact-us"
                                                className="hover:text-blue-500"
                                            >
                                                Contact Us
                                            </a>
                                        </li>
                                        <li className="pb-2">
                                            <a
                                                href="/about-us"
                                                className="hover:text-blue-500"
                                            >
                                                About Us
                                            </a>
                                        </li>
                                        <li className="pb-4">
                                            <a
                                                href="/"
                                                className="hover:text-blue-500"
                                            >
                                                Services
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={6}>
                                <div>
                                    <h4 className="pb-2 text-lg">Our Services</h4>
                                    <ul className="text-gray-500">
                                        <li className="pb-2">
                                            <a
                                                href="/car-park-ventilation"
                                                className="hover:text-blue-500"
                                            >
                                                Car Park Ventilation
                                            </a>
                                        </li>
                                        <li>
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
                                <div className="w-60">
                                    <h4 className="pb-2 text-lg">Ask for your Designs</h4>
                                    <Input 
                                        placeholder="Enter your email"
                                        prefix={<MailOutlined  className="text-gray-400 pt-[1px] pr-1"/>}
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
                                    <div className="pb-6">
                                        <Button
                                            type="primary"
                                            className="bg-blue-500"
                                            onClick={handleSubmit}
                                            loading={submitting}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                {/**-----Copyright----- */}
                <div className="bg-gray-500 py-6 text-center">
                    <div>
                        Copyright &copy; {currentYear}
                        <strong>
                            <span> by SG Design Group</span>
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFooter;