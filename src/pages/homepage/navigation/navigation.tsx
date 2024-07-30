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
  WalletOutlined,
  MenuOutlined,
  CloseOutlined,
  HighlightOutlined,
  CalculatorOutlined,
  BoxPlotOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import SgLogo from "../../../public/sg-logo2.png";
import "./navstyle.css";
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
        className:"font-mono",
      },
      {
        label: "Duct Size Calculation",
        key: "duct",
        icon: <CodeSandboxOutlined />,
        className:"font-mono",
      },
      {
        label: "Refrigerant Charge Calculation",
        key: "refrigerant",
        icon: <WalletOutlined />,
        className:"font-mono",
      },
      {
        label: "Pipe Sizer",
        key: "pipesizer",
        icon:<HighlightOutlined />,
        className:"font-mono",
      },
      {
        label: "Converter",
        key: "converter",
        icon:<CalculatorOutlined />,
        className:"font-mono",
      },
      {
        label: "Duct Measurement",
        key: "duct-measurement",
        icon:<BoxPlotOutlined />,
        className:"font-mono",
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
        className:"font-mono",
      },
      {
        label: "Sign Up",
        key: "signup",
        icon: <UserAddOutlined />,
        className:"font-mono",
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
    if (e.key === "refrigerant") {
      navigate("/refrigerant-charge-calculation");
    }
    if (e.key === "pipesizer"){
      navigate("/pipe-size-calculation");
    }
    if(e.key === "converter"){
      navigate("/converter");
    }
    if(e.key === "duct-measurement"){
      navigate("/duct-measurement")
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
    <div className="sticky top-0 z-50 bg-white shadow rounded w-screen">
      <div className="flex flex-row justify-between items-center lg:gap-4 gap-2 py-2 px-4">
        <div>
          <a href="/">
            <img
              src={SgLogo}
              width={40}
              height={40}
              alt="logo"
              style={{ cursor: "pointer" }}
            />
          </a>
        </div>
        <div className="lg:text-lg text-xs font-semibold text-gray-600 font-mono slide-from-left">
          Welcome to HVAC Calculation
        </div>
        <div className="flex flex-col slide-from-right">
          <div className="lg:text-base font-semibold text-xs text-gray-600 font-mono">
            <PhoneOutlined style={{ transform: "rotate(90deg)" }} /> Call us
          </div>
          <div className="lg:text-sm text-xs font-semibold text-gray-600 font-mono">
            +01 6632154
          </div>
        </div>
        <div className="flex flex-row lg:gap-4 gap-2">
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
            <MenuOutlined className="text hover:text-sky-500 cursor-pointer p-1 border-4 rounded" />
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
              className="flex flex-col items-start w-full font-semibold font-mono bg-gray-200"
            />
          </div>
          <div
            className={isNavOpen ? "block" : "hidden"}
            onClick={() => setIsNavOpen(false)}
          >
            <CloseOutlined className="text hovter:text-sky-500 text-white-700 bg-blue-500 cursor-pointer p-1 border-4 rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={items}
          className="lg:flex flex-row xl:gap-28 lg:gap-12 2xl:gap-[9%] md:hidden sm:hidden hidden w-screen font-semibold  font-mono bg-gray-200 rounded "
        />
      </div>
    </div>
  );
};

export default Navigation;
