import { Button, Form, Input, InputNumber } from 'antd';
import Breadcrumb from '../../../components/Breadcumb';
import { useAuth } from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetchData } from '../../../hooks/useFetchData';
import { UserBalance } from '../../../types/Bank';

type TFormPayQris = {
  amount: number;
  notes?: string;
};

const PayQris = () => {
  const { user, setProcessTransaction, transactions } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const transactionDetail = location.state?.transactionDetail;
  const apiAmount = transactionDetail?.amount;
  const { data: userBalance } = useFetchData<UserBalance>(
    `/user/getBalance`,
    user?.token
  );

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
              amount: apiAmount || +transactions?.transaction?.nominal || null,
              notes: transactions?.transaction?.notes || null,
            }}
          >
            <div className="lg:flex lg:justify-center lg:space-x-40">
              <div className="text-center my-4 lg:order-1 lg:w-1/2">
                <img
                  className="w-[200px] lg:w-[200px] m-auto lg:h-[200px]"
                  tabIndex={0}
                  aria-label={`Merchant ${transactions?.recipients?.nama}`}
                  src={transactions.recipients.imageUrl}
                  alt="Merchant (src ganti image path dari api)"
                />
                <p className="mt-2 font-bold text-2xl text-primary-100" tabIndex={0}>
                  {transactions.recipients.nama}
                </p>
                <p className="text-lg text-primary-100" tabIndex={0}>
                  {transactions.recipients.address}
                </p>
              </div>

              <div className="lg:w-1/2 lg:order-2">
                <p className="font-bold text-lg text-primary-100" tabIndex={0}>
                  Sumber Rekening
                </p>

                <div className="flex flex-nowrap items-start mt-2">
                  <img
                    tabIndex={0}
                    aria-label='avatar account'
                    className="w-[70px] mr-4"
                    src={user?.user.image_path}
                    alt="Account"
                  />
                  <div className="text-[12px] md:text-[14px]">
                    <p className="font-bold text-lg text-primary-100" tabIndex={0}>
                      {user?.user.name}
                    </p>
                    <div className="flex items-center mb-8">
                      <p
                        className="font-bold text-lg text-primary-100"
                        tabIndex={0}
                        aria-label='nama bank'
                        >
                        {user?.user.bank_name}
                      </p>
                      <img
                        className="w-[6px] h-[6px] mx-2"
                        src="/images/icons/dot.png"
                        alt="Dot"
                      />
                      <p className="font-bold text-lg text-primary-100" tabIndex={0} aria-label='account number'>
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
                    { required: true, message: 'Nominal Tidak Boleh Kosong' },
                    {
                      type: 'number',
                      min: 1,
                      message: 'Minimum transfer adalah 1, mohon isikan kembali',
                    },
                    {
                      type: 'number',
                      max: userBalance?.balance,
                      message: 'Saldo Tidak Cukup, mohon isikan kembali',
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
                    className={`w-full px-[15px] py-3 md:px-6 md:py-4 ${apiAmount ? 'font-bold !text-[#000]' : ''}`}
                    placeholder="Masukkan Nominal"
                    disabled={!!apiAmount}
                  />
                </Form.Item>
                <Form.Item label="Catatan" name="notes">
                  <Input
                    type="text"
                    placeholder="Masukkan Catatan (Opsional)"
                  />
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
