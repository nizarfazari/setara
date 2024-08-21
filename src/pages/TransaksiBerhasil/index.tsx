import  { useState } from 'react';
import { Button, Card, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FormatCurrency } from '../../utils';
import { ReactShareSocial } from 'react-share-social';

const TransaksiBerhasil = () => {
  const navigate = useNavigate();
  const { user, transactions, clearTransaction } = useAuth();

  const isTahapanBCA = transactions.recipients.wallet == 'Tahapan BCA';
  const isQRIS = transactions.recipients.bank == 'QRIS';
  const admin = isTahapanBCA || isQRIS ? 0 : 1000;
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);


  const onBackToHome = () => {
    clearTransaction();
    navigate('/');
  };

  const showShareModal = () => {
    setIsShareModalVisible(true);
  };

  const handleCancel = () => {
    setIsShareModalVisible(false);
  };

  return (
    <div className="container py-5 lg:py-[20px] pb-[50px]">
      <p className="text-heading-5 text-center font-bold pb-[15px]" tabIndex={0}>
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
            <p className="font-bold text-lg" tabIndex={0}>Pengirim</p>
            <div className="flex items-center mt-2">
              <img
                className="w-[70px] mr-4"
                src={user?.user.image_path}
                alt=""
              />
              <div>
                <p className="font-bold text-lg" tabIndex={0}>{user?.user.name}</p>
                <div className="flex items-center">
                  <p className="font-bold text-lg" tabIndex={0}>{user?.user.bank_name}</p>
                  <img
                    className="w-[6px] h-[6px] mx-2"
                    src="/images/icons/dot.png"
                  />
                  <p className="font-bold text-lg" tabIndex={0}>
                    {user?.user.account_number}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Konten Detail Transaksi */}
          <div className="my-2 mb-5">
            <p className="font-bold text-lg" tabIndex={0}>Penerima</p>
            <div className="flex items-center">
              <img
                className="w-[70px] mr-4"
                src={transactions.recipients.imageUrl}
                alt=""
              />
              <div>
                <p className="font-bold text-lg" tabIndex={0}>
                  {transactions.recipients.nama}
                </p>
                <div className="flex items-center">
                  <p className="font-bold text-lg" tabIndex={0}>
                    {transactions.recipients.wallet}
                  </p>
                  <img
                    className="w-[6px] h-[6px] mx-2"
                    src="/images/icons/dot.png"
                  />
                  <p className="font-bold text-lg" tabIndex={0}>
                    {transactions.recipients.numberDestination}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Konten Total */}
          <p tabIndex={0} className="font-bold text-lg">Detail</p>
          <div className="flex justify-between mt-4">
            <div className="text-neutral-300 font-normal">
              {isQRIS && <p className="font-bold text-lg" tabIndex={0}>Lokasi Merchant</p>}
              <p className="font-bold text-lg" tabIndex={0}>{isTahapanBCA || isQRIS ? 'Nominal Transfer' : 'Nominal Top Up'}</p>
              <p className="font-bold text-lg" tabIndex={0}>Biaya Admin</p>
              <p className="font-bold text-lg" tabIndex={0}>Catatan</p>
            </div>
            <div className="flex flex-col items-end">
              {isQRIS && <p className="font-bold text-lg" tabIndex={0}>{transactions.recipients.address}</p>}
              <p className="font-bold text-lg" tabIndex={0}>
                {FormatCurrency(transactions.transaction.nominal)}
              </p>
              <p className="font-bold text-lg" tabIndex={0}>{FormatCurrency(admin)}</p>
              <p className="font-bold text-lg" tabIndex={0}>
                {transactions.transaction.notes ? transactions.transaction.notes : '-'}
              </p>
            </div>
          </div>
          <hr className="border-neutral-300 my-2" />
          <div className="flex justify-between font-bold">
            <p className="font-bold text-lg" tabIndex={0}>Total</p>
            <p className="font-bold text-lg" tabIndex={0}>
              {FormatCurrency(+transactions.transaction.nominal + admin)}
            </p>
          </div>
        </Card>
      </div>
      <div className="flex gap-3 mb-10 lg:px-28">
        <Button
          tabIndex={0}
          onClick={onBackToHome}
          type="primary"
          className="bg-primary-300 text-primary-100 font-bold h-10 w-full mt-5 lg:mt-10 rounded-lg"
        >
          Kembali Ke Homepage
        </Button>
        <Button
          tabIndex={0}
          onClick={showShareModal}
          type="primary"
          className="bg-primary-100 h-10 w-full mt-5 lg:mt-10 rounded-lg"
        >
          Bagikan Bukti Transaksi
        </Button>
      </div>

      {/* Modal Share */}
      <Modal
        title="Bagikan Bukti Transaksi"
        visible={isShareModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <ReactShareSocial
          url={`${window.location.origin}/transaksi-berhasil`}
          title='Bukti Transfer'
          socialTypes={['facebook', 'twitter', 'linkedin', 'whatsapp']}
          onSocialButtonClicked={ data => console.log(data)} 
        />
      </Modal>
    </div>
  );
};

export default TransaksiBerhasil;
