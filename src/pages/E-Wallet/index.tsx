import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcumb';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Skeleton } from 'antd';
import { useFetchData } from '../../hooks/useFetchData';
import { EWallets } from '../../types/E-Wallet';

const TransferWallet: React.FC = () => {
  const { user, setTransactionId } = useAuth();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleWalletClick = (id: string) => {
    setSelectedWallet(id);
    setTransactionId(id);
  };

  const { data, isLoading, isError } = useFetchData<EWallets[]>(
    `/vendor/ewallets`,
    user?.token
  );

  console.log(isError);

  return (
    <div className="container my-[30px]">
      <Breadcrumb
        title="E-Wallet"
        subtitle="Silahkan Pilih E-Wallet yang ingin Anda Transfer"
      />
      <div className="card shadow-2xl py-[32px] sm:px-[64px] px-[50px] rounded-xl lg:mt-14">
        <div className="e-wallet flex flex-wrap sm:justify-evenly justify-center items-start gap-8 min-h-[160px] min-w-[160px]">
          {data?.map((item: EWallets) => (
            <Link
              to={`/e-wallet/${item.name}`}
              key={item.id}
              className="text-center flex flex-col items-center"
            >
              <div
                onClick={() => handleWalletClick(item.id)}
                className={`flex justify-center shadow-inner mb-3 ${
                  selectedWallet === item.id
                    ? 'bg-primary-100'
                    : 'bg-primary-300'
                } rounded-2xl sm:h-[120px] h-[75px] sm:w-[120px] w-[75px] mx-auto items-center cursor-pointer`}
              >
                <img
                  src={item.image_path}
                  alt={item.name}
                  className="sm:w-[60px] sm:h-[60px] w-[40px] h-[40px]"
                />
              </div>
              <h1 className="sm:text-heading-6 sm:bg-black-400 sm:font-bold font-semibold text-[12px] leading-[16px]">
                {item.name}
              </h1>
            </Link>
          ))}
          {isLoading &&
            [1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex flex-col gap-4 self-center">
                <Skeleton.Image active className="m-auto" />
                <Skeleton.Input active size="small" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TransferWallet;
