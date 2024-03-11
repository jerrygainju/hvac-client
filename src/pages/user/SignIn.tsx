import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormExtra from '../../components/FormExtra';
import Header from '../../components/Header';
import { Input } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { fixedInputStyles, iconColorStyle, signInStyles } from './style/userStyle';
import '../user/style/user.css'
import config from '../../config/config';
import Navigation from '../homepage/navigation';


const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${config.BASE_URL}/user/signin`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      console.log('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'An unexpected error occurred.';
        toast.dismiss();
        toast.error(errorMessage, {
          closeOnClick: true,
          autoClose: 5000,
          position: 'top-center',
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

  return (
    <div className='pt-[212px]'>
      <Navigation />
      <form className="mt-8 space-y-6">
        <Header
          heading="Signin to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <div className='flex flex-col items-center'>
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
            prefix={<LockOutlined style={iconColorStyle} />}
            className={`${fixedInputStyles}`}
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined onClick={toggleShowPassword} />
              ) : (
                <EyeInvisibleOutlined onClick={toggleShowPassword} />
              )
            }
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormExtra />
          <button type='button'
            className={`${signInStyles}`}
            onClick={handleLogin}> Signin </button>
          <div>
            <ToastContainer />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
