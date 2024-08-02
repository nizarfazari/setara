import React, { ChangeEventHandler } from "react";
import { Button, Card, Form, Input } from "antd";
import { FormProps, useNavigate } from "react-router-dom";
import "./style.css";

type TDestinationNumber = {
  destinationNumber: string;
};

interface PropsDestinationNumber {
  pathUrl: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
  searchValue: string;
}

const DestinationNumber: React.FC<PropsDestinationNumber> = ({ pathUrl, onSearch, searchValue }) => {
  const navigate = useNavigate();

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
          <Input
            type="string"
            placeholder="Masukkan Nomor Tujuan"
            onChange={onSearch}
            value={searchValue}
          />
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
};

export default DestinationNumber;
