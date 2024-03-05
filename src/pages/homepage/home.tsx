import React, { useState } from 'react';
// import './index.css';
import { MailOutlined, CarOutlined, InfoCircleOutlined, HomeOutlined } from '@ant-design/icons';
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
    icon: <CarOutlined />,
    children: [
      {
        label: 'Car Park Ventilation',
        key: 'car',
      },
      {
        label: 'Duct Size Calculation',
        key: 'duct',
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

const Dashboard: React.FC = () => {
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate(); 

  const onClick = (e: any) => {
    setCurrent(e.key);

    if (e.key === 'car') {
      navigate('/car-park-ventilation');
    }
    if (e.key === 'duct') {
      navigate('/duct-size-calculation');
    }
    
  };

  

  return (
    <div className='flex mt-[-350px]'>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='flex flex-row gap-8 bg-gray-200 rounded ' />
    </div>
  );
};
export default Dashboard;


