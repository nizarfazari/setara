import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcumb";
import { Button, Input } from "antd";
import { useAuth } from "../../hooks/useAuth";

const QR = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [nominal, setNominal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/qrberhasil');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNominal(e.target.value);
  };

  const handleSubmit = () => {
    if (!isSubmitting) {
      localStorage.setItem('nominal', nominal);
      setIsSubmitting(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="my-[30px]">
          <div className="mb-5">
            <Breadcrumb title="Show QRIS" subtitle="Tunjukkan QR untuk menerima transfer" />
          </div>
          <div className="lg:flex">
            <div className="w-[200px] lg:w-[340px] mx-auto">
              <img src="/images/QR.svg" alt="kode QR" />
              <p className="text-caption-large text-center mt-2">QR berlaku untuk 1x transaksi</p>
              <Button
                onClick={() => navigate(`/qrberhasil`)}
                aria-label="Regenerate QR"
                className="mt-4 border-primary-100 text-primary-100 w-full h-4 rounded-xl mb-3 font-semibold text-caption-small md:mb-6 md:text-heading-6 md:h-[60px] hover:bg-primary-200"
              >
                Regenerate QR
              </Button>
            </div>
            <div className="p-5 lg:w-[45%] text-primary-100">
              <h5 className="font-bold mb-3 text-body-small md:text-heading-5">Sumber Rekening</h5>
              <div className="flex items-center mt-2">
                <img className="w-[70px] mr-4" src={user?.user.image_path} alt="" style={{ width: "50px" }} />
                <div className="text-[12px] md:text-[14px]">
                  <p className="text-body-large font-bold">{user?.user.name}</p>
                  <div className="flex items-center">
                    <p className="text-caption-large ">{user?.user.bank_name}</p>
                    <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png" alt="dot" />
                    <p className="text-caption-large ">{user?.user.account_number}</p>
                  </div>
                </div>
              </div>
              <div className="my-6">
                <label htmlFor="Nominal Dana">Masukan Nominal (opsional)</label>
                <Input
                  type="text"
                  placeholder="Masukan Nominal"
                  value={nominal}
                  onChange={handleNominalChange}
                />
              </div>
              <Button
                onClick={handleSubmit}
                aria-label="Tetapkan Nominal"
                className={`bg-primary-100 text-white w-full h-10 rounded-xl mb-3 font-semibold text-body-small md:mb-6 md:text-heading-6 md:h-[60px] hover:bg-primary-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                Tetapkan Nominal
              </Button>
            </div>
          </div>
          <div className="lg:flex gap-3 mb-10 lg:px-28">
            <Button
              type="primary"
              className="text-body-small md:text-heading-6 bg-primary-300 text-primary-100 font-bold h-10 w-full mt-5 lg:mt-10 rounded-lg py-6"
              aria-label="Kembali Ke Homepage"
              onClick={() => navigate('/')}
            >
              Kembali Ke Homepage
            </Button>
            <Button
              type="primary"
              className="text-body-small md:text-heading-6 bg-primary-100 h-10 w-full mt-5 lg:mt-10 rounded-lg py-6"
              aria-label="Bagikan Kode QR"
            >
              Bagikan Kode QR
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QR;
