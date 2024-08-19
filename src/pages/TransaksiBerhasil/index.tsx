import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FormatCurrency } from '../../utils';

const TransaksiBerhasil = () => {
  const navigate = useNavigate();
  const { user, transactions, clearTransaction } = useAuth();
  const isTahapanBCA = transactions.recipients.wallet == 'Tahapan BCA';
  const isQRIS = transactions.recipients.bank == 'QRIS';

  const admin = isTahapanBCA || isQRIS ? 0 : 100;

  const onBackToHome = () => {
    clearTransaction();
    navigate('/');
  };

  return (
    <div className="container py-5 lg:py-[20px] pb-[50px]">
      <p className="text-heading-5 text-center font-bold pb-[15px]">
        Transaksi Berhasil
      </p>

      <div className="lg:flex justify-center">
        <img
          className="w-[200px] lg:w-[400px] m-auto lg:h-[400px] my-4"
          src="/images/check-data.png"
          alt=""
        />
        <Card className="px-5 py-3 lg:w-[38%] text-primary-100 shadow-lg lg:mr-32">
          <div>
            <p className="font-bold text-lg">Pengirim</p>
            <div className="flex items-center mt-2">
              <img
                className="w-[70px] mr-4"
                src={user?.user.image_path}
                alt=""
              />
              <div>
                <p className="font-bold text-lg">{user?.user.name}</p>
                <div className="flex items-center">
                  <p className="font-bold text-lg">{user?.user.bank_name}</p>
                  <img
                    className="w-[6px] h-[6px] mx-2"
                    src="/images/icons/dot.png"
                  ></img>
                  <p className="font-bold text-lg">
                    {user?.user.account_number}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 mb-5">
            <p className="font-bold text-lg">Penerima</p>
            <div className="flex items-center">
              <img
                className="w-[70px] mr-4"
                src={transactions.recipients.imageUrl}
                alt=""
              />
              <div>
                <p className="font-bold text-lg">
                  {transactions.recipients.nama}
                </p>
                <div className="flex items-center">
                  <p className="font-bold text-lg">
                    {transactions.recipients.wallet}
                  </p>
                  <img
                    className="w-[6px] h-[6px] mx-2"
                    src="/images/icons/dot.png"
                  ></img>
                  <p className="font-bold text-lg">
                    {transactions.recipients.numberDestination}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="font-bold text-lg">Detail</p>
          <div className="flex justify-between mt-4">
            <div className="text-neutral-300 font-normal">
              {isQRIS && <p className="font-bold text-lg">Lokasi Merchant</p>}
              <p className="font-bold text-lg">{isTahapanBCA || isQRIS ? 'Nominal Transfer' : 'Nominal Top Up'}</p>
              <p className="font-bold text-lg">Biaya Admin</p>
              <p className="font-bold text-lg">Catatan</p>
            </div>
            <div className="flex flex-col items-end">
              {isQRIS && <p className="font-bold text-lg">{transactions.recipients.address}</p>}
              <p className="font-bold text-lg">
                {FormatCurrency(transactions.transaction.nominal)}
              </p>
              <p className="font-bold text-lg">{FormatCurrency(admin)}</p>
              <p className="font-bold text-lg">
                {transactions.transaction.notes
                  ? transactions.transaction.notes
                  : '-'}
              </p>
            </div>
          </div>
          <hr className="border-neutral-300 my-2" />
          <div className="flex justify-between font-bold">
            <p className="font-bold text-lg">Total</p>
            <p className="font-bold text-lg">
              {FormatCurrency(+transactions.transaction.nominal + admin)}
            </p>
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

export default TransaksiBerhasil;
