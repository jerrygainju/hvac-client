import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MailOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
const SecondModal: React.FC<{ visible: boolean; onClose: () => void; newPassword: string; resetToken: string; setNewPassword: (password: string) => void }> = ({ visible, onClose, newPassword, resetToken, setNewPassword }) => {
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChangeSubmit = async () => {
    try {
      const resetPasswordResponse = await axios.post(
        'http://localhost:3000/user/reset-password',
        { newPassword, confirmPassword },
        {
          headers: {
            'reset-token': resetToken,
          },
        }
      );
      toast.dismiss()
      toast.success(resetPasswordResponse.data.message || 'Password reset successfully. You can now log in with your new password.', {
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
      });
      onClose();
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.dismiss();
        toast.error(error.response.data.message || 'An unexpected error occurred.', {
          closeOnClick: true,
          autoClose: 5000,
          position: 'top-center',
        });
      } else if (error.request) {
        toast.error('No response received from the server.');
      } else {
        toast.error('An unexpected error occurred.');
      }
      console.error(error);
    }
  };


  return (
    <Modal title="Change your password" visible={visible} onCancel={onClose} footer={[
      <Button key="cancel" type='primary' danger onClick={onClose} >
        Cancel
      </Button>,
      <Button key="reset" type="primary" onClick={handlePasswordChangeSubmit} className='bg-blue-500'>
        Change Password
      </Button>,
    ]}>
      <Form>
        <Form.Item>
          <Input.Password
            placeholder="New Password"
            value={newPassword}
            prefix={<LockOutlined style={{ color: 'grey' }} />}
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            onChange={handlePasswordChange}
          />

        </Form.Item>
        <Form.Item>
          <Input.Password
            placeholder="Confirm Password"
            value={confirmPassword}
            prefix={<LockOutlined style={{ color: 'grey' }} />}
            iconRender={(visible) =>
              visible ? <EyeOutlined onClick={toggleShowConfirmPassword} /> : <EyeInvisibleOutlined onClick={toggleShowConfirmPassword} />
            }
            onChange={handleConfirmPasswordChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ForgotPasswordModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [resetToken, setResetToken] = useState<string>('');
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, [visible]);

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/request-password-reset', { email });
      const resetToken = response.data.token;

      setResetToken(resetToken);

      setIsSecondModalVisible(true);

      onClose();
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.dismiss();
        toast.error(error.response.data.message || 'An unexpected error occurred.', {
          closeOnClick: true,
          autoClose: 5000,
          position: 'top-center',
        });
      } else if (error.request) {
        toast.error('No response received from the server.');
      } else {
        toast.error('An unexpected error occurred.');
      }
      console.error(error);
    }
  };



  return (
    <>
      <Modal
        title="Provide your email"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" type='primary' danger onClick={onClose} >
            Cancel
          </Button>,
          <Button key="reset" type="primary" onClick={handleResetPassword} className='bg-blue-500'>
            Reset Password
          </Button>,
        ]}
      >
        <Form>
          <Form.Item>
            <Input
              type="email"
              value={email}
              placeholder="Email Address"
              prefix={<MailOutlined style={{ color: 'grey' }} />}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      {visible && <ToastContainer />}
      <SecondModal visible={isSecondModalVisible} onClose={() => setIsSecondModalVisible(false)} newPassword={newPassword} resetToken={resetToken} setNewPassword={setNewPassword} />
    </>
  );
};

export default function FormExtra() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <a href="#" className="font-medium text-purple-600 hover:text-purple-500" onClick={showModal}>
          Forgot your password?
        </a>
        <ForgotPasswordModal visible={isModalVisible} onClose={handleCancel} />
      </div>
    </div>
  );
}


