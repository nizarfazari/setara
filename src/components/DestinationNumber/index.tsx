import React from "react";
import { Button, Card, Checkbox, Form, FormProps, Input } from "antd";
import "./style.css";

type TDestinationNumber = number;

export default function DestinationNumber() {
  const onFinish: FormProps<TDestinationNumber>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<TDestinationNumber>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="w-full border-white md:border-primary-300">
      <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          name="destinationNumber"
          label="Nomor Tujuan"
          rules={[{ required: true, message: "Nomor Tidak Boleh Kosong" }]}
          required
        >
          <Input type="number" placeholder="Masukkan Nomor Tujuan" />
        </Form.Item>
        <Form.Item>
          <Checkbox className="text-neutral-300 font-bold text-caption-large" onChange={(e) => console.log(e.target.checked)}>
            Masukkan ke Daftar Tersimpan
          </Checkbox>
        </Form.Item>

        <Button
          className="bg-primary-100 text-white w-full h-10 rounded-xl font-semibold text-body-small md:text-heading-6 md:h-[60px]"
          htmlType="submit"
        >
          Transfer ke Tujuan Baru
        </Button>
      </Form>
    </Card>
  );
}
