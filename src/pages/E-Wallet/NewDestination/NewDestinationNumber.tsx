import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcumb";
import { useNavigate, useParams } from "react-router-dom";
import { capitalFirstLetter } from "../../../utils";
import { Button, Card, Checkbox, Flex, Form, FormProps, Input, InputNumber, Select } from "antd";
const { Option } = Select;
import "./style.css";
import { CheckCircle } from "@phosphor-icons/react";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";

type FieldType = {
  destinationNumber: number;
};

export default function NewDestinationNumberPage() {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    navigate(`/e-wallet/${slug}/tinjau`);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const handleDestinationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setIsVerified(false);
      form.resetFields();
    }
  };

  const handleVerifiedNumber = async () => {
    if (form.getFieldValue("destinationNumber")) {
      try {
        const response = await axios.get(
          `https://setara-api-service-production.up.railway.app/api/v1/user/search-no-ewallet/${form.getFieldValue("destinationNumber")}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data = await response.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }

      const verified = true;
      if (verified) {
        setIsVerified(!isVerified);
        form.setFields([{ name: "name", value: "JOHN DOE" }]);
      } else {
        form.setFields([{ name: "destinationNumber", errors: ["NOMOR TIDAK TERDAFTAR"] }]);
      }
    } else {
      form.setFields([{ name: "destinationNumber", errors: ["Nomor Tidak Boleh Kosong"] }]);
    }
  };

  return (
    <div className="container">
      <div className="my-[30px]">
        <Breadcrumb title={capitalFirstLetter(slug)} subtitle="Masukan Nomor Tujuan dan Nominal Transfer" />
      </div>
      <Card className="w-full max-w-[690px] mx-auto border-white md:border-primary-300">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ savedList: false }}
        >
          <Form.Item
            name="destinationNumber"
            label="Nomor E-Wallet Baru"
            rules={[{ required: true, message: "Nomor Tidak Boleh Kosong" }]}
            required
          >
            <div>
              <div className="flex items-center gap-2 flex-col md:flex-row md:gap-4">
                <Input
                  type="number"
                  placeholder="Masukkan Nomor"
                  className="flex-[80%]"
                  onChange={handleDestinationNumberChange}
                />
                <Button
                  onClick={handleVerifiedNumber}
                  className="flex-[20%] bg-primary-100 text-white w-full py-[10px] rounded-xl font-semibold text-body-small md:text-heading-6 md:h-[60px]"
                >
                  Cari Nomor
                </Button>
              </div>
              {isVerified && (
                <Flex gap={6} align="center" className="mt-6">
                  <CheckCircle size={18} weight="fill" color="#12D79C" />
                  <p className="text-[#12D79C] font-bold text-caption-small">VERIFIED</p>
                </Flex>
              )}
            </div>
          </Form.Item>

          <Form.Item name="savedList" valuePropName="checked">
            <Checkbox className="text-neutral-300 font-bold text-caption-large">Masukkan ke Daftar Tersimpan</Checkbox>
          </Form.Item>

          <Form.Item name="name" label="Nama Nomor E-Wallet">
            <Input type="text" placeholder="Masukkan Nama" disabled={isVerified ? false : true} />
          </Form.Item>

          <Form.Item name="source" label="Sumber Rekening" required>
            <Select disabled={isVerified ? false : true} className="h-20" placeholder="Pilih Sumber Rekening">
              <Option value="Rp1.111.111">
                TAHAP BCA 289137645 <br /> <span className="font-bold">Rp1.111.111</span>
              </Option>
              <Option value="Rp2.222.222">
                TAHAP BCA 289137646 <br /> <span className="font-bold">Rp2.222.222</span>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Nominal Transfer"
            rules={[
              { required: true, message: "Nominal Tidak Boleh Kosong" },
              { type: "number", min: 10000, message: "Minimum transfer adalah 10.000, mohon isikan kembali" },
            ]}
            required
          >
            <InputNumber<number>
              type="number"
              prefix="Rp."
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              parser={(value) => value?.replace(/\.\s?|(,*)/g, "") as unknown as number}
              className="w-full px-[15px] py-3 md:px-6 md:py-4"
              placeholder="Masukkan Nominal"
              disabled={isVerified ? false : true}
            />
          </Form.Item>

          <Form.Item label="Catatan" name="notes">
            <Input type="text" placeholder="Masukkan Catatan (Opsional)" disabled={isVerified ? false : true} />
          </Form.Item>

          <Button
            className="bg-primary-100 text-white w-full h-10 rounded-xl font-semibold text-body-small md:text-heading-6 md:h-[60px]"
            htmlType="submit"
            disabled={isVerified ? false : true}
          >
            Lanjutkan
          </Button>
        </Form>
      </Card>
    </div>
  );
}
