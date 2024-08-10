import { useEffect, useRef, useState } from "react";
import iconTransFav from "/images/homepage/icon-trans-fav.png";
import iconTopupFav from "/images/homepage/icon-ewallet-fav2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowDown,
  ArrowUp,
} from "@phosphor-icons/react";
import { useAuth } from "../../hooks/useAuth";
import axios, { AxiosError } from "axios";
import InfoSaldo from "../../components/InfoSaldo";
import FavoriteLoading from "../../components/FavoriteLoading";
import { CombinedItem, MonthlyReport } from "../../types";


const data = {
  transactionsPerMonth: [
    { month: "Januari 2024", monthNumber: 1 },
    { month: "Februari 2024", monthNumber: 2 },
    { month: "Maret 2024", monthNumber: 3 },
    { month: "April 2024", monthNumber: 4 },
    { month: "Mei 2024", monthNumber: 5 },
    { month: "Juni 2024", monthNumber: 6 },
    { month: "Juli 2024", monthNumber: 7 },
    { month: "Agustus 2024", monthNumber: 8 },
  ],
};

const Home = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(
    null
  );
  const [favorites, setFavorites] = useState<CombinedItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("Januari 2024");
  const { logout, user } = useAuth();

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const [response1, response2] = await Promise.all([
        axios.get<{
          data: { favorites: CombinedItem[] };
        }>(
          "https://setara-api-service-production.up.railway.app/api/v1/saved-accounts",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            timeout: 5000, // Duration in 5 seconds
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
            timeout: 5000, // Duration in 5 seconds
          }
        ),
      ]);

      const favoritesWithType = response1.data.data.favorites.map(
        (account) => ({
          ...account,
          type: "transfer" as const,
        })
      );

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
      console.log(response.data.data);
    } catch (error) {
      setError(error as AxiosError);
    }
  };

  const handleMonthChange = (key: number) => {
    const month = data.transactionsPerMonth[key].month;
    const monthNumber = data.transactionsPerMonth[key].monthNumber;
    setSelectedMonth(month);
    fetchMonthlyReport(monthNumber, "2024");
  };

  useEffect(() => {
    const transactions = data.transactionsPerMonth.find(
      (transaction) => transaction.month === selectedMonth
    );
    if (transactions) {
      fetchMonthlyReport(transactions.monthNumber, "2024");
    }
  }, [selectedMonth]);

  return (
    <div className="mx-auto container mt-5 mb-20">
      <h1
        aria-label={`Halo, ${user?.user.name}`}
        className="text-heading-5 font-bold text-primary-100"
      >
        <span>Halo, {user?.user.name}</span>
      </h1>
      <button onClick={() => logout()} aria-label="Log out">
        Log out
      </button>
      <div>
        <InfoSaldo />
      </div>
      <div className="pt-0 pb-3">
        {loading ? (
         <FavoriteLoading />
        ) : errorMessage ? (
          <p className="text-primary-100 text-body-large font-semibold">
            {errorMessage}
          </p>
        ) : favorites.length > 0 ? (
          <>
            <h1
              className="text-primary-100 text-heading-6 font-bold"
              aria-label="Transaksi Favorit"
            >
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
                    <div
                      className="border border-primary-300 shadow-lg rounded-lg xl:p-7 p-4"
                      role="group"
                      aria-label={`Transaksi favorit: ${
                        transaction.type === "transfer" ? "Transfer" : "Top Up"
                      }`}
                    >
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
                              ? "Ikon transfer favorit"
                              : "Ikon topup favorit"
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
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Slide sebelumnya"
                    aria-controls="swiper-container"
                    role="button"
                  >
                    <ArrowCircleLeft
                      size={25}
                      color="gray"
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Slide berikutnya"
                    aria-controls="swiper-container"
                    role="button"
                  >
                    <ArrowCircleRight
                      size={25}
                      color="gray"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Swiper>
            </div>
          </>
        ) : (
          <p className="text-primary-100 text-body-large font-semibold"></p>
        )}
      </div>

      <div>
        <h1
          className="text-primary-100 text-heading-6 font-bold py-3"
          aria-label="Catatan Keuangan"
        >
          Catatan Keuangan
        </h1>
        <div
          className="shadow-md p-5 border border-primary-300 rounded-xl"
          role="region"
          aria-labelledby="financial-records-title"
        >
          <div
            className="border rounded-lg max-w-[440px]"
            role="combobox"
            aria-expanded="false"
          >
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
                <Space
                  className="flex justify-between p-3"
                  aria-label={`Pilih bulan: ${selectedMonth}`}
                >
                  <p>{selectedMonth}</p>
                  <DownOutlined aria-hidden="true" />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div>
            <div
              className="rounded-lg my-6 flex justify-between justify-items-center gap-2"
              role="region"
              aria-labelledby="financial-summary-title"
            >
              <div
                className="border px-5 py-3 w-full rounded-lg"
                role="group"
                aria-labelledby="income-label"
              >
                <div className="flex gap-1">
                  <ArrowDown
                    weight="fill"
                    size={20}
                    className="text-green-600"
                    aria-hidden="true"
                  />

                  <p id="income-label">Pemasukan</p>
                </div>
                <h5
                  className="text-primary-100 font-bold text-heading-6 py-3"
                  aria-label={`Total pemasukan bulan ini: Rp${monthlyReport?.income.toLocaleString(
                    "id-ID"
                  )}`}
                >
                  Rp{monthlyReport?.income.toLocaleString("id-ID")}
                </h5>
              </div>
              <div
                className="border px-5 py-3 w-full rounded-lg"
                role="group"
                aria-labelledby="expense-label"
              >
                <div className="flex gap-1">
                  <ArrowUp
                    weight="fill"
                    size={20}
                    className="text-red-600"
                    aria-hidden="true"
                  />
                  <p id="expense-label">Pengeluaran</p>
                </div>
                <h5
                  className="text-primary-100 font-bold text-heading-6 py-3"
                  aria-label={`Total pengeluaran bulan ini: Rp${monthlyReport?.expense.toLocaleString(
                    "id-ID"
                  )}`}
                >
                  Rp{monthlyReport?.expense.toLocaleString("id-ID")}
                </h5>
              </div>
            </div>
            <div className="">
              <h5 id="balance-label">Selisih</h5>
              <h5
                className={`${
                  (monthlyReport?.total ?? 0) < 0
                    ? "text-red-500"
                    : "text-green-600"
                } text-heading-6 font-bold`}
                aria-label={`Selisih bulan ini: Rp${monthlyReport?.total.toLocaleString(
                  "id-ID"
                )}`}
              >
                Rp{monthlyReport?.total.toLocaleString("id-ID")}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
