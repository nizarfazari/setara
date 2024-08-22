import { useState } from 'react';
import { Button, Form, FormProps, Input, Spin } from 'antd';
import './login.css';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

type LoginType = {
  username: string;
  password: string;
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const username = localStorage.getItem('username');
  const { openNotificationWithIcon } = useNotification();

  const onFinish: FormProps<LoginType>['onFinish'] = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.VITE_API_URL}/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signature: values.username,
          password: values.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors ?? 'Email atau Password Salah');
      }
      openNotificationWithIcon('success', 'Success', data.message);
      login(data.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';
      openNotificationWithIcon('error', 'Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<LoginType>['onFinishFailed'] = () => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen relative">
      <div className={`w-[563px] mx-auto ${loading ? 'opacity-50' : ''}`}>
        <div className="text-center font-bold">
          <h1 className="text-heading-2 text-black-800 mb-2">Masuk</h1>
          <p className="text-heading-6 text-black-600 mb-5">
            Selamat Datang Kembali
          </p>
        </div>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <div className="input-group">
            <label htmlFor="username" className="required">
              Username ID
            </label>
            <Form.Item<LoginType>
              name="username"
              rules={[{ required: true, message: 'Mohon Masukan Username!' }]}
            >
              <Input
                className={`input-label ${
                  username ? 'bg-black-500' : 'bg-white'
                }`}
                placeholder="Masukan Username ID Anda"
                disabled={!!username}
                id="username"
                aria-label="Masukan Username ID Anda"
              />
            </Form.Item>
          </div>

          <div className="mt-8 input-group">
            <Form.Item<LoginType>
              name="password"
              rules={[{ required: true, message: 'Mohon Masukan Password!' }]}
            >
              <Input.Password
                className="input-label"
                placeholder="Masukan Password Anda"
                aria-label="Masukan Password Anda"
              />
            </Form.Item>
            <label htmlFor="password" className="required">
              Kata Sandi
            </label>
          </div>

          <Form.Item>
            <Button
              type="primary"
              className="mt-5 bg-primary-100 text-white w-full h-[60px] rounded-xl text-heading-5 font-semibold"
              htmlType="submit"
              aria-label="Masuk"
            >
              Masuk
            </Button>
          </Form.Item>
        </Form>
      </div>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-center">
            <Spin size="large" />
            <p className="text-heading-6 mt-2">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
