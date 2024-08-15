import React, { useState } from 'react';
import { Button, Card, Flex, Form, Input } from 'antd';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { EwalletUser, ResponseEWallet } from '../../types/E-Wallet';
import CustomerList from '../CustomerList';
import { useAuth } from '../../hooks/useAuth';

interface PropsDestinationNumber {
  pathUrl: string;
  wallet: ResponseEWallet;
}

const DestinationNumber: React.FC<PropsDestinationNumber> = ({
  pathUrl,
  wallet,
}) => {
  const [filteredContact, setFilteredContact] = useState<EwalletUser[] | []>(
    []
  );
  const { setRecipients } = useAuth();
  const { slug } = useParams<{ slug: string }>();

  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == '') {
      setFilteredContact([]);
    } else {
      const dataWallet: EwalletUser[] = [...wallet.favorites, ...wallet.saved];

      const data = dataWallet.filter(
        (val) =>
          val.ewallet_user_phone_number.includes(e.target.value) ||
          val.ewallet_user_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      );

      if (data) {
        setFilteredContact(data);
      }
    }
  };

  return (
    <Card className="w-full border-white md:border-primary-300">
      <Button
        className="bg-primary-100 text-white w-full h-10 rounded-xl mb-3 font-semibold text-body-small md:mb-6 md:text-heading-6 md:h-[60px]"
        onClick={() => navigate(`${pathUrl}/nomor-tujuan-baru`)}
      >
        Transfer ke Tujuan Baru
      </Button>
      <Form layout="vertical">
        <Form.Item
          name="destinationNumber"
          label="Nomor Tujuan"
          className="mb-0"
          rules={[{ required: true, message: 'Nomor Tidak Boleh Kosong' }]}
          required
        >
          <Input
            type="text"
            placeholder="Cari Nomor Tujuan"
            onChange={handleSearch}
          />
        </Form.Item>
      </Form>

      <Flex className="mt-6" gap={12} vertical>
        <CustomerList
          header="Hasil Pencarian"
          contacts={filteredContact}
          setRecipients={setRecipients}
          pathUrl={`/e-wallet/${slug}`}
          nullMessage="Tidak ada hasil pencarian"
        />
      </Flex>
    </Card>
  );
};

export default DestinationNumber;
