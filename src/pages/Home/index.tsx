import { useRef, useState } from "react";

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
import iconCopy from "../../assets/icons/ic_copy.svg";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Button, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, notification } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const dots = new Array(7).fill(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const data = {
    name: "Andika Putra",
    norek: 2892112321,
    balance: 5000000,
    income: 15000000,
    expenses: 10000000,
    avatar: profilpict,
    userTersimpan: [
      {
        id: 1,
        no_rekening: 34556534,
        type: "Transfer Antar Rekening BCA",
        name_bank: "BCA",
        name: "NASYILA HANI",
        isFavorite: true,
      },
      {
        id: 2,
        no_rekening: 34590534,
        name: "ADITYA SYARIF",
        type: "Transfer Antar Rekening BCA",
        name_bank: "BCA",
        isFavorite: true,
      },
      {
        id: 3,
        no_rekening: 89655644,
        name: "MAMAN ABDURAHMAN",
        type: "Top Up OVO",
        name_bank: "BCA",
        isFavorite: true,
      },
      {
        id: 4,
        no_rekening: 884556534,
        name: "DEWI PUSPITA",
        type: "Top Up OVO",
        name_bank: "BCA",
        isFavorite: true,
      },
      {
        id: 5,
        no_rekening: 987654321,
        name: "AGUS SUHENDRA",
        type: "Transfer Antar Rekening BCA",
        name_bank: "BCA",
        isFavorite: true,
      },
      {
        id: 6,
        no_rekening: 123456789,
        name: "SITI NURHALIZA",
        type: "Top Up GoPay",
        name_bank: "BCA",
        isFavorite: false,
      },
      {
        id: 7,
        no_rekening: 223344556,
        name: "ANDI WIBOWO",
        type: "Transfer Antar Rekening BCA",
        name_bank: "BCA",
        isFavorite: false,
      },
      {
        id: 8,
        no_rekening: 998877665,
        name: "RAHMAWATI",
        type: "Top Up DANA",
        name_bank: "BCA",
        isFavorite: false,
      },
      {
        id: 9,
        no_rekening: 554433221,
        name: "JOKO SUSILO",
        type: "Transfer Antar Rekening BCA",
        name_bank: "BCA",
        isFavorite: true,
      },
      {
        id: 10,
        no_rekening: 667788990,
        name: "KARTINI",
        type: "Top Up ShopeePay",
        name_bank: "ShopeePay",
        isFavorite: true,
      },
    ],
    transactionsPerMonth: [
      {
        month: "Januari 2024",
        income: 1000000,
        expenses: 500000,
        balance: 500000,
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
        balance: 1100000,
      },
      {
        month: "April 2024",
        income: 700000,
        expenses: 800000,
        balance: 100000,
      },
      {
        month: "Mei 2024",
        income: 1500000,
        expenses: 1900000,
        balance: 400000,
      },
    ],
    totalUsers: 10,
    totalFavorites: 6,
  };

  const [selectedMonth, setSelectedMonth] = useState("Januari 2024");

  const handleMonthChange = (key: number ) => {
    const month = data.transactionsPerMonth[key].month;
    setSelectedMonth(month);
  };

  const getTransactionsForMonth = () => {
    const transactions = data.transactionsPerMonth.find(
      (transaction) => transaction.month === selectedMonth
    );
    return transactions;
  };


  const formatNorek = (norek: string | number) => {
    const str = norek.toString();

    if (str.length % 4 === 0) {
      return str;
    }
    return str.replace(/(.{4})/g, '$1-');
  };

  const transactions = getTransactionsForMonth();

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(data.norek.toString())
      .then(() => {
        console.log("No. Rekening copied to clipboard");
        notification.success({
          message: "Success",
          description: "No. Rekening berhasil disalin",
          duration: 2, // durasi dalam detik
        });
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  return (
    <div className="mx-auto container mt-5 mb-20">
      <h1 className="text-heading-5 font-bold text-primary-100">
        Halo, {data.name}
      </h1>
      <div className="my-3">

        <div className=" bg-primary-100 rounded-lg md:w-1/3 px-7 py-5">
          <h5 className="text-white font-bold text-heading-6 mb-7">
            Informasi Saldo Rekening
          </h5>
          <div className="flex gap-7 ">
            <img src={profilpict} className="w-16 h-16" />
            <div>
              <div className="items-center">
                <h5 className="text-neutral-50">Total Saldo</h5>
                <div className="flex gap-2">
                  <h5 className="text-heading-6 font-semibold text-neutral-50">
                    {isBalanceHidden ? (
                      <span className="text-neutral-50 flex gap-0">
                        {dots.map((_, index) => (
                          <GoDotFill key={index} />
                        ))}
                      </span>
                    ) : (
                      `Rp ${data.balance.toLocaleString("id-ID")}`
                    )}
                  </h5>
                  <button onClick={toggleBalanceVisibility} className="">
                    {isBalanceHidden ? (
                      <span className="text-neutral-100">
                        <IoEye />
                      </span>
                    ) : (
                      <span className="text-neutral-50">
                        <IoEyeOff />
                      </span>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-neutral-100 text-caption-small mt-3">
                No. Rekening:
                <span className="font-bold text-caption-large ml-2">
                  {formatNorek(data.norek)}
                </span>
                <button className="ml-4">
                  <img onClick={copyToClipboard} src={iconCopy} />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <h1 className="text-primary-100 font-bold text-heading-6 py-3">
          Menu
        </h1>
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
                  {data.norek}
                </p>
                <p className="text-body-large font-semibold">
                  Rp {data.balance.toLocaleString("id-ID")}
                </p>
              </div>
            </Modal>
            <p className="pt-2">Info</p>
          </div>
          <div className=" text-center" onClick={() => navigate('/bca')}>
            <img
              src={iconTransfer}
              alt="info"
              className="mx-auto w-16 p-3 shadow-md  rounded-xl border border-primary-300 cursor-pointer "
            />
            <p className="pt-2">Transfer</p>
          </div>
          <div className=" text-center" onClick={() => navigate('/e-wallet')}>
            <img
              src={iconEwallet}
              alt="info"
              className="mx-auto w-16 p-3 shadow-md  rounded-xl border border-primary-300 cursor-pointer"
            />
            <p className="pt-2">E-Wallet</p>
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
          <div className=" text-center">
            <img
              src={iconCardless}
              alt="info"
              className="mx-auto w-16 p-3 shadow-md  rounded-xl border border-primary-300 cursor-pointer"
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
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {data.userTersimpan
              ?.filter((transaction) => transaction.isFavorite === true)
              .map((transaction) => (
                <SwiperSlide key={transaction.id}>
                  <div className="border border-primary-300 shadow-lg rounded-lg xl:p-7 p-4">
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
                    <h5 className="xl:text-body-large text-body-small pt-3">
                      {transaction.type}
                    </h5>
                    <h5 className="text-primary-100 xl:text-heading-6 text-body-small font-semibold">
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
        <div className="shadow-md p-5 border border-primary-300 rounded-xl">
          <div className="border rounded-lg max-w-[440px]">
            <Dropdown
              menu={{
                items: data.transactionsPerMonth.map(
                  (transaction, index) => ({
                    label: transaction.month,
                    key: index.toString(),
                  })
                ),
                onClick: (e) => handleMonthChange(+e.key),
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
            <div className="rounded-lg my-6 flex justify-between justify-items-center gap-2">
              <div className="border px-5 py-3 w-full rounded-lg">
                <div className="">
                  <div className="flex gap-1">
                    <span className="pt-1 text-green-400">
                      <FaArrowDown />
                    </span>
                    <p>Pemasukan</p>
                  </div>

                  <h5 className="text-primary-100 font-bold text-heading-6 py-3">
                    Rp{transactions?.income.toLocaleString("id-ID")}
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
                  Rp{transactions?.expenses.toLocaleString("id-ID")}
                </h5>
              </div>
            </div>
            <div className="">
              <h5>Selisih</h5>
              <h5
                className={`${(transactions?.balance ?? 0) < 0
                  ? "text-red-500"
                  : "text-green-500"
                  } text-heading-6 font-bold`}
              >
                Rp{transactions?.balance.toLocaleString("id-ID")}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
