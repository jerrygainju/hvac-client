import React, { useState } from 'react';
// import './index.css';
import { MailOutlined, CarOutlined, InfoCircleOutlined, HomeOutlined, CodeSandboxOutlined, CloudServerOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

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
        icon: <CodeSandboxOutlined/>
      },
    ],
  },
  {
    label: 'About ',
    key: 'aboutus',
    icon: <InfoCircleOutlined />,
  },
  {
    label: 'Contact Us',
    key: 'contactus',
    icon: <MailOutlined />,
  },
];

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate(); 

  const onClick = (e: any) => {
    setCurrent(e.key);

    if (e.key === 'home') {
      navigate('/');
    }
    if (e.key === 'car') {
      navigate('/car-park-ventilation');
    }
    if (e.key === 'duct') {
      navigate('/duct-size-calculation');
    }
    
  };

  return (
    <div className='flex mt-[-390px]'>
      <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items}  className='flex gap-32 bg-gray-200 rounded ' />
    </div>
  );
};
export default Navigation;


