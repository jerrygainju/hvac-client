// // Dashboard.js
// import { Menu } from 'antd';
// import { CarOutlined, ProjectOutlined, InfoCircleOutlined, HomeOutlined } from '@ant-design/icons';
// import Car from '../carparkventilation/Car';

// const Dashboard = () => {
//   return (
//     <div className="flex items-start">
//       <Menu mode="horizontal" defaultSelectedKeys={['home']}>
//         <Menu.Item key="home" icon={<HomeOutlined />} className="m-0">
//           Welcome
//         </Menu.Item>
//         <Menu.SubMenu key="services" title="Our Services" icon={<CarOutlined />}>
//           <Menu.Item key="car">
//             <div className="">
//               <h2 className="text-2xl font-bold mb-4">Car Services</h2>
//               <Car />
//             </div>
//           </Menu.Item>
//           {/* Add more Menu.Items for other services */}
//         </Menu.SubMenu>
//         <Menu.Item key="projects" icon={<ProjectOutlined />} className="m-0">
//           Our Projects
//         </Menu.Item>
//         <Menu.Item key="about" icon={<InfoCircleOutlined />} className="m-0">
//           About Us
//         </Menu.Item>
//       </Menu>

//       <div className="p-4">
//         {/* Content based on the selected key */}
//         {/* Add content for other keys as needed */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from 'react';
// import './index.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined, CarOutlined, ProjectOutlined, InfoCircleOutlined, HomeOutlined } from '@ant-design/icons';
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
    label: 'Contact us',
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
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='flex flex-row gap-8 bg-gray-200 rounded' />
    </div>
  );
};
export default Dashboard;


