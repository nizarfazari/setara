import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import profilpict from "../../assets/homepage/Ellipse 15.png";
import iconInfo from "../../assets/homepage/icon-info.png";
import iconTransfer from "../../assets/homepage/icon-transfer.png";
import iconEwallet from "../../assets/homepage/icon-ewallet.png";
import iconBuy from "../../assets/homepage/icon-buy.png";
import iconInvest from "../../assets/homepage/icon-invest.png";
import iconCardless from "../../assets/homepage/info-cardless.png";
import iconTransFav from "../../assets/homepage/icon-trans-fav.png";
import iconTopupFav from "../../assets/homepage/icon-ewallet-fav2.png";
import iconArrow from "../../assets/icons/ic_arrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from 'swiper';
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const Home = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const data = {
    name: "Andika Putra",
    norek: 289137654,
    balance: 5000000,
    income: 15000000,
    expenses: 10000000,
    avatar: profilpict,
    favoriteTransactions: [
      {
        id: 1,
        type: "Transfer Antar Rekening BCA",
        amount: 500000,
        date: "2024-07-01",
        name: "NASYILA HANI",
      },
      {
        id: 2,
        name: "ADITYA SYARIF",
        type: "Transfer Antar Rekening BCA",
        amount: 300000,
        date: "2024-07-03",
      },
      {
        id: 3,
        name: "MAMAN ABDURAHMAN",
        type: "Top Up OVO",
        amount: 200000,
        date: "2024-07-02",
      },
      {
        id: 4,
        name: "MBAPPE",
        type: "Top Up OVO",
        amount: 150000,
        date: "2024-07-04",
      },
    ],
    transactionsPerMonth: [
      {
        month: "Januari 2024",
        income: 1000000,
        expenses: 5000000,
        balance: -4000000,
      },
      {
        month: "Februari 2024",
        income: 1200000,
        expenses: 600000,
        balance: 600000,
      },
      {
        month: "Maret 2024",
        income: 1300000,
        expenses: 700000,
        balance: 600000,
      },
    ],
  };

  const [selectedMonth, setSelectedMonth] = useState("Januari 2024");

  const handleMonthChange = (key: any) => {
    const month = data.transactionsPerMonth[key].month;
    setSelectedMonth(month);
  };

  const getTransactionsForMonth = () => {
    const transactions = data.transactionsPerMonth.find(
      (transaction) => transaction.month === selectedMonth
    );
    return transactions;
  };

  const transactions = getTransactionsForMonth();

  return (
    <div className="md:max-w-7xl pt-5 mx-auto container">
      <h1 className="text-heading-5 font-bold text-primary-100">
        Halo, {data.name}
      </h1>
      <p className="text-primary-100 text">{data.norek}</p>
      <div className="py-3">
        <h5 className="text-primary-100 font-bold text-heading-6 py-3">
          Informasi Saldo Rekening
        </h5>
        <div className=" bg-primary-100 rounded-lg md:w-1/3">
          <div className="flex gap-7 p-5">
            <img src={data.avatar} className="w-16 h-16" />
            <div>
              <h5 className="text-neutral-50">Total Saldo</h5>
              <h5 className="text-heading-6 font-semibold text-neutral-50">
                {" "}
                Rp {data.balance.toLocaleString("id-ID")}
              </h5>
              <p className="text-neutral-100 text-caption-small">
                No. Rekening:{" "}
                <span className="font-semibold text-caption-large">
                  {data.norek}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="py-5">
          <h1 className="text-primary-100 font-bold text-heading-6 py-3">
            Menu
          </h1>
          <div className="grid grid-cols-3 md:grid-cols-6 p-4 gap-y-4 shadow-md rounded-lg">
            <div className=" text-center ">
              <img
                src={iconInfo}
                onClick={showModal}
                alt="info"
                className="mx-auto w-16 p-3 shadow-md"
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
                    {data.norek}
                  </p>
                  <p className="text-body-large font-semibold">
                    Rp {data.balance.toLocaleString("id-ID")}
                  </p>
                </div>
              </Modal>
              <p className="pt-2">Info</p>
            </div>
            <div className=" text-center">
              <img
                src={iconTransfer}
                alt="info"
                className="mx-auto w-16 p-3 shadow-md"
              />
              <p className="pt-2">Transfer</p>
            </div>
            <div className=" text-center">
              <img
                src={iconEwallet}
                alt="info"
                className="mx-auto w-16 p-3 shadow-md"
              />
              <p className="pt-2">E-Wallet</p>
            </div>
            <div className=" text-center">
              <img
                src={iconBuy}
                alt="info"
                className="mx-auto w-16 p-3 shadow-md"
              />
              <p className="pt-2">Pembelian</p>
            </div>
            <div className=" text-center">
              <img
                src={iconInvest}
                alt="info"
                className="mx-auto w-16 p-3 shadow-md"
              />
              <p className="pt-2">Investasi</p>
            </div>
            <div className=" text-center">
              <img
                src={iconCardless}
                alt="info"
                className="mx-auto w-16 p-3 shadow-md"
              />
              <p className="pt-2">Cardless</p>
            </div>
          </div>
        </div>
        <div className="pt-5 pb-3">
          <h1 className="text-primary-100 text-heading-6 font-bold">
            Transaksi Favorit
          </h1>
          <div className="py-3">
            <Swiper
              modules={[Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={15}
              slidesPerView={1.5}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                },
              }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {data.favoriteTransactions.map((transaction) => (
                <SwiperSlide key={transaction.id}>
                  <div className="border rounded-lg p-3">
                    <div
                      className={`flex gap-2 items-center py-1 px-2 w-20 bg-primary-100 rounded-3xl text-white text-caption-large`}
                    >
                      <img
                        src={
                          transaction.type.includes("Transfer")
                            ? iconTransFav
                            : iconTopupFav
                        }
                        alt={
                          transaction.type.includes("Transfer")
                            ? "transfav"
                            : "topupfav"
                        }
                        className="w-[10px] items-center h-[10px]"
                      />
                      <p className="text-caption-small">
                        {transaction.type.includes("Transfer")
                          ? "Transfer"
                          : "Top Up"}
                      </p>
                    </div>
                    <h5 className="text-caption-small pt-3">
                      {transaction.type}
                    </h5>
                    <h5 className="text-primary-100 text-caption-small font-semibold">
                      {transaction.name}
                    </h5>
                  </div>
                </SwiperSlide>
              ))}
              <div className="md:flex justify-center gap-3 pt-4 hidden">
                <button onClick={() => swiperRef.current?.slidePrev()}>
                  <img src={iconArrow} />
                </button>
                <button onClick={() => swiperRef.current?.slideNext()}>
                <img src={iconArrow} className="rotate-180" />
                </button>
              </div>
            </Swiper>
          </div>
        </div>
        <div className="">
          <h1 className="text-primary-100 text-heading-6 font-bold py-3">
            Catatan Keuangan
          </h1>
          <div className="shadow-md pb-5">
            <div className="mx-5 border rounded-lg">
              <Dropdown
                menu={{
                  items: data.transactionsPerMonth.map(
                    (transaction, index) => ({
                      label: transaction.month,
                      key: index.toString(),
                    })
                  ),
                  onClick: (e) => handleMonthChange(e.key),
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="flex justify-between p-3">
                    <p>{selectedMonth}</p>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <div>
              <div className="py-3 rounded-lg my-3 px-5 flex justify-between justify-items-center gap-2">
                <div className="border px-5 py-3 w-full rounded-lg">
                  <div className="">
                    <div className="flex gap-1">
                      <span className="pt-1 text-green-400">
                        <FaArrowDown />
                      </span>
                      <p>Pemasukan</p>
                    </div>

                    <h5 className="text-primary-100 font-bold text-heading-6 py-3">
                      Rp {transactions?.income.toLocaleString("id-ID")}
                    </h5>
                  </div>
                </div>
                <div className="border px-5 py-3 w-full rounded-lg">
                  <div className="flex gap-1">
                    <span className="pt-0.5 text-red-600">
                      <FaArrowUp />
                    </span>
                    <p>Pengeluaran</p>
                  </div>
                  <h5 className="text-primary-100 font-bold text-heading-6 py-3">
                    Rp {transactions?.expenses.toLocaleString("id-ID")}
                  </h5>
                </div>
              </div>
              <div className="items-center container">
                <h5>Selisih</h5>
                <h5
                  className={`${
                    (transactions?.balance ?? 0) < 0
                      ? "text-red-500"
                      : "text-green-500"
                  } text-heading-6 font-bold`}
                >
                  Rp {transactions?.balance.toLocaleString("id-ID")}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
