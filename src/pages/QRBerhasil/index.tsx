import React from "react";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FormatCurrency } from "../../utils";

const QRBerhasil: React.FC = () => {
  const navigate = useNavigate();
  const { user, clearTransaction } = useAuth();
  const admin = 2500;
  const nominal = localStorage.getItem('nominal');

  const onBackToHome = () => {
    clearTransaction();
    navigate('/');
  };

  return (
    <div className="container py-5 lg:py-[20px] pb-[50px]">
      <p className="text-heading-5 text-center font-bold pb-[15px]">Dana Berhasil Ditransfer ke Rekening Anda</p>
      <div className="lg:flex justify-center">
        <img className="w-[200px] lg:w-[400px] m-auto lg:h-[400px] my-4" src="/images/check-data.png" alt="success" />
        <Card className="px-5 py-3 lg:w-[35%] text-primary-100 shadow-lg lg:mr-32">
          <div>
            <p className="font-bold mb-2">Penerima</p>
            <div className="flex items-center mt-2">
              <img className="w-[70px] mr-4" src={user?.user.image_path} alt="user avatar" />
              <div>
                <p className="font-bold">{user?.user.name}</p>
                <div className="flex items-center">
                  <p>{user?.user.bank_name}</p>
                  <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png" alt="dot icon" />
                  <p>{user?.user.account_number}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 mb-5">
            <p className="font-bold">Pengirim</p>
            <div className="flex items-center">
              <img className="w-[70px] mr-4" src="/images/felin.png" alt="sender avatar" />
              <div>
                <p className="font-bold">FELIN AGUSTIN</p>
                <div className="flex items-center">
                  <p>OVO</p>
                  <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png" alt="dot icon" />
                  <p>0812345267</p>
                </div>
              </div>
            </div>
          </div>
          <p className="font-bold">Detail</p>
          <div className='flex justify-between mt-4'>
            <div className="text-neutral-300 font-normal">
              <p>Nominal Top Up</p>
              <p>Biaya Admin</p>
              <p>Catatan</p>
            </div>
            <div>
              <p>{FormatCurrency(Number(nominal))}</p>
              <p>{FormatCurrency(admin)}</p>
              <p>-</p>
            </div>
          </div>
          <hr className='border-neutral-300 my-2' />
          <div className='flex justify-between font-bold'>
            <p>Total</p>
            <p>{FormatCurrency(Number(nominal) + admin)}</p>
          </div>
        </Card>
      </div>
      <div className="flex gap-3 mb-10 lg:px-28">
        <Button
          onClick={onBackToHome}
          type="primary"
          className="bg-primary-300 text-primary-100 font-bold h-10 w-full mt-5 lg:mt-10 rounded-lg"
        >
          Kembali Ke Homepage
        </Button>
        <Button
          onClick={() => navigate('/')}
          type="primary"
          className="bg-primary-100 h-10 w-full mt-5 lg:mt-10 rounded-lg"
        >
          Bagikan Bukti Transaksi
        </Button>
      </div>
    </div>
  );
};

export default QRBerhasil;
