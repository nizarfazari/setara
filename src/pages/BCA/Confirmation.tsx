import { Button, Card } from 'antd';
import Breadcrumb from '../../components/Breadcumb';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FormatCurrency } from '../../utils';

const Konfirmasi = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { transactions, user } = useAuth();
  const admin = 0;

  return (
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb
        title="Konfirmasi"
        subtitle="Harap periksa kembali sebelum melakukan konfirmasi"
      ></Breadcrumb>
      <div className="md:flex text-primary-100 justify-between md:gap-5 lg:gap-10 mx-11 mt-6">
        <div>
          <div>
            <p className="font-bold text-lg" tabIndex={0} >Pengirim</p>
            <div className="flex items-center mt-2">
              <img
                className="w-[70px] mr-4"
                src={user?.user.image_path}
                alt=""
              />
              <div className="text-[12px] md:text-[14px]">
                <p className="font-bold text-lg" tabIndex={0} >{user?.user.name}</p>
                <div className="flex items-center">
                  <p className="font-bold text-lg" tabIndex={0} >{user?.user.bank_name}</p>
                  <img
                    className="w-[6px] h-[6px] mx-2"
                    src="/images/icons/dot.png"
                  ></img>
                  <p className="font-bold text-lg" tabIndex={0} >
                    {user?.user.account_number}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-5 mb-5">
            <p className="font-bold text-lg" tabIndex={0} >Penerima</p>
            <div className="flex items-center">
              <img
                className="w-[70px] mr-4"
                src={transactions.recipients.imageUrl}
                alt=""
              />
              <div className="text-[12px] md:text-[14px]">
                <p className="font-bold text-lg" tabIndex={0} >
                  {transactions.recipients.nama}
                </p>
                <div className="flex items-center">
                  <p className="font-bold text-lg" tabIndex={0} >
                    {transactions.recipients.bank}
                  </p>
                  <img
                    className="w-[6px] h-[6px] mx-2"
                    src="/images/icons/dot.png"
                  ></img>
                  <p className="font-bold text-lg" tabIndex={0} >
                    {transactions.recipients.numberDestination}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[50%]">
          <Card className="p-3 text-primary-100 shadow-lg">
            <p className="font-bold text-lg" tabIndex={0} >Detail</p>
            <div className="flex justify-between mt-4">
              <div className="text-neutral-300 font-normal">
                <p className="font-bold text-lg" tabIndex={0} >Nominal Top Up</p>
                <p className="font-bold text-lg" tabIndex={0} >Biaya Admin</p>
                <p className="font-bold text-lg" tabIndex={0} >Catatan</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-bold text-lg" tabIndex={0} >
                  {FormatCurrency(transactions.transaction.nominal)}
                </p>
                <p className="font-bold text-lg" tabIndex={0} >{FormatCurrency(admin)}</p>
                <p className="font-bold text-lg" tabIndex={0}>
                  {transactions.transaction.notes
                    ? transactions.transaction.notes
                    : '-'}
                </p>
              </div>
            </div>
            <hr className="border-neutral-300 my-2" />
            <div className="flex justify-between font-bold">
              <p className="font-bold text-lg" tabIndex={0} >Total</p>
              <p className="font-bold text-lg" tabIndex={0} >
                {FormatCurrency(+transactions.transaction.nominal + admin)}
              </p>
            </div>
          </Card>
          <Button
            tabIndex={0}
            onClick={() => navigate(`/bca/${slug}/konfirmasi`)}
            type="primary"
            className="bg-primary-100 h-10 w-full mt-5 lg:mt-10 rounded-lg"
          >
            Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Konfirmasi;
