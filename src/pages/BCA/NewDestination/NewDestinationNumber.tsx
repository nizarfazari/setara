import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcumb";
import { useNavigate, useParams } from "react-router-dom";
import { capitalFirstLetter } from "../../../utils";
import { Button, Card, Checkbox, Flex, Form, Input, InputNumber, Select } from "antd";
const { Option } = Select;
const BASE_URL = 'https://setara-api-service-production.up.railway.app/api/v1'
import "./style.css";
import { CheckCircle } from "@phosphor-icons/react";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import axios from "axios";

export default function NewDestinationNumberPage() {
  const [form] = Form.useForm();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [destinationNumber, setDestinationNumber] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  
  const onFinish = (values: unknown) => {
    console.log("Success:", values);
    navigate(`/bca/${slug}/tinjau`, {
      state: {
        body: {
          "account_name": form.getFieldValue('name'),
          "destinationAccountNumber": destinationNumber,
          "amount": form.getFieldValue('amount'),
          "note": form.getFieldValue('notes'),
          "savedAccount": form.getFieldValue('savedList')
        }
      }
    });
    console.log(
      `DATA INI ${
        JSON.stringify({
          "destinationAccountNumber": destinationNumber,
          "amount": form.getFieldValue('amount'),
          "note": form.getFieldValue('notes'),
          "savedAccount": form.getFieldValue('savedList')
        })
      }`
    )
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const handleDestinationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinationNumber(e.target.value);
    if (e.target.value === "") {
      setIsVerified(false);
      form.resetFields();
    }
  };

  const getUser = localStorage.getItem('user');
  const token = JSON.parse(getUser!).token;
  const bank_name = JSON.parse(getUser!).user.bank_name;
  const account_number = JSON.parse(getUser!).user.account_number;

  const handleVerifiedNumber = async (norek: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/user/search-no-rek/${norek}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.code === 200) {
        setIsVerified(true);
        form.setFields([{ name: "name", value: response.data.data.name }]);
      } else {
        setIsVerified(false);
        form.setFields([{ name: "destinationNumber", errors: ["Nomor tidak terdaftar"] }]);
      }
    } catch (error) {
      console.log(error);
      setIsVerified(false);
      form.setFields([{ name: "destinationNumber", errors: ["Nomor tidak terdaftar"] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        `https://setara-api-service-production.up.railway.app/api/v1/user/getBalance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.data.balance);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

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
            label="Nomor Transfer Baru"
            rules={[{ required: true, message: "Nomor Tidak Boleh Kosong" }]}
            required
          >
            <div>
              <div className="flex items-center gap-2 flex-col md:flex-row md:gap-4">
                <Input type="number" placeholder="Masukkan Nomor" className="flex-[80%]" onChange={handleDestinationNumberChange} />
                <Button
                  onClick={() => handleVerifiedNumber(destinationNumber!)}
                  className="flex-[20%] bg-primary-100 text-white w-full py-[10px] rounded-xl font-semibold text-body-small md:text-heading-6 md:h-[60px]"
                >
                  Cari Nomor
                </Button>
              </div>
              {isLoading ? (
                <Flex gap={6} align="center" className="mt-6">
                  <Spin indicator={<LoadingOutlined spin />} size="large" />
                </Flex>
              ) : (
                isVerified !== null && (
                  <Flex gap={6} align="center" className="mt-6">
                    <CheckCircle size={18} weight="fill" color={isVerified ? "#12D79C" : "#FF4D4F"} />
                    <p className={`font-bold text-caption-small ${isVerified ? "text-[#12D79C]" : "text-secondary-100"}`}>
                      {isVerified ? "VERIFIED" : "UNVERIFIED"}
                    </p>
                  </Flex>
                )
              )}
            </div>
          </Form.Item>

          <Form.Item name="savedList" valuePropName="checked">
            <Checkbox className="text-neutral-300 font-bold text-caption-large">Masukkan ke Daftar Tersimpan</Checkbox>
          </Form.Item>

          <Form.Item name="name" label="Nama Transfer">
            <Input type="text" placeholder="Masukkan Nama" disabled={!isVerified} readOnly />
          </Form.Item>

          <Form.Item name="source" label="Sumber Rekening" required>
            <Select disabled={!isVerified} className="h-20" placeholder="Pilih Sumber Rekening">
              <Option value={balance}>
                {bank_name} {account_number} <br /> <span className="font-bold">{balance}</span>
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
              disabled={!isVerified}
            />
          </Form.Item>

          <Form.Item label="Catatan" name="notes">
            <Input type="text" placeholder="Masukkan Catatan (Opsional)" disabled={!isVerified} />
          </Form.Item>

          <Button
            className="bg-primary-100 text-white w-full h-10 rounded-xl font-semibold text-body-small md:text-heading-6 md:h-[60px]"
            htmlType="submit"
            disabled={!isVerified}
          >
            Lanjutkan
          </Button>
        </Form>
      </Card>
    </div>
  );
}
