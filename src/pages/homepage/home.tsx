// Dashboard.js
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Dashboard = () => {
  return (
    <div className="flex items-start">
      <Tabs defaultActiveKey="home" className="custom-tabs">
        {/* Home Tab */}
        <TabPane tab="Home" key="home">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h2>
            {/* Add home content here */}
          </div>
        </TabPane>

        {/* Services Tab */}
        <TabPane tab="Services" key="services">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Our Services</h2>
            {/* Add services content here */}
          </div>
        </TabPane>

        {/* Projects Tab */}
        <TabPane tab="Projects" key="projects">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Our Projects</h2>
            {/* Add projects content here */}
          </div>
        </TabPane>

        {/* About Us Tab */}
        <TabPane tab="About Us" key="about">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            {/* Add about us content here */}
          </div>
        </TabPane>

        {/* Add more tabs as needed */}
      </Tabs>
    </div>
  );
};

export default Dashboard;
