import image from "/images/error/Feeling sorry-pana 1.png";
import { useNavigate } from "react-router-dom";

const TransactionFailed = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center container mt-10">
      <div className="text-center md:w-[600px] mb-[50px]">
        <h1 className=" text-heading-6 md:text-heading-5 font-bold">Oops, Transaksi Gagal :(</h1>
        <p className="font-bold text-[14px] md:text-[16px] text-neutral-300 my-2">
          Transaksi anda gagal kami proses karena beberapa masalah teknis. Mohon
          coba kembali dalam beberapa saat.
        </p>
        <img src={image} className="mx-auto w-[240px] h-[240px]" />
        <button onClick={handleHome} className="bg-primary-300 w-full p-3 rounded-xl text-primary-100 font-bold mt-7">Kembali ke HomePage</button>
      </div>
    </div>
  );
};

export default TransactionFailed;
