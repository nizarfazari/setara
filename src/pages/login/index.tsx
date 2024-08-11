import {  useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import './login.css';
import { useAuth } from '../../hooks/useAuth';

import { useNotification } from '../../hooks/useNotification';


type LoginType = {
  username: string;
  password: string;
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth()


  const username = localStorage.getItem('username');
  console.log(username)

  const { openNotificationWithIcon } = useNotification();
  const onFinish: FormProps<LoginType>['onFinish'] = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('https://setara-api-service-production.up.railway.app/api/v1/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ signature: values.username, password: values.password })
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data)
        throw new Error(data.errors ?? 'Email atau Password Salah');

      }
      openNotificationWithIcon('success', 'Success', data.message)
      login(data.data)
      localStorage.setItem('username', values.username);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      openNotificationWithIcon('error', 'Error', errorMessage);
      console.log('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<LoginType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className='container mx-auto flex justify-center items-center h-screen'>
      <div className="w-[563px] mx-auto">
        <div className='text-center font-bold'>
          <h1 className="text-heading-2 text-black-800 mb-2">Masuk</h1>
          <p className="text-heading-6 text-black-600 mb-5">Selamat Datang Kembali</p>
        </div>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}

          initialValues={{ username: username || null }}
        >
          <div className='input-group'>
            <label htmlFor="username" className='required'>Username ID</label>
            <Form.Item<LoginType>
              name="username"
              rules={[{ required: true, message: 'Mohon Masukan Username!' }]}
            >
              <Input className={`input-label ${username ? 'bg-black-500' : 'bg-white'}`} placeholder='Masukan Username ID Anda' disabled={!!username} id='username' />
            </Form.Item>
          </div>

          <div className='input-group'>
            <Form.Item<LoginType>
              name="password"
              rules={[{ required: true, message: 'Mohon Masukan Password!' }]}
            >
              <Input.Password className='input-label' placeholder='Masukan Password Anda' />
            </Form.Item>
            <label htmlFor="" className='required'>Katasandi</label>
          </div>

          <Form.Item>
            <Button
              className='mt-5 bg-primary-100 text-white w-full h-[60px] rounded-xl text-heading-5 font-semibold'
              htmlType="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Masuk'}
            </Button>
          </Form.Item>
          {/* <p className='text-body-large font-normal text-black-600 text-center'>Tidak Punya Akun? <span className='text-[#2050DD]'>Daftar</span></p> */}
        </Form>

      </div>
    </div>
  );
};

export default Login;
