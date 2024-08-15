import * as React from 'react';
import Breadcrumb from '../../components/Breadcumb';
import type { FormProps } from 'antd';
import { Button, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { TransactionBankReq, TransactionBankRes } from '../../types/Bank';
import { postData } from '../../utils/GetData';
import { useNotification } from '../../hooks/useNotification';
import axios from 'axios';

interface IConfirmationPINProps {}

type LoginType = {
  pin: string;
};

const ConfirmationPIN: React.FunctionComponent<IConfirmationPINProps> = () => {
  const [form] = Form.useForm();
  const { user, transactions } = useAuth();
  const { openNotificationWithIcon } = useNotification();
  const navigate = useNavigate();
  const [pin, setPin] = React.useState<string>('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9]*$/.test(e.target.value) && e.target.value.length <= 6) {
      setPin(e.target.value);
    }
  };

  const onFinish: FormProps<LoginType>['onFinish'] = async (values) => {
    setIsSubmitting(true);

    try {
      const data = await postData<TransactionBankReq, TransactionBankRes>(
        '/transactions/bca-transfer',
        {
          account_number: transactions.transactionId,
          destinationAccountNumber: transactions.recipients.numberDestination,
          amount: +transactions.transaction.nominal,
          mpin: values.pin.toString(),
          note: transactions.transaction.notes,
          savedAccount: transactions.transaction.isSavedAccount ?? false,
        },
        user?.token
      );

      if (data.code !== 200) {
        navigate('/transaksi-gagal');
      } else {
        openNotificationWithIcon('success', 'Success', 'Transaksi Berhasil');
        navigate('/transaksi-berhasil');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        openNotificationWithIcon('error', 'Error', 'Transasksi gagal');
        form.setFields([
          {
            name: 'pin',
            errors: ['PIN Anda Salah'],
          },
        ]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="my-[30px]">
          <Breadcrumb
            title="Masukan PIN Anda"
            subtitle="Harap Masukan PIN Anda dengan teliti"
          />
        </div>
        <div className="max-w-[563px] mx-auto">
          <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item<LoginType>
              name="pin"
              rules={[{ required: true, message: 'Mohon Masukan PIN anda!' }]}
            >
              <div className="">
                <label
                  htmlFor=""
                  className="text-body-large text-neutral-400 font-bold required"
                >
                  PIN Anda
                </label>
                <Input.Password
                  className="input-label mt-3 py-[18px] px-6"
                  value={pin}
                  onChange={handlePinChange}
                  placeholder="Masukkan PIN Anda"
                />
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="mt-5 bg-primary-100 text-white w-full h-[60px] rounded-xl text-heading-5 font-semibold"
                htmlType="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spin size="small" /> : 'Lanjutkan'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPIN;
