import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import axios, { AxiosError } from "axios";
import { MonthlyReport } from "../../../types/Home";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Skeleton,
  Space,
} from "antd";
import { ArrowDown, ArrowUp, CaretDown } from "@phosphor-icons/react";
import { FormatCurrency } from "../../../utils";
import dayjs from "dayjs";
import { DATA_MONTH } from "../../../utils/constant";

export const CatatanKeuangan = () => {
  const [, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(
    null
  );
  const [selectedMonth, setSelectedMonth] = useState(
    DATA_MONTH.find((item) => item.monthNumber === new Date().getMonth() + 1)
      ?.month || ""
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [liveYear, setLiveYear] = useState<string>("");
  const { user } = useAuth();
  const today = new Date();

  const fetchMonthlyReport = async (month: number, year: string) => {
    const token = user?.token;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.VITE_API_URL}/transactions/get-monthly-report`,
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
      console.error("Error fetching monthly report:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (key: number) => {
    const month = DATA_MONTH[key].month;
    setSelectedMonth(month);
  };

  const handleYearChange: DatePickerProps["onChange"] = (_, dateString) => {
    if (typeof dateString === "string") {
      setSelectedYear(dateString);
      setLiveYear(dateString);
    }
  };

  const handleFilterTransaction = () => {
    const selectedMonthNumber = DATA_MONTH.find(
      (item) => item.month === selectedMonth
    )?.monthNumber;
    selectedMonthNumber &&
      fetchMonthlyReport(selectedMonthNumber, selectedYear);
  };

  useEffect(() => {
    fetchMonthlyReport(today.getMonth() + 1, today.getFullYear().toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = (month: string) => {
    const liveRegion = document.getElementById("dropdown-live-region");
    if (liveRegion) {
      liveRegion.textContent = `Sorot di bulan: ${month}`;
    }
  };

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
            className="border rounded-lg w-full sm:w-[175px]"
            role="combobox"
            aria-expanded="false"
            tabIndex={0}
          >
            <Dropdown
              menu={{
                items: DATA_MONTH.map((item, index) => ({
                  label: (
                    <div
                      onMouseEnter={() => handleMouseEnter(item.month)}
                      onFocus={() => handleMouseEnter(item.month)}
                      tabIndex={0}
                      role="menuitem"
                      aria-label={`Bulan ${item.month}`}
                    >
                      {item.month}
                    </div>
                  ),
                  key: index.toString(),
                })),
                onClick: (e) => {
                  handleMonthChange(+e.key);
                  const selectedMonth = DATA_MONTH[+e.key].month;
                  const liveRegion = document.getElementById(
                    "dropdown-live-region"
                  );
                  if (liveRegion) {
                    liveRegion.textContent = `Bulan terpilih: ${selectedMonth}`;
                  }
                },
              }}
              trigger={["click"]}
              placement="bottom"
            >
              <a
                onClick={(e) => e.preventDefault()}
                role="button"
                aria-haspopup="true"
              >
                <Space
                  className="flex justify-between px-5 py-3"
                  aria-label={`Pilih bulan: ${selectedMonth}`}
                >
                  <p>{selectedMonth}</p>
                  <CaretDown size={16} color="#115DA9" />
                </Space>
              </a>
            </Dropdown>

            <div
              id="dropdown-live-region"
              aria-live="polite"
              style={{ position: "absolute", left: "-9999px" }}
            ></div>
          </div>
          <DatePicker
            className="rounded-xl py-3 px-5"
            onChange={handleYearChange}
            picker="year"
            value={dayjs(selectedYear)}
            role="combobox"
            aria-label={`Pilih tahun: ${selectedYear}`}
          />
          <div
            id="year-live-region"
            aria-live="polite"
            style={{ position: "absolute", left: "-9999px" }}
          >
            {liveYear ? `Tahun yang dipilih: ${liveYear}` : ""}
          </div>
          <Button
            type="primary"
            className="bg-primary-100 text-white w-full sm:w-[175px] rounded-xl font-semibold text-body-small md:text-body-large h-[50px]"
            htmlType="submit"
            onClick={handleFilterTransaction}
            role="button"
            aria-labelledby="financial-records-filter-button"
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
              <div className="grid gap-3" aria-hidden="true">
                <Skeleton.Input active block size="default" />
                <Skeleton.Input active block size="default" />
              </div>
            ) : (
              <div tabIndex={0}>
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
              </div>
            )}
          </div>
          <div
            className="border px-5 py-3 w-full rounded-lg"
            role="group"
            aria-labelledby="expense-label"
          >
            {loading ? (
              <div className="grid gap-3" aria-hidden="true">
                <Skeleton.Input active block size="default" />
                <Skeleton.Input active block size="default" />
              </div>
            ) : (
              <div tabIndex={0}>
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
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <div className="grid gap-3" aria-hidden="true">
            <Skeleton.Input active block size="default" />
            <Skeleton.Input active block size="default" />
          </div>
        ) : (
          <div tabIndex={0}>
            <p id="balance-label">Selisih</p>
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
