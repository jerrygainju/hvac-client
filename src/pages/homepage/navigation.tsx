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
  UserSwitchOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import SgLogo from '../../public/sg-logo2.png'

const HomeLogo = () => (
  <div className="flex">
    <img src={SgLogo} alt="Logo" className=" h-10" />
  </div>
);

const items: MenuProps['items'] = [
  {
    label: <HomeLogo />,
    key: 'logo',
  },

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
        icon: <CodeSandboxOutlined />
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
        icon: <UserAddOutlined />
      },
    ],
  },
];

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState(' ');
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
    <div className='flex mt-[-390px]'>
      <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} className='flex gap-24 lg:w-[1500px] bg-gray-200 rounded ' />
    </div>
  );
};
export default Navigation;


