import { useState } from "react";
import Breadcrumb from "../../../components/Breadcumb";
import { useNavigate, useParams } from "react-router-dom";
import { capitalFirstLetter, FormatCurrency } from "../../../utils";
import { Button, Card, Checkbox, Flex, Form, FormProps, Input, InputNumber, Select, Spin } from "antd";
const { Option } = Select;
import "./style.css";
import { CheckCircle } from "@phosphor-icons/react";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { useFetchData } from "../../../hooks/useFetchData";
import { postData } from "../../../utils/GetData";
import { EWallets, SearchEWalletReq, SearchEWalletRes } from "../../../types/E-Wallet";

type FieldType = {
  destinationNumber: number;
  amount: number;
  notes: string;
  name: string;
  savedList: boolean;
};

type UserBalance = {
  balance: number;
  check_time: string;
}

export default function NewDestinationNumberPage() {
  const [form] = Form.useForm();
  const { user, setProcessTransaction, setRecipients } = useAuth();
  const { slug } = useParams<{ slug: string | undefined }>();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: userBalance } = useFetchData<UserBalance>(`/user/getBalance`, user?.token);
  const { data: ewallets } = useFetchData<EWallets[]>(`/vendor/ewallets`, user?.token);

  // get specific ewallet id based on slug
  const ewalletId = ewallets?.filter((item: { name: string }) => item.name.toLowerCase() == slug?.toLowerCase())[0].id;

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setProcessTransaction({
      nominal: values.amount.toString(),
      notes: values.notes,
      isSavedAccount: values.savedList
    })
    navigate(`/e-wallet/${slug}/tinjau`);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const handleDestinationNumberChange = () => {
    setIsVerified(false);
    form.resetFields(["name", "number", "notes", "amount", "source"]);

  };

  const handleVerifiedNumber = async () => {
    if (form.getFieldValue("destinationNumber")) {
      setIsLoading(true);
      try {
        const response = await postData<SearchEWalletReq, SearchEWalletRes>(
          '/user/search-no-ewallet',
          {
            noEwallet: form.getFieldValue("destinationNumber"),
            ewalletId: ewalletId!,
          },
          user?.token
        );

        if (response.status) {
          setIsVerified(true);
          setRecipients({
            nama: response.data.name,
            wallet: response.data.bank,
            bank: '',
            account_number: '',
            numberDestination: response.data.no,
            imageUrl: response.data.image_path,
          })
          form.setFields([{ name: "name", value: response.data.name }]);
          setIsLoading(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.code == 404) {
            setIsVerified(false);
            form.setFields([{ name: "destinationNumber", errors: ["NOMOR TIDAK TERDAFTAR"] }]);
          }
        } else {
          console.log("Error", error);
        }
      } finally {
        setIsLoading(false);
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
                  {isLoading ? <Spin /> : "Cari Nomor"}
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
            <Input type="text" placeholder="Masukkan Nama" disabled={isVerified ? false : true} readOnly />
          </Form.Item>

          <Form.Item name="source" label="Sumber Rekening" required>
            <Select disabled={isVerified ? false : true} className="h-20" placeholder="Pilih Sumber Rekening">
              <Option value={user?.user.account_number}>
                {`${user?.user.bank_name} ${user?.user.account_number}`} <br />{" "}
                <span className="font-bold">{userBalance && FormatCurrency(userBalance?.balance)}</span>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Nominal Transfer"
            rules={[
              { required: true, message: "Nominal Tidak Boleh Kosong" },
              { type: "number", min: 10000, message: "Minimum transfer adalah 10.000, mohon isikan kembali" },
              { type: "number", max: userBalance?.balance, message: "Saldo Tidak Cukup, mohon isikan kembali" },
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
