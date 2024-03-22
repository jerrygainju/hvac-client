import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import { EyeOutlined, EyeInvisibleOutlined, MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { fixedInputStyles, iconColorStyle, signInStyles } from './style/userStyle';
import config from '../../config/config';
import Navigation from '../homepage/navigation/navigation';


const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setconfirmPasswod] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);


  const handleRegister = async () => {
    try {
      await axios.post(`${config.BASE_URL}/user/signup`, {
        username,
        email,
        password,
        confirmPassword
      });
      console.log('User registered successfully!');
      navigate('/signin');
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'An unexpected error occurred.';
        toast.dismiss();
        toast.error(errorMessage, {
          closeOnClick: true,
          autoClose: 5000,
          position: 'top-center'
        });
      } else if (error.request) {
        toast.dismiss();
        toast.error('No response received from the server.');
      } else {
        toast.dismiss();
        toast.error('An unexpected error occurred.');
      }
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <div>
      <Navigation />
      <form className="mt-8 space-y-6">
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Signin"
          linkUrl="/signin"
        />
        <div className='flex flex-col items-center'>
          <Input
            type="text"
            value={username}
            placeholder="Username"
            className={`${fixedInputStyles}`}
            prefix={<UserOutlined style={iconColorStyle} />}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email Address"
            className={`${fixedInputStyles}`}
            value={email}
            prefix={<MailOutlined style={iconColorStyle} />}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            placeholder="Password"
            value={password}
            className={`${fixedInputStyles}`}
            prefix={<LockOutlined style={iconColorStyle} />}
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined onClick={toggleShowPassword} />
              ) : (
                <EyeInvisibleOutlined onClick={toggleShowPassword} />
              )
            }
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input.Password
            placeholder="Confirm Password"
            className={`${fixedInputStyles}`}
            prefix={<LockOutlined style={iconColorStyle} />}
            value={confirmPassword}
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined onClick={toggleShowConfirmPassword} />
              ) : (
                <EyeInvisibleOutlined onClick={toggleShowConfirmPassword} />
              )
            }
            onChange={(e) => setconfirmPasswod(e.target.value)}
          />
          <button type="button" className={signInStyles} onClick={handleRegister}>
            Signup
          </button>
          <div>
            <ToastContainer />
          </div>
        </div>
      </form>
    </div>
  );

};

export default Signup;
