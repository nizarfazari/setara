import { Button, Form, Input, InputNumber } from 'antd';
import Breadcrumb from '../../../components/Breadcumb';
import { useAuth } from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

type TFormPayQris = {
  amount: number;
  notes?: string;
};

const PayQris = () => {
  const { user, setProcessTransaction, transactions } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const transactionDetail = location.state?.transactionDetail;
  console.log(transactionDetail);

  const onFinish = (values: TFormPayQris) => {
    setProcessTransaction({
      nominal: values.amount.toString(),
      notes: values.notes,
    });
    navigate('/confirmpayqr');
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container">
      <div className="my-[30px]">
        <div className="mb-5">
          <Breadcrumb
            title="Pembayaran QRIS"
            subtitle="Masukkan Nominal Pembayaran"
          />
        </div>

        <div className="container py-5 lg:py-[20px] pb-[50px]">
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              amount: +transactions?.transaction?.nominal || null,
              notes: transactions?.transaction?.notes || null,
            }}
          >
            <div className="lg:flex lg:justify-center lg:space-x-40">
              <div className="text-center my-4 lg:order-1 lg:w-1/2">
                <img
                  className="w-[200px] lg:w-[200px] m-auto lg:h-[200px]"
                  src={transactions.recipients.imageUrl}
                  alt="Merchant (src ganti image path dari api)"
                />
                <p className="mt-2 font-bold text-2xl text-primary-100">
                  {transactions.recipients.nama}
                </p>
                <p className="text-lg text-primary-100">
                  {transactionDetail?.address}
                </p>
              </div>

              <div className="lg:w-1/2 lg:order-2">
                <p className="font-bold text-lg text-primary-100">
                  Sumber Rekening
                </p>

                <div className="flex flex-nowrap items-start mt-2">
                  <img
                    className="w-[70px] mr-4"
                    src={user?.user.image_path}
                    alt="Account"
                  />
                  <div className="text-[12px] md:text-[14px]">
                    <p className="font-bold text-lg text-primary-100">
                      {user?.user.name}
                    </p>
                    <div className="flex items-center mb-8">
                      <p className="font-bold text-lg text-primary-100">
                        {user?.user.bank_name}
                      </p>
                      <img
                        className="w-[6px] h-[6px] mx-2"
                        src="/images/icons/dot.png"
                        alt="Dot"
                      />
                      <p className="font-bold text-lg text-primary-100">
                        {user?.user.account_number}
                      </p>
                    </div>
                  </div>
                </div>

                <Form.Item
                  name="amount"
                  label={
                    <span className="text-primary-100">Masukkan Nominal</span>
                  }

                  rules={[
                    {
                      validator(_, value) {
                        if (!value) {
                          return Promise.reject(
                            new Error('Nominal Tidak Boleh Kosong')
                          );
                        }
                        if (value < 1) {
                          return Promise.reject(
                            new Error(
                              'Minimum transfer adalah Rp. 1, mohon isikan kembali'
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  required
                >
                  <InputNumber<number>
                    type="text"
                    prefix="Rp."
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    }
                    parser={(value) =>
                      value?.replace(/\.\s?|(,*)/g, '') as unknown as number
                    }
                    className="w-full px-[15px] py-3 md:px-6 md:py-4"
                    placeholder="Masukkan Nominal"
                  />
                </Form.Item>
                <Form.Item label="Catatan" name="notes">
                  <Input type="text" placeholder="Masukkan Catatan (Opsional)" />
                </Form.Item>

                <Button
                  type="primary"
                  className="mt-3 bg-primary-100 text-white w-full h-10 rounded-xl font-semibold text-body-small md:text-heading-6 md:h-[60px]"
                  htmlType="submit"
                >
                  Lanjutkan
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PayQris;
