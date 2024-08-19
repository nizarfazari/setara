import { useEffect, useRef, useState } from "react";
import iconInfo from "/images/homepage/info.svg";
import iconTransfer from "/images/homepage/tf-kartu.svg";
import iconEwallet from "/images/homepage/tf-e-wallet.svg";
import iconBuy from "/images/homepage/Pembelian.svg";
import iconInvest from "/images/homepage/investasi.svg";
import iconCardless from "/images/homepage/Cardless.svg";
import iconqr from "/images/homepage/scanqr.svg";
import iconTransFav from "/images/homepage/icon-trans-fav.png";
import iconTopupFav from "/images/homepage/icon-ewallet-fav2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoDotFill } from "react-icons/go";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Button, Modal, Skeleton } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, notification } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowDown,
  ArrowUp,
  CopySimple,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import { useAuth } from "../../hooks/useAuth";
import { FavoriteTransaction } from "../../components/Homepage/FavoriteTransaction";
import InfoSaldo from "../../components/Homepage/InfoSaldo";
import { MenuList } from "../../components/Homepage/MenuList";
import { CatatanKeuangan } from "../../components/Homepage/CatatanKeuangan";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto container mt-5 mb-20">
      <h1
        aria-label={`Halo, ${user?.user.name}`}
        className="text-heading-5 font-bold text-primary-100"
      >
        <span>Halo, {user?.user.name}</span>
      </h1>
      <div>
        <InfoSaldo />
      </div>
      <div className="my-10">
        <h1 className="text-primary-100 font-bold text-heading-6 py-3">Menu</h1>
        <div className="grid grid-cols-3 md:grid-cols-6 py-4 gap-y-4 rounded-lg border border-primary-300 ">
          <div className=" text-center">
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
                  onClick={handleCancel}
                  className="w-full bg-primary-100 text-neutral-100 font-semibold"
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
                <p className="text-primary-100">12/07/2024</p>
                <p className="text-primary-100 font-semibold py-2">
                  {formatNorek(user?.user.account_number)}
                </p>
                <p className="text-body-large font-semibold">
                  Rp {balance?.toLocaleString("id-ID")}
                </p>
              </div>
            </Modal>
            <p className="pt-2">Info</p>
          </div>
          <div className=" text-center" onClick={() => navigate("/bca")}>
            <img
              src={iconTransfer}
              alt="info"
              className="mx-auto w-16 p-3 shadow-md  rounded-xl border border-primary-300 cursor-pointer "
            />
            <p className="pt-2">Transfer</p>
          </div>
          <div className=" text-center" onClick={() => navigate("/e-wallet")}>
            <img
              src={iconEwallet}
              alt="info"
              className="mx-auto w-16 p-3 shadow-md  rounded-xl border border-primary-300 cursor-pointer"
            />
            <p className="pt-2">E-Wallet</p>
          </div>
          <div className=" text-center" onClick={() => navigate("/qr")}>
            <img
              src={iconqr}
              alt="info"
              className="mx-auto w-16 p-3 shadow-md  rounded-xl border border-primary-300 cursor-pointer"
            />
            <p className="pt-2">QR</p>
          </div>
          <div className=" text-center">
            <img
              src={iconBuy}
              alt="info"
              className="mx-auto w-16 p-3 shadow-md  rounded-xl border border-primary-300 cursor-pointer"
            />
            <p className="pt-2">Pembelian</p>
          </div>
          <div className=" text-center">
            <img
              src={iconInvest}
              alt="info"
              className="mx-auto w-16 p-3 shadow-md  rounded-xl border border-primary-300 cursor-pointer"
            />
            <p className="pt-2">Investasi</p>
          </div>
        </div>
        <>
          <h1
            className="text-primary-100 text-heading-6 font-bold"
            aria-label="Transaksi Favorit"
          >
            Transaksi Favorit
          </h1>
          <FavoriteTransaction />
        </>
      </div>
      <div>
        <h1
          className="text-primary-100 text-heading-6 font-bold py-3"
          aria-label="Catatan Keuangan"
        >
          Catatan Keuangan
        </h1>
        <CatatanKeuangan />
      </div>
    </div>
  );
};

export default Home;
