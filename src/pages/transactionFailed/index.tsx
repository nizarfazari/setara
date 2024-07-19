import React from "react";
import image from "../../assets/error/Feeling sorry-pana 1.png";
import { Button } from "antd";

const TransactionFailed = () => {
  return (
    <div className="max-w-5xl mx-auto justify-center flex container py-10">
      <div className="text-center md:w-[600px]">
        <h1 className=" text-heading-6 md:text-heading-5 font-bold">Oops, Transaksi Gagal :(</h1>
        <p className="font-bold text-neutral-300">
          Transaksi anda gagal kami proses karena beberapa masalah teknis. Mohon
          coba kembali dalam beberapa saat.
        </p>
        <img src={image} className="mx-auto w-[273px] h-[300px]" />
        <button className="bg-primary-300 w-full p-3 rounded-2xl text-primary-100 font-bold">Kembali ke HomePage</button>
      </div>
    </div>
  );
};

export default TransactionFailed;
