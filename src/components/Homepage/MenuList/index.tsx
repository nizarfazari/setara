import { useEffect, useState } from 'react';
import iconInfo from '/images/homepage/info.svg';
import iconTransfer from '/images/homepage/tf-kartu.svg';
import iconEwallet from '/images/homepage/tf-e-wallet.svg';
import iconBuy from '/images/homepage/Pembelian.svg';
import iconInvest from '/images/homepage/investasi.svg';
import iconCardless from '/images/homepage/Cardless.svg';
import iconQR from '/images/homepage/scanqr.svg';
import { Button, Modal } from 'antd';
import {
  FormatCurrency,
  formatNorek,
  formattedTimeWithColon,
} from '../../../utils';
import { formattedDate } from '../../../utils';
import { useAuth } from '../../../hooks/useAuth';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const MenuList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState<number>();
  const [, setError] = useState<AxiosError | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchBalance = async () => {
    const token = user?.token;
    try {
      const response = await axios.get(
        `${process.env.VITE_API_URL}/user/getBalance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.data.balance);
    } catch (error) {
      setError(error as AxiosError);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [user?.token]);

  const handleFeatureClick = (feature: string) => {
    setFeedback(`Maaf, fitur ${feature} sedang dikembangkan`);
  };

  return (
    <>
      <div className="sr-only" aria-live="assertive">
        {feedback}
      </div>{' '}
      <div className="grid grid-cols-3 md:grid-cols-7 py-4 gap-y-4 rounded-lg border border-primary-300">
        <div tabIndex={0} className="text-center" aria-modal="true" aria-live="polite">
          <img
            src={iconInfo}
            onClick={showModal}
            alt="info"
            className="mx-auto w-16 p-3 shadow-md rounded-xl border border-primary-300 cursor-pointer"
          />
          <Modal
            open={isModalOpen}
            footer={
              <Button
                type="primary"
                onClick={handleCancel}
                className="w-full bg-primary-100 text-neutral-100 font-semibold"
                aria-label="Kembali ke beranda"
              >
                Kembali ke Beranda
              </Button>
            }
            onCancel={handleCancel}
            closable={false}
          >
            <h1 className="text-body-large text-primary-100 font-semibold text-center">
              Info Saldo
            </h1>
            
            <div className="border rounded-xl p-5 my-7 shadow-sm">
              <p
                className="text-primary-100"
                aria-label={`Tanggal saat ini: ${formattedDate}`}
              >
                {formattedDate}, {formattedTimeWithColon}
              </p>
              <p
                className="text-primary-100 font-semibold py-2"
                aria-label={`Nomor Rekening: ${String(
                  formatNorek(user?.user.account_number)
                )}`}
              >
                {formatNorek(user?.user.account_number)}
              </p>

              <p
                className="text-body-large font-semibold"
                aria-label={`${balance?.toLocaleString('id-ID')} Rupiah`}
              >
                {FormatCurrency(balance)}
              </p>
            </div>
          </Modal>
          <p className="pt-2">Info</p>
        </div>

        <div tabIndex={0} className="text-center" onClick={() => navigate('/bca')}>
          <img
            src={iconTransfer}
            alt="Transfer"
            aria-label="Transfer"
            className="mx-auto w-16 p-3 shadow-md cursor-pointer rounded-xl border border-primary-300"
          />
          <p className="pt-2">Transfer</p>
        </div>

        <div tabIndex={0}
          className="text-center"
          aria-label="E-wallet"
          onClick={() => navigate('/e-wallet')}
        >
          <img
            src={iconEwallet}
            alt="E-Wallet"
            className="mx-auto w-16 p-3 shadow-md rounded-xl border border-primary-300 cursor-pointer"
          />
          <p className="pt-2">E-Wallet</p>
        </div>

        <div tabIndex={0} className=" text-center" onClick={() => navigate('/qr')}>
          <img
            src={iconQR}
            alt="info"
            className="mx-auto w-16 p-3 shadow-md  rounded-xl border border-primary-300 cursor-pointer"
          />
          <p className="pt-2">Info QR</p>
        </div>

        <button
          type="button"
          className="text-center"
          aria-label="Pembelian"
          onClick={(e) => {
            e.preventDefault();
            handleFeatureClick('Pembelian');
          }}
        >
          <img
            src={iconBuy}
            alt="Pembelian"
            className="mx-auto bg-gray-200 w-16 p-3 shadow-md rounded-xl border border-primary-300 cursor-not-allowed"
          />
          <p className="pt-2">Pembelian</p>
        </button>

        <button
          className="text-center"
          aria-label="Investasi"
          onClick={(e) => {
            e.preventDefault();
            handleFeatureClick('Investasi');
          }}
        >
          <img
            src={iconInvest}
            alt="Investasi"
            className="mx-auto w-16 p-3 bg-gray-200 shadow-md rounded-xl border border-primary-300 cursor-not-allowed"
          />
          <p className="pt-2">Investasi</p>
        </button>

        <button
          className="text-center"
          aria-label="Cardless"
          onClick={(e) => {
            e.preventDefault();
            handleFeatureClick('Cardless');
          }}
        >
          <img
            src={iconCardless}
            alt="Cardless"
            className="mx-auto w-16 p-3 bg-gray-200 shadow-md rounded-xl border border-primary-300 cursor-not-allowed"
          />
          <p className="pt-2">Cardless</p>
        </button>
      </div>
    </>
  );
};
