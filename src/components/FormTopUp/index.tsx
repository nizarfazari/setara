import { Button, Form, FormProps, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type TFormTopUp = {
  amount: number;
  notes?: string;
};

type PropsFormTopup = {
  pathUrl: string;
  isTfBa?: boolean
}

const FormTopUp: React.FC<PropsFormTopup> = ({ pathUrl, isTfBa = false }) => {
  const { setProcessTransaction, transactions } = useAuth()
  const navigate = useNavigate();


  const onFinish: FormProps<TFormTopUp>["onFinish"] = (values) => {
    setProcessTransaction({
      nominal: values.amount.toString(),
      notes: values.notes,
      isSavedAccount: true,
    })

    navigate(`${pathUrl}/tinjau`)
  };

  const onFinishFailed: FormProps<TFormTopUp>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}
      initialValues={{
        amount: +transactions?.transaction?.nominal || null,
        notes: transactions?.transaction?.notes || null,
      }}
    >
      <Form.Item
        name="amount"
        label="Nominal Top Up"
        rules={[
          { required: true, message: "Nominal Tidak Boleh Kosong" },
          () => ({
            validator(_, value) {
              if (isTfBa ? value >= 1 : value >= 10000) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(isTfBa ? "Minimum transfer adalah 1, mohon isikan kembali" : "Minimum transfer adalah 10000, mohon isikan kembali"));
            },
          }),
        ]}
        required
      >
        <InputNumber<number>
          type="text"
          prefix="Rp."
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          parser={(value) => value?.replace(/\.\s?|(,*)/g, "") as unknown as number}
          className="w-full px-[15px] py-3 md:px-6 md:py-4"
          placeholder="Masukkan Nominal"
        />
      </Form.Item>

      <Form.Item label="Catatan" name="notes">
        <Input type="text" placeholder="Masukkan Catatan (Opsional)" />
      </Form.Item>

      <Button
        className="bg-primary-100 text-white w-full h-10 rounded-xl font-semibold text-body-small md:text-heading-6 md:h-[60px]"
        htmlType="submit"
      >
        Lanjutkan
      </Button>
    </Form>
  );
}

export default FormTopUp