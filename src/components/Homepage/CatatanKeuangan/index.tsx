import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import axios, { AxiosError } from "axios";
import { MonthlyReport } from "../../../types/Home";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { FormatCurrency } from "../../../utils";

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

export const CatatanKeuangan = () => {
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(
    null
  );
  const [selectedMonth, setSelectedMonth] = useState("Januari 2024");
  const { user } = useAuth();

  console.log(error)

  const fetchMonthlyReport = async (month: number, year: string) => {
    const token = user?.token;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/transactions/getMonthlyReport`,
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
      console.error("Error fetching monthly report:", error);
    } finally {
      setLoading(false);
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
            {loading ? (
              <div
                className="animate-pulse flex flex-col space-y-1 w-full"
                aria-hidden="true"
              >
                <div className="flex gap-2 items-center py-1 px-2 w-20 h-5 bg-gray-400 rounded text-white text-caption-large"></div>
                <div className="bg-gray-400 h-5 rounded w-7"></div>
              </div>
            ) : (
              <>
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
                  aria-label={`Total pemasukan bulan ini: ${FormatCurrency(
                    monthlyReport?.income
                  )}`}
                >
                  {FormatCurrency(monthlyReport?.income)}
                </h5>
              </>
            )}
          </div>
          <div
            className="border px-5 py-3 w-full rounded-lg"
            role="group"
            aria-labelledby="expense-label"
          >
            {loading ? (
              <div
                className="animate-pulse flex flex-col space-y-1 w-full"
                aria-hidden="true"
              >
                <div className="flex gap-2 items-center py-1 px-2 w-20 h-5 bg-gray-400 rounded text-white text-caption-large"></div>
                <div className="bg-gray-400 h-5 rounded w-7"></div>
              </div>
            ) : (
              <>
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
                  aria-label={`Total pengeluaran bulan ini: ${FormatCurrency(
                    monthlyReport?.expense
                  )}`}
                >
                  {FormatCurrency(monthlyReport?.expense)}
                </h5>
              </>
            )}
          </div>
        </div>
        {loading ? (
          <div
            className="animate-pulse flex flex-col space-y-1 w-full"
            aria-hidden="true"
          >
            <div className="flex gap-2 items-center py-1 px-2 w-20 h-5 bg-gray-400 rounded text-white text-caption-large"></div>
            <div className="bg-gray-400 h-5 rounded w-7"></div>
          </div>
        ) : (
          <div>
            <h5 id="balance-label">Selisih</h5>
            <h5
              className={`${(monthlyReport?.total ?? 0) < 0
                  ? "text-red-500"
                  : "text-green-600"
                } text-heading-6 font-bold`}
              aria-label={`Selisih bulan ini: ${FormatCurrency(
                monthlyReport?.total
              )}`}
            >
              {FormatCurrency(monthlyReport?.total)}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};
