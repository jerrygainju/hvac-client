import React, { useState } from 'react';
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
  PhoneOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import SgLogo from '../../../public/sg-logo2.png'
import './navigation.css'
import '../style.css'

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Services',
    key: 'services',
    icon: <CloudServerOutlined />,
    children: [
      {
        label: 'Car Park Ventilation',
        key: 'car',
        icon: <CarOutlined />,
      },
      {
        label: 'Duct Size Calculation',
        key: 'duct',
        icon: <CodeSandboxOutlined />,
      },
    ],
  },
  {
    label: 'About Us',
    key: 'aboutus',
    icon: <InfoCircleOutlined />,
  },
  {
    label: 'Contact Us',
    key: 'contactus',
    icon: <MailOutlined />,
  },
  {
    label: 'Profile',
    key: 'profile',
    icon: <UserOutlined />,
    children: [
      {
        label: 'Sign In',
        key: 'signin',
        icon: <UserSwitchOutlined />,
      },
      {
        label: 'Sign Up',
        key: 'signup',
        icon: <UserAddOutlined />,
      },
    ],
  },
];

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();

  const onClick = (e: any) => {
    setCurrent(e.key);
    if (e.key === 'logo') {
      navigate('/');
    }

    if (e.key === 'home') {
      navigate('/');
    }
    if (e.key === 'car') {
      navigate('/car-park-ventilation');
    }
    if (e.key === 'duct') {
      navigate('/duct-size-calculation');
    }
    if (e.key === 'aboutus') {
      navigate('/about-us');
    }
    if (e.key === 'contactus') {
      navigate('/contact-us');
    }
    if (e.key === 'signup') {
      navigate('/signup');
    }
    if (e.key === 'signin') {
      navigate('/signin');
    }
  };

  return (
    <div className='sticky top-0 z-50 bg-white shadow rounded w-screen'>
      <div className='flex flex-row justify-between items-center gap-4 py-2 px-4'>
        <div>
          <img src={SgLogo} width={40} height={40} alt="logo" />
        </div>
        <div className='text-lg font-semibold text-gray-600 font-mono slide-from-left'>
          Welcome to HVAC Calculation
        </div>
        <div className='flex flex-col slide-from-right'>
          <div className='text-base font-semibold text-gray-600 font-mono'>
            <PhoneOutlined style={{ transform: 'rotate(90deg)' }} /> Call us
          </div>
          <div className='text-sm font-semibold text-gray-600 font-mono'>
            +01 6632154
          </div>
        </div>
        <div className='flex flex-row gap-4'>
          <div className='pt-2 ant-title'>
            <a href="facebook.com">
              <FacebookOutlined />
            </a>
          </div>
          <div className='pt-2 ant-title'>
            <a href="facebook.com">
              <InstagramOutlined />
            </a>
          </div>
          <div className='pt-2 ant-title'>
            <a href="facebook.com">
              <TwitterOutlined />
            </a>
          </div>
          <div className='pt-2 ant-title'>
            <a href="facebook.com">
              <SlackOutlined />
            </a>
          </div>
        </div>
      </div>
      <div className='flex'>
      <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} className='flex font-serif gap-36 w-full bg-gray-200 rounded' />
      </div>
    </div>
  );
};

export default Navigation;
