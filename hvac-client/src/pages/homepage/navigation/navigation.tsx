import React, { useState } from "react";
import {
  MailOutlined,
  CarOutlined,
  InfoCircleOutlined,
  HomeOutlined,
  CodeSandboxOutlined,
  CloudServerOutlined,
  UserOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  SlackOutlined,
  PhoneOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import SgLogo from "../../../public/sg-logo2.png";
import "./navigation.css";
import "../style.css";

const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Services",
    key: "services",
    icon: <CloudServerOutlined />,
    children: [
      {
        label: "Car Park Ventilation",
        key: "car",
        icon: <CarOutlined />,
      },
      {
        label: "Duct Size Calculation",
        key: "duct",
        icon: <CodeSandboxOutlined />,
      },
    ],
  },
  {
    label: "About Us",
    key: "aboutus",
    icon: <InfoCircleOutlined />,
  },
  {
    label: "Contact Us",
    key: "contactus",
    icon: <MailOutlined />,
  },
  {
    label: "Profile",
    key: "profile",
    icon: <UserOutlined />,
    children: [
      {
        label: "Sign In",
        key: "signin",
        icon: <UserSwitchOutlined />,
      },
      {
        label: "Sign Up",
        key: "signup",
        icon: <UserAddOutlined />,
      },
    ],
  },
];

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();

 
  const onClick = (e: any) => {
    setCurrent(e.key);
    if (e.key === "logo") {
      navigate("/");
    }

    if (e.key === "home") {
      navigate("/");
    }
    if (e.key === "car") {
      navigate("/car-park-ventilation");
    }
    if (e.key === "duct") {
      navigate("/duct-size-calculation");
    }
    if (e.key === "aboutus") {
      navigate("/about-us");
    }
    if (e.key === "contactus") {
      navigate("/contact-us");
    }
    if (e.key === "signup") {
      navigate("/signup");
    }
    if (e.key === "signin") {
      navigate("/signin");
    }
  };


  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white shadow rounded lg:w-screen">
      <div className="flex flex-row justify-between items-center gap-4 py-2 px-4">
        <div>
          <img src={SgLogo} width={40} height={40} alt="logo"  style={{cursor:"pointer"}} />
        </div>
        <div className="text-lg font-semibold text-gray-600 font-mono slide-from-left">
          Welcome to HVAC Calculation
        </div>
        <div className="flex flex-col slide-from-right">
          <div className="text-base font-semibold text-gray-600 font-mono">
            <PhoneOutlined style={{ transform: "rotate(90deg)" }} /> Call us
          </div>
          <div className="text-sm font-semibold text-gray-600 font-mono">
            +01 6632154
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="pt-2 ant-title">
            <a href="facebook.com">
              <FacebookOutlined />
            </a>
          </div>
          <div className="pt-2 ant-title">
            <a href="facebook.com">
              <InstagramOutlined />
            </a>
          </div>
          <div className="pt-2 ant-title">
            <a href="facebook.com">
              <TwitterOutlined />
            </a>
          </div>
          <div className="pt-2 ant-title">
            <a href="facebook.com">
              <SlackOutlined />
            </a>
          </div>
        </div>

        {/**for the responsive menu */}

        <div className="lg:hidden pt-2">
          <div
            className={isNavOpen ? "hidden" : "block"}
            onClick={() => setIsNavOpen(true)}
          >
            <MenuOutlined className="text-2xl hover:text-sky-500 cursor-pointer p-1 border-4 rounded" />
          </div>
          <div
            className={
              isNavOpen
                ? "block absolute top-full left-0 right-0 rounded"
                : "hidden"
            }
          >
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="vertical"
              items={items}
              className="font-serif bg-gray-200"
            />
          </div>
          <div
            className={isNavOpen ? "block" : "hidden"}
            onClick={() => setIsNavOpen(false)}
          >
            <CloseOutlined className="text-2xl hover:text-sky-500 text-white-700 bg-blue-500 cursor-pointer p-1 border-4 rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={items}
          className="lg:flex md:hidden sm:hidden hidden font-serif gap-36 w-full bg-gray-200 rounded "
        />
      </div>
    </div>
  );
};

export default Navigation;
