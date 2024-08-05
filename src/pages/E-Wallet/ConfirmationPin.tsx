
import * as React from 'react';
import Breadcrumb from '../../components/Breadcumb';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { TransactionEWalletReq, TransactionEWalletRes } from '../../types/E-Wallet';
import { postData } from '../../utils/GetData';
import { useNotification } from '../../hooks/useNotification';



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
    const { user, transWallet } = useAuth();
    const { openNotificationWithIcon } = useNotification();
    const navigate = useNavigate()


    const onFinish: FormProps<LoginType>['onFinish'] = async (values) => {


        try {
            const data = await postData<TransactionEWalletReq, TransactionEWalletRes>('/transactions/topup', {
                idEwallet: transWallet.idWallet,
                destinationPhoneNumber: transWallet.recipients.numberDestination,
                amount: +transWallet.transaction.nominal,
                mpin: values.pin.toString(),
                note: transWallet.transaction.notes,
                savedAccount: true,
            }, user?.token);

            if (data.code !== 200) {
                navigate('/transaksi-gagal')
            }

            openNotificationWithIcon('success', 'Success', 'Transaksi Berhasil')
            navigate('/transaksi-berhasil')
            console.log(data)
        } catch (error) {
            openNotificationWithIcon('error', 'Error', 'Transasksi gagal')
            form.setFields([
                {
                    name: 'pin',
                    errors: [error.response.data.message],
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
                                <Input className='input-label mt-3' type='number' placeholder='Masukan Username ID Anda' maxLength={6} />
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
