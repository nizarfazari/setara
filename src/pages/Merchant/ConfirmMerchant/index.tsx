import { Button, Card } from 'antd';
import Breadcrumb from '../../../components/Breadcumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { FormatCurrency } from '../../../utils';

const Konfirmasi = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const transactionDetail = location.state?.transactionDetail;
  const amount = location.state?.amount;
  const notes = location.state?.notes;
  const admin = 0;

  return (
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb
        title="Konfirmasi"
        subtitle="Harap periksa kembali sebelum melakukan konfirmasi"
      />
      <div className="md:flex text-primary-100 justify-between md:gap-5 lg:gap-10 mx-11 mt-6">
        <div>
          <div className="my-5 mb-5">
            <p className="font-bold text-lg">Penerima</p>
            <div className="flex items-center">
              <img
                className="w-[70px] mr-4"
                src={transactionDetail?.data.image_path}
                alt="Penerima"
              />
              <div className="text-[12px] md:text-[14px]">
                <p className="font-bold text-lg">
                  {transactionDetail?.data.name}
                </p>
                <div className="flex items-center">
                  <p className="font-bold text-lg">
                    {transactionDetail?.data.terminal_id}
                  </p>
                  <img
                    className="w-[6px] h-[6px] mx-2"
                    src="/images/icons/dot.png"
                    alt="Dot"
                  />
                  <p className="font-bold text-lg">
                    {transactionDetail?.data.nmid}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold text-lg">Pengirim</p>
            <div className="flex items-center mt-2">
              <img
                className="w-[70px] mr-4"
                src={user?.user.image_path}
                alt="Pengirim"
              />
              <div className="text-[12px] md:text-[14px]">
                <p className="font-bold text-lg">{user?.user.name}</p>
                <div className="flex items-center">
                  <p className="font-bold text-lg">{user?.user.bank_name}</p>
                  <img
                    className="w-[6px] h-[6px] mx-2"
                    src="/images/icons/dot.png"
                    alt="Dot"
                  />
                  <p className="font-bold text-lg">
                    {user?.user.account_number}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[50%]">
          <Card className="mt-5 p-3 text-primary-100 shadow-lg">
            <p className="font-bold text-lg">Detail</p>
            <div className="flex justify-between mt-4">
              <div className="text-neutral-300 font-normal">
                <p className="font-bold text-lg">Nominal Top Up</p>
                <p className="font-bold text-lg">Biaya Admin</p>
                <p className="font-bold text-lg">Catatan</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-bold text-lg">{FormatCurrency(amount)}</p>
                <p className="font-bold text-lg">{FormatCurrency(admin)}</p>
                <p className="font-bold text-lg">{notes || '-'}</p>
              </div>
            </div>
            <hr className="border-neutral-300 my-2" />
            <div className="flex justify-between font-bold">
              <p className="font-bold text-lg">Total</p>
              <p className="font-bold text-lg">
                {FormatCurrency(amount + admin)}
              </p>
            </div>
          </Card>

          <Button
            onClick={() => navigate(`/confirmpayqrmpin`)}
            type="primary"
            className="bg-primary-100 h-10 w-full mt-5 lg:mt-10 rounded-lg"
          >
            Konfirmasi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Konfirmasi;
