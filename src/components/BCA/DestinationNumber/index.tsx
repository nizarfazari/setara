import React, { useState } from 'react';
import { Button, Card, Form, FormProps, Input } from 'antd';
import './style.css';
import { useNavigate } from 'react-router-dom';
import CustomerItem from '../CustomerItem';
import { BankUser, ResponseBank } from '../../../types/Bank';
import { Plus } from '@phosphor-icons/react';

type TDestinationNumber = {
  destinationNumber: number;
};

interface PropsDestinationNumber {
  pathUrl: string;
  bank: ResponseBank;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DestinationNumber: React.FC<PropsDestinationNumber> = ({
  pathUrl,
  bank,
  onSearch,
}) => {
  const [filteredContact, setFilteredContact] = useState<BankUser[]>([]);
  const navigate = useNavigate();

  const onFinish: FormProps<TDestinationNumber>['onFinish'] = (values) => {
    const dataBank: BankUser[] = [...bank.favorites, ...bank.saved];

    const data = dataBank.filter((val) =>
      val.account_number.includes(values.destinationNumber.toString())
    );

    if (data.length > 0) {
      setFilteredContact(data);
    }
  };

  return (
    <Card className="w-full border-white md:border-primary-300">
      <Button
        type="primary"
        className="bg-primary-100 text-white w-full h-10 rounded-xl mb-3 font-semibold text-body-small md:mb-6 md:text-heading-6 md:h-[60px]"
        onClick={() => navigate(`/${pathUrl}/nomor-tujuan-baru`)}
      >
        <Plus size={24} />
        Transfer ke Tujuan Baru
      </Button>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="destinationNumber"
          label="Nomor Tujuan"
          className="mb-0"
          rules={[{ required: true, message: 'Nomor Tidak Boleh Kosong' }]}
        >
          <Input
            type="string"
            placeholder="Cari Nomor Tujuan"
            onChange={onSearch}
          />
        </Form.Item>
      </Form>

      <div className="mt-6 flex flex-col gap-6">
        {filteredContact.map((contact, index) => (
          <Card
            id="contact-item"
            className="border-white lg:border-primary-300"
            onClick={() => navigate(`${pathUrl}/nominal-topup`)}
            key={index}
          >
            <CustomerItem {...contact} />
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default DestinationNumber;
