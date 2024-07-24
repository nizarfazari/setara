import { Button, Form, FormProps, Input, InputNumber } from "antd";
import { useNavigate, useParams } from "react-router-dom";

type TFormTopUp = {
  amount: number;
  notes?: string;
};

export default function FormTopUp() {

  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const onFinish: FormProps<TFormTopUp>["onFinish"] = (values) => {
    console.log("Success:", values);

    navigate(`/bca/${slug}/tinjau`)
  };

  const onFinishFailed: FormProps<TFormTopUp>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        name="amount"
        label="Nominal Top Up"
        rules={[{ required: true, message: "Nominal Tidak Boleh Kosong" }, { type: "number", min: 10000, message: "Minimum transfer adalah 10.000, mohon isikan kembali" }]}
        required
      >
        <InputNumber<number>
          prefix="Rp."
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          parser={(value) => value?.replace(/\.\s?|(,*)/g, "") as unknown as number}
          className="w-full px-[15px] py-3 md:px-6 md:py-4"
          placeholder="Masukkan Nominal Top Up"
        />
      </Form.Item>

      <Form.Item label="Catatan" name="notes">
        <Input type="string" placeholder="Masukkan Catatan (Opsional)" />
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
