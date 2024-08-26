import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcumb';
import { useNavigate } from 'react-router-dom';

const wallets = [
  {
    id: 1,
    isActive: true,
    name: 'Transfer Antar BCA',
    imgSrc: '/images/e-wallet/bca.png',
    slug: 'transfer-antar-bca',
  },
  {
    id: 2,
    isActive: false,
    name: 'Transfer ke Bank Lain',
    imgSrc: '/images/e-wallet/bank.png',
    slug: 'bca',
  },
  {
    id: 3,
    isActive: false,
    name: 'Transfer Proxy Address',
    imgSrc: '/images/e-wallet/proxy-address.png',
    slug: 'bca',
  },
  {
    id: 4,
    isActive: false,
    name: 'Virtual Account',
    imgSrc: '/images/e-wallet/virtual-account.png',
    slug: 'bca',
  },
  {
    id: 5,
    isActive: false,
    name: 'Sakuku',
    imgSrc: '/images/e-wallet/sakuku.png',
    slug: 'bca',
  },
  {
    id: 6,
    isActive: false,
    name: 'Impor Daftar Transfer',
    imgSrc: '/images/e-wallet/import-daftar-tf.png',
    slug: 'bca',
  },
];

const Transfer: React.FC = () => {
  const [selectedWallet, setSelectedWallet] = useState<number | null>(null);
  const navigate = useNavigate();

  // Function to play speech
  const playSpeech = (message: string) => {
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
  };

  const handleWalletClick = (
    id: number,
    navigateTo: string,
    isActive: boolean
  ) => {
    if (isActive) {
      setSelectedWallet(id);
      navigate(navigateTo);
    } else {
      playSpeech('Maaf, fitur sedang dikembangkan');  
    }
  };

  return (
    <div className="container my-[30px]">
      <Breadcrumb title="Transfer" subtitle="Silahkan Pilih Jenis Transfer" />
      <div className="card shadow-2xl py-[32px] sm:px-[64px] px-[40px] rounded-xl lg:mt-14 flex">
        <div className="m-auto e-wallet flex flex-wrap sm:justify-evenly justify-center items-start gap-8 lg:gap-14 min-h-[160px] min-w-[160px]">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="text-center flex flex-col items-center w-[120px]"
            >
              <div
                onClick={() =>
                  handleWalletClick(
                    wallet.id,
                    `/bca/${wallet.slug}`,
                    wallet.isActive
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleWalletClick(wallet.id, `/bca/${wallet.slug}`, wallet.isActive);
                  }
                }}
                className={`flex justify-center shadow-inner mb-3 ${
                  selectedWallet === wallet.id
                    ? 'bg-primary-100'
                    : wallet.isActive
                    ? 'bg-primary-300 shadow-md'
                    : 'bg-gray-200 shadow-md'
                } rounded-2xl sm:h-[120px] h-[75px] sm:w-[120px] w-[75px] mx-auto items-center ${
                  wallet.isActive
                    ? 'cursor-pointer opacity-100'
                    : 'cursor-not-allowed opacity-50'
                }`}
                role="button"
                aria-live="polite"
                aria-disabled={!wallet.isActive ? 'true' : 'false'}
                tabIndex={0}
              >
                <img
                  className="w-[60px]"
                  src={wallet.imgSrc}
                  alt={wallet.name}
                />
              </div>
              <h1
                className={`sm:bg-black-400 font-bold text-[16px] leading-[16px] ${
                  !wallet.isActive ? 'text-gray-400' : ''
                }`}
              >
                {wallet.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transfer;
