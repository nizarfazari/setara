import { Button, Card, Spin } from 'antd';
import Breadcrumb from '../../components/Breadcumb';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
import { useAuth } from '../../hooks/useAuth';
import { FormatCurrency } from '../../utils';
import { useState } from 'react';
import { GetData } from '../../utils/GetData';

type TransactionDetail = {
  sender: {
    name: string;
    account_number: string;
    image_path: string;
    vendor_name: string;
  };
  receiver: {
    name: string;
    account_number: string;
    image_path: string;
    vendor_name: string;
  };
  amount: number;
  admin_fee: number;
  total_amount: number;
  note: string;
};

const BuktiTransfer = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  console.log(id);
  const { user } = useAuth();
  const { data } = useFetchData<TransactionDetail>(
    `/transactions/get-mutation-detail/${id}`,
    user?.token
  );
  console.log(data);
  const onDownloadFile = async () => {
    setLoading(true);
    try {
      const blob = (await GetData<Blob>(
        `/transactions/generate-receipt/${id}`,
        user?.token,
        true
      )) as Blob;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Mutasi_Rekening.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb
        title="Bukti Transfer"
        subtitle="Periksa Rincian Keuangan Anda"
      />
      <div className="lg:flex">
        <img
          className="w-[200px] lg:w-[521px] mx-auto my-4"
          src="/images/check-data.png"
          alt=""
        />
        <Card className="p-5 lg:w-[45%] text-primary-100 shadow-lg">
          <div>
            <p className="font-bold text-lg">Pengirim</p>
            <div className="flex items-center mt-2">
              <img
                className="w-[70px] mr-4"
                src={data?.sender?.image_path}
                alt=""
              />
              <div>
                <p className="font-bold text-lg">{data?.sender?.name}</p>
                <div className="flex items-center">
                  <p className="font-bold text-lg">
                    {data?.sender?.vendor_name}
                  </p>
                  <img
                    className="w-[6px] h-[6px] mx-2"
                    src="/images/icons/dot.png"
                  ></img>
                  <p className="font-bold text-lg">
                    {data?.sender?.account_number}
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
                src={data?.receiver?.image_path}
                alt=""
              />
              <div>
                <p className="font-bold text-lg">{data?.receiver?.name}</p>
                <div className="flex items-center">
                  <p className="font-bold text-lg">
                    {data?.receiver?.vendor_name}
                  </p>
                  <img
                    className="w-[6px] h-[6px] mx-2"
                    src="/images/icons/dot.png"
                  ></img>
                  <p className="font-bold text-lg">
                    {data?.receiver?.account_number}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="font-bold text-lg">Detail</p>
          <div className="flex justify-between mt-4">
            <div className="text-neutral-300 font-normal">
              <p className="font-bold text-lg">Nominal Top Up</p>
              <p className="font-bold text-lg">Biaya Admin</p>
              <p className="font-bold text-lg">Catatan</p>
            </div>
            <div>
              <p className="font-bold text-lg">
                {FormatCurrency(data?.amount)}
              </p>
              <p className="font-bold text-lg">
                {FormatCurrency(data?.admin_fee)}
              </p>
              <p className="font-bold text-lg">{data?.note || '-'}</p>
            </div>
          </div>
          <hr className="border-neutral-300 my-2" />
          <div className="flex justify-between font-bold">
            <p className="font-bold text-lg">Total</p>
            <p className="font-bold text-lg">
              {FormatCurrency(data?.total_amount)}
            </p>
          </div>
        </Card>
      </div>
      <Button
        onClick={onDownloadFile}
        type="primary"
        className="bg-primary-100 h-10 w-full md:w-[33%] md:ml-[33.5%] mt-5 lg:mt-10 rounded-lg"
        disabled={loading}
      >
        {loading ? <Spin /> : 'Download Bukti Transfer'}
      </Button>
    </div>
  );
};

export default BuktiTransfer;
