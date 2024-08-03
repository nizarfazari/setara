import { useEffect, useRef, useState } from "react";
import profilpict from "/images/homepage/Ellipse 15.png";
import iconInfo from "/images/homepage/icon-info.png";
import iconTransfer from "/images/homepage/icon-transfer.png";
import iconEwallet from "/images/homepage/icon-ewallet.png";
import iconBuy from "/images/homepage/icon-buy.png";
import iconInvest from "/images/homepage/icon-invest.png";
import iconCardless from "/images/homepage/info-cardless.png";
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
import axios, { AxiosError } from "axios";

interface CombinedItem {
  id: string;
  owner_id: string;
  favorite: boolean;
  name: string;
  image_path: string;
  type: "transfer" | "topup";
  account_number?: string;
  bank_name?: string;
  account_name?: string;
  ewallet_user_id?: string;
  ewallet_user_phone_number?: string;
  ewallet_name?: string;
  ewallet_user_name?: string;
}

interface MonthlyReport {
  income: number;
  expense: number;
  total: number;
}

const Home = () => {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(
    null
  );
  const [favorites, setFavorites] = useState<CombinedItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("Januari 2024");

  const dots = new Array(7).fill(null);
  const { logout, user } = useAuth();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchFavorites = async () => {
    try {
      setLoading(true); // Start loading
      const [response1, response2] = await Promise.all([
        axios.get<{
          data: { favorites: CombinedItem[] };
        }>(
          "https://setara-api-service-production.up.railway.app/api/v1/saved-accounts",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            timeout: 5000, // 5-second timeout
          }
        ),
        axios.get<{
          data: { favorites: CombinedItem[] };
        }>(
          "https://setara-api-service-production.up.railway.app/api/v1/saved-ewallet-users",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            timeout: 5000, // 5-second timeout
          }
        ),
      ]);

      const favoritesWithType = response1.data.data.favorites.map((account) => ({
        ...account,
        type: "transfer" as const,
      }));

      const savedEwalletUsersWithType = response2.data.data.favorites.map(
        (ewalletUser) => ({
          ...ewalletUser,
          type: "topup" as const,
        })
      );

      const combinedData: CombinedItem[] = [
        ...favoritesWithType,
        ...savedEwalletUsersWithType,
      ];

      setFavorites(combinedData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          setErrorMessage("Belum ada transaksi akun favorit.");
        } else {
          setErrorMessage("Terjadi kesalahan saat mengambil data.");
        }
      } else {
        setErrorMessage("Terjadi kesalahan yang tidak terduga.");
      }
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchBalance = async () => {
    const token = user?.token;
    try {
      const response = await axios.get(
        `https://setara-api-service-production.up.railway.app/api/v1/user/getBalance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.data.balance);
    } catch (error) {
      setError(error as AxiosError);
    }
  };

  const fetchMonthlyReport = async (month: any, year: any) => {
    const token = user?.token;
    try {
      const response = await axios.get(
        `https://setara-api-service-production.up.railway.app/api/v1/transactions/getMonthlyReport`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { month, year },
        }
      );
      setMonthlyReport(response.data.data);
    } catch (error) {
      setError(error as AxiosError);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const data = {
    transactionsPerMonth: [
      {
        month: "Januari 2024",
      },
      {
        month: "Februari 2024",
      },
      {
        month: "Maret 2024",
      },
      {
        month: "April 2024",
      },
      {
        month: "Mei 2024",
      },
      {
        month: "Juni 2024",
      },
      {
        month: "Juli 2024",
      },
      {
        month: "Agustus 2024",
      },
    ],
  };

  const handleMonthChange = (key: number) => {
    const month = data.transactionsPerMonth[key].month;
    setSelectedMonth(month);
    const [monthName, year] = month.split(" ");
    const monthIndex =
      new Date(Date.parse(monthName + " 1, 2024")).getMonth() + 1;
    fetchMonthlyReport(monthIndex, year);
  };

  useEffect(() => {
    const [monthName, year] = selectedMonth.split(" ");
    const monthIndex =
      new Date(Date.parse(monthName + " 1, 2024")).getMonth() + 1;
    fetchMonthlyReport(monthIndex, year);
  }, [selectedMonth]);

  const getTransactionsForMonth = () => {
    const transactions = data.transactionsPerMonth.find(
      (transaction) => transaction.month === selectedMonth
    );
    return transactions;
  };

  const monthlyTransactions = getTransactionsForMonth();

  const formatNorek = (norek: string | number | undefined) => {
    if (typeof norek === "undefined") {
      return 0;
    }
    const str = norek.toString();

    if (str.length % 4 === 0) {
      return str;
    }
    return str.replace(/(.{4})/g, "$1-");
  };

  const copyToClipboard = () => {
    const accountNumber = user?.user?.account_number;

    if (accountNumber) {
      navigator.clipboard
        .writeText(accountNumber.toString())
        .then(() => {
          notification.success({
            message: "Success",
            description: "No. Rekening berhasil disalin",
            duration: 2, // Duration in seconds
          });
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    } else {
      notification.error({
        message: "Error",
        description: "No. Rekening tidak tersedia",
        duration: 2, // Duration in seconds
      });
    }
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  return (
    <div className="mx-auto container mt-5 mb-20">
      <h1 className="text-heading-5 font-bold text-primary-100">
        Halo, {user?.user.name}
      </h1>
      <button onClick={() => logout()}>Log out</button>
      <div className="my-3">
        <div className=" bg-primary-100 rounded-lg md:w-1/3 px-7 py-5">
          <h5 className="text-white font-bold text-heading-6 mb-7">
            Informasi Saldo Rekening
          </h5>
          <div className="flex gap-7 ">
            <img src={user?.user.avatar_path} className="w-16 h-16" />
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
                    ) : balance !== null ? (
                      <span>Rp {balance.toLocaleString("id-ID")}</span>
                    ) : (
                      <>
                        <Skeleton.Button
                          active
                          className="w-full h-7 col-span-full"
                          size="large"
                        />
                        <Skeleton.Button
                          active
                          className="w-full h-7 col-span-full"
                          size="large"
                        />
                      </>
                    )}
                  </h5>
                  <button onClick={toggleBalanceVisibility} className="">
                    {isBalanceHidden ? (
                      <span className="text-neutral-100">
                        <Eye weight="fill" />
                      </span>
                    ) : (
                      <span className="text-neutral-50">
                        <EyeSlash weight="fill" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-neutral-100 text-caption-small mt-3 flex gap-2 items-center">
                No. Rekening:
                <span className="font-bold text-caption-large">
                  {formatNorek(user?.user.account_number)}
                </span>
                <button onClick={copyToClipboard} className=" items-center ">
                  <CopySimple size={16} weight="fill" />
                </button>
              </p>
            </div>
          </div>
        </div>
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
      <div className="pt-0 pb-3">
      {loading ? ( 
        <div className="flex space-x-4 justify-center w-full">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="border border-primary-300 shadow-lg rounded-lg xl:p-7 p-4 w-full max-w-7xl"
            >
              <div className="animate-pulse flex flex-col space-y-3 w-full">
                <div className="flex gap-2 items-center py-1 px-2 w-20 h-5 bg-primary-100 rounded-3xl text-white text-caption-large"></div>
                <div className="bg-gray-400 h-5 rounded w-3/4"></div>
                <div className="bg-gray-400 h-5 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : errorMessage ? ( // Show error message if there's an error
        <p className="text-primary-100 text-body-large font-semibold">
          {errorMessage}
        </p>
      ) : favorites.length > 0 ? (
        <>
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
            >
              {favorites.map((transaction) => (
                <SwiperSlide key={transaction.id}>
                  <div className="border border-primary-300 shadow-lg rounded-lg xl:p-7 p-4">
                    <div
                      className={`flex gap-2 items-center py-1 px-2 w-20 bg-primary-100 rounded-3xl text-white text-caption-large`}
                    >
                      <img
                        src={
                          transaction.type === "transfer"
                            ? iconTransFav
                            : iconTopupFav
                        }
                        alt={
                          transaction.type === "transfer"
                            ? "transfav"
                            : "topupfav"
                        }
                        className="w-[10px] items-center h-[10px]"
                      />
                      <p className="text-caption-small">
                        {transaction.type === "transfer"
                          ? "Transfer"
                          : "Top Up"}
                      </p>
                    </div>
                    <h5 className="xl:text-body-large text-body-small pt-3 capitalize">
                      {transaction.type === "transfer"
                        ? "Transfer Antar BCA"
                        : `Top Up ${transaction.ewallet_name}`}
                    </h5>
                    <h5 className="text-primary-100 xl:text-heading-6 text-body-small font-semibold">
                      {transaction.type === "transfer"
                        ? transaction.account_name
                        : transaction.ewallet_user_name}
                    </h5>
                  </div>
                </SwiperSlide>
              ))}
              <div className="md:flex justify-center gap-3 pt-4 hidden">
                <button onClick={() => swiperRef.current?.slidePrev()}>
                  <ArrowCircleLeft size={25} color="gray" />
                </button>
                <button onClick={() => swiperRef.current?.slideNext()}>
                  <ArrowCircleRight size={25} color="gray" />
                </button>
              </div>
            </Swiper>
          </div>
        </>
      ) : (
        <p className="text-primary-100 text-body-large font-semibold">
       
        </p>
      )}
    </div>

      <div className="">
        <h1 className="text-primary-100 text-heading-6 font-bold py-3">
          Catatan Keuangan
        </h1>
        <div className="shadow-md p-5 border border-primary-300 rounded-xl">
          <div className="border rounded-lg max-w-[440px]">
            <Dropdown
              menu={{
                items: data.transactionsPerMonth.map((transaction, index) => ({
                  label: transaction.month,
                  key: index.toString(),
                })),
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
                    <ArrowUp
                      weight="fill"
                      size={20}
                      className="text-green-500"
                    />
                    <p>Pemasukan</p>
                  </div>
                  <h5 className="text-primary-100 font-bold text-heading-6 py-3">
                    Rp{monthlyReport?.income}
                  </h5>
                </div>
              </div>
              <div className="border px-5 py-3 w-full rounded-lg">
                <div className="flex gap-1">
                  <ArrowDown weight="fill" size={20} className="text-red-500" />
                  <p>Pengeluaran</p>
                </div>
                <h5 className="text-primary-100 font-bold text-heading-6 py-3">
                  Rp{monthlyReport?.expense}
                </h5>
              </div>
            </div>
            <div className="">
              <h5>Selisih</h5>
              <h5
                className={`${
                  (monthlyReport?.total ?? 0) < 0
                    ? "text-red-500"
                    : "text-green-500"
                } text-heading-6 font-bold`}
              >
                Rp{monthlyReport?.total}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
