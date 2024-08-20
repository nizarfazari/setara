import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import axios, { AxiosError } from "axios";
import { MonthlyReport } from "../../../types/Home";
import { Button, DatePicker, notification, Skeleton } from "antd";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { FormatCurrency } from "../../../utils";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export const CatatanKeuangan = () => {
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(
    null
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const { user } = useAuth();
  const today = new Date();

  const getMonthName = (monthNumber: number) => {
    return dayjs()
      .month(monthNumber - 1)
      .format("MMMM");
  };

  const fetchMonthlyReport = async (month: number, year: string) => {
    const token = user?.token;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/transactions/get-monthly-report`,
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

  const handleMonthChange = (date: any) => {
    const month = date?.month() + 1;
    setSelectedMonth(month);
  };

  const handleYearChange = (date: any) => {
    setSelectedYear(date?.format("YYYY"));
  };

  const handleFilterTransaction = () => {
    fetchMonthlyReport(selectedMonth, selectedYear);

    const monthName = getMonthName(selectedMonth); // Use selectedMonth instead of undefined 'month'
    notification.success({
      message: "Success",
      description: `Filter diterapkan untuk bulan ${monthName} tahun ${selectedYear}`,
      duration: 2, // Duration in seconds
    });
  };

  useEffect(() => {
    fetchMonthlyReport(today.getMonth() + 1, today.getFullYear().toString());
  }, []);

  return (
    <div
      className="shadow-md p-5 border border-primary-300 rounded-xl"
      role="region"
      aria-labelledby="financial-records-title"
    >
      {loading ? (
        <div className="flex gap-4 flex-col w-full sm:w-fit sm:flex-row">
          <Skeleton.Input active block size="default" />
          <Skeleton.Input active block size="default" />
          <Skeleton.Input active block size="default" />
        </div>
      ) : (
        <div className="flex gap-4 flex-col sm:flex-row">
          <div
            className="w-full sm:w-[175px]"
            role="combobox"
            aria-expanded="false"
          >
            <DatePicker
              defaultValue={dayjs()}
              className="rounded-xl py-3 px-5"
              onChange={handleMonthChange}
              picker="month"
              placeholder="Pilih Bulan"
              role="combobox"
              aria-label={`Pilih bulan: ${selectedMonth}`}
              format="MMMM"
            />
          </div>
          <DatePicker
            defaultValue={dayjs()}
            className="rounded-xl py-3 px-5"
            onChange={handleYearChange}
            picker="year"
            placeholder="Pilih Tahun"
            role="combobox"
            aria-label={`Pilih tahun: ${selectedYear}`}
            format="YYYY"
          />
          <Button
            className="bg-primary-100 text-white w-full sm:w-[175px] rounded-xl font-semibold text-body-small md:text-body-large h-[50px]"
            htmlType="submit"
            onClick={handleFilterTransaction}
            role="button"
          >
            Filter
          </Button>
        </div>
      )}
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
              className={`${
                (monthlyReport?.total ?? 0) < 0
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
