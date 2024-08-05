import * as React from 'react';
import Breadcrumb from '../../components/Breadcumb';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface IConfirmationPINProps {}

type LoginType = {
  pin: string;
};

const onFinishFailed: FormProps<LoginType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const ConfirmationPIN: React.FunctionComponent<IConfirmationPINProps> = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const getUser = localStorage.getItem('user');
  const token = JSON.parse(getUser!).token;

  const { body } = location.state || {};
  console.log(`BODY : ${body}`)
  const onFinish: FormProps<LoginType>['onFinish'] = async (values) => {
    try {
      const response = await axios.post(
        'https://setara-api-service-production.up.railway.app/api/v1/transactions/bca-transfer',
        {
          destinationAccountNumber: body.destinationAccountNumber,
          amount: body.amount,
          mpin: values.pin,
          note: body.note,
          savedAccount: body.savedAccount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Success:', JSON.stringify(response.data));
      navigate('/transaksi-berhasil', {
        state: {
          body: {
            account_name: body.account_name,
            destinationAccountNumber: body.destinationAccountNumber,
            amount: body.amount,
            note: body.note,
            savedAccount: body.savedAccount
          }
        }
      });
    } catch (error) {
      console.log('Error:', error);
      form.setFields([
        {
          name: 'pin',
          errors: ['Transaksi gagal. Mohon cek kembali PIN Anda.'],
        },
      ]);
    }
    // const correctPIN = "1234";
    // if (values.pin === correctPIN) {
    // } else {
    //   console.log('Incorrect PIN');
    //   form.setFields([
    //     {
    //       name: 'pin',
    //       errors: ['PIN yang Anda masukkan salah'],
    //     },
    //   ]);
    // }
  };

  return (
    <>
      <div className='container mx-auto'>
        <div className="my-[30px]">
          <Breadcrumb title="Masukan PIN Anda" subtitle="Harap Masukan PIN Anda dengan teliti" />
        </div>
        <div className="max-w-[563px] mx-auto">
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<LoginType>
              name="pin"
              rules={[{ required: true, message: 'Mohon Masukan PIN anda!' }]}
            >
              <div className=''>
                <label htmlFor="" className='text-body-large text-neutral-400 font-bold required'>PIN Anda</label>
                <Input className='input-label mt-3' type='password' placeholder='Masukkan PIN Anda' />
              </div>
            </Form.Item>

            <Form.Item>
              <Button className='mt-5 bg-primary-100 text-white w-full h-[60px] rounded-xl text-heading-5 font-semibold' htmlType="submit">
                Lanjutkan
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPIN;
