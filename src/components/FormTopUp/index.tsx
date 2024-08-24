import { Button, Form, FormProps, Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFetchData } from '../../hooks/useFetchData';
import { BalanceData } from '../../types/E-Wallet';

type TFormTopUp = {
  amount: number;
  notes?: string;
};

type PropsFormTopup = {
  pathUrl: string;
  isTfBa?: boolean;
};

const FormTopUp: React.FC<PropsFormTopup> = ({ pathUrl, isTfBa = false }) => {
  const { setProcessTransaction, transactions, user } = useAuth();
  const navigate = useNavigate();

  const { data } = useFetchData<BalanceData>('/user/getBalance', user?.token);

  const onFinish: FormProps<TFormTopUp>['onFinish'] = (values) => {
    setProcessTransaction({
      nominal: values.amount.toString(),
      notes: values.notes,
    });

    navigate(`${pathUrl}/tinjau`);
  };

  const onFinishFailed: FormProps<TFormTopUp>['onFinishFailed'] = (

  ) => {

  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        amount: +transactions?.transaction?.nominal || null,
        notes: transactions?.transaction?.notes || null,
      }}
    >
      <Form.Item
        name="amount"
        label="Nominal Transfer"
        rules={[
          {
            validator(_, value) {
              if (!value && value !== 0) {
                return Promise.reject(new Error('Nominal Tidak Boleh Kosong'));
              }
              if (isTfBa ? value < 1 : value < 10000) {
                return Promise.reject(
                  new Error(
                    isTfBa
                      ? 'Minimum transfer adalah 1, mohon isikan kembali'
                      : 'Minimum transfer adalah 10.000, mohon isikan kembali'
                  )
                );
              }
              if (data?.balance !== undefined && data.balance < value) {
                return Promise.reject(new Error('Saldo Tidak Cukup, mohon isikan kembali'));
              }
              return Promise.resolve();
            },
          },
        ]}
        required
      >
        <InputNumber<number>
          tabIndex={0}
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
        <Input tabIndex={0} type="text" placeholder="Masukkan Catatan (Opsional)" />
      </Form.Item>

      <Button
        type="primary"
        tabIndex={0}
        className="bg-primary-100 text-white w-full h-10 rounded-xl font-semibold text-body-small md:text-heading-6 md:h-[60px]"
        htmlType="submit"
      >
        Lanjutkan
      </Button>
    </Form>
  );
};

export default FormTopUp;
