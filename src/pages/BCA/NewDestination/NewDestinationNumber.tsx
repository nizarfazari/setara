import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcumb';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalFirstLetter, FormatCurrency } from '../../../utils';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
} from 'antd';
const { Option } = Select;
import './style.css';
import { CheckCircle } from '@phosphor-icons/react';
import { useFetchData } from '../../../hooks/useFetchData';
import { useAuth } from '../../../hooks/useAuth';
import { SearchBankRes, UserBalance } from '../../../types/Bank';
import { GetData } from '../../../utils/GetData';
import axios from 'axios';

type FieldType = {
  destinationNumber: number;
  amount: number;
  notes: string;
  name: string;
  savedList: boolean;
};

export default function NewDestinationNumberPage() {
  const [form] = Form.useForm();
  const { user, setProcessTransaction, setRecipients } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: userBalance } = useFetchData<UserBalance>(
    `/user/getBalance`,
    user?.token
  );

  const onFinish = (values: FieldType) => {
    setProcessTransaction({
      nominal: values.amount.toString(),
      notes: values.notes,
      isSavedAccount: values.savedList,
    });
    navigate(`/bca/${slug}/tinjau`);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  const handleDestinationNumberChange = () => {
    setIsVerified(false);
    form.resetFields(['name', 'number', 'notes', 'amount', 'source']);
  };

  const handleVerifiedNumber = async () => {
    if (form.getFieldValue('destinationNumber')) {
      setIsLoading(true);
      try {
        const response = await GetData<SearchBankRes>(
          `/user/search-no-rek/${form.getFieldValue('destinationNumber')}`,
          user?.token
        );

        if (response) {
          setIsVerified(true);
          setRecipients({
            nama: response.name,
            wallet: response.bank,
            bank: response.bank,
            account_number: '',
            numberDestination: response.no,
            imageUrl: response.image_path,
          });
          form.setFields([{ name: 'name', value: response.name }]);
          setIsLoading(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.code == 404) {
            setIsVerified(false);
            form.setFields([
              { name: 'destinationNumber', errors: ['NOMOR TIDAK TERDAFTAR'] },
            ]);
          }
        } else {
          // console.log('Error', error);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      form.setFields([
        { name: 'destinationNumber', errors: ['Nomor Tidak Boleh Kosong'] },
      ]);
    }
  };
  return (
    <div className="container">
      <div className="my-[30px]">
        <Breadcrumb
          title={capitalFirstLetter(slug)}
          subtitle="Masukan Nomor Tujuan dan Nominal Transfer"
        />
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
            rules={[{ required: true, message: 'Nomor Tidak Boleh Kosong' }]}
            required
            aria-label="Nomor Transfer Baru"
          >
            <div>
              <div className="flex items-center gap-2 flex-col md:flex-row md:gap-4">
                <Input
                  type="number"
                  placeholder="Masukkan Nomor"
                  className="flex-[80%]"
                  onChange={handleDestinationNumberChange}
                  aria-label="Input nomor transfer baru"
                />
                <Button
                  type="primary"
                  tabIndex={0}
                  onClick={handleVerifiedNumber}
                  className="flex-[20%] bg-primary-100 text-white w-full py-[10px] rounded-xl font-semibold text-body-small md:text-heading-6 md:h-[60px]"
                  aria-label="Cari Nomor"
                >
                  {isLoading ? <Spin /> : 'Cari Nomor'}
                </Button>
              </div>
              {isVerified && (
                <Flex
                  gap={6}
                  align="center"
                  className="mt-6"
                  aria-label="Nomor Terverifikasi"
                >
                  <CheckCircle
                    tabIndex={0}
                    size={18}
                    weight="fill"
                    color="#12D79C"
                  />
                  <p
                    tabIndex={0}
                    className="text-[#12D79C] font-bold text-caption-small"
                  >
                    VERIFIED
                  </p>
                </Flex>
              )}
            </div>
          </Form.Item>

          <Form.Item name="savedList" valuePropName="checked">
            <Checkbox
              className="text-neutral-300 font-bold text-caption-large"
              aria-label="Masukkan ke daftar tersimpan"
              tabIndex={0}
            >
              Masukkan ke Daftar Tersimpan
            </Checkbox>
          </Form.Item>

          <Form.Item name="name" label="Nama Transfer">
            <Input
              type="text"
              tabIndex={0}
              placeholder="Masukkan Nama"
              disabled={isVerified ? false : true}
              readOnly
              aria-label="Input nama penerima"
            />
          </Form.Item>

          <Form.Item name="source" label="Sumber Rekening" required>
            <Select
              disabled={isVerified ? false : true}
              className="h-20"
              placeholder="Pilih Sumber Rekening"
              aria-label="Pilih Sumber Rekening"
            >
              <Option
                value={user?.user.account_number}
                aria-label={`${user?.user.bank_name} ${
                  user?.user.account_number
                } ${FormatCurrency(userBalance?.balance)}`}
              >
                {`${user?.user.bank_name} ${user?.user.account_number}`} <br />{' '}
                <span tabIndex={0} className="font-bold">
                  {userBalance && FormatCurrency(userBalance?.balance)}
                </span>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Nominal Transfer"
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
              disabled={isVerified ? false : true}
              aria-label="Input Nominal Transfer"
            />
          </Form.Item>

          <Form.Item label="Catatan" name="notes">
            <Input
              type="text"
              placeholder="Masukkan Catatan (Opsional)"
              disabled={isVerified ? false : true}
              aria-label="Input Catatan"
            />
          </Form.Item>

          <Button
            type="primary"
            className="bg-primary-100 text-white w-full h-10 rounded-xl font-semibold text-body-small md:text-heading-6 md:h-[60px]"
            htmlType="submit"
            disabled={isVerified ? false : true}
            aria-label="Lanjutkan"
            role="button"
          >
            Lanjutkan
          </Button>
        </Form>
      </Card>
    </div>
  );
}
