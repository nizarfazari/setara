
import * as React from 'react';
import Breadcrumb from '../../components/Breadcumb';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';


interface IConfirmationPINProps {
}

type LoginType = {
    pin: string;
};


const onFinishFailed: FormProps<LoginType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const ConfirmationPIN: React.FunctionComponent<IConfirmationPINProps> = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const onFinish: FormProps<LoginType>['onFinish'] = (values) => {
        const correctPIN = "1234";
        if (values.pin === correctPIN) {
            console.log('Success:', values);
            navigate('/transaksi-berhasil')
        } else {
            console.log('Incorrect PIN');
            form.setFields([
                {
                    name: 'pin',
                    errors: ['PIN yang Anda masukkan salah'],
                },
            ]);
        }
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
                                <Input className='input-label mt-3' type='number' placeholder='Masukan Username ID Anda' />
                            </div>
                        </Form.Item>

                        <Form.Item  >
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
