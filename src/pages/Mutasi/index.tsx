import { useEffect, useState } from "react";
import './mutasi.css';
import { Button, DatePicker, Modal, Pagination, Radio, RadioChangeEvent, Skeleton, Space, Spin } from "antd";
import { SlidersHorizontal, DownloadSimple } from '@phosphor-icons/react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePostData } from "../../hooks/usePostData";
import { useAuth } from "../../hooks/useAuth";
import dayjs, { Dayjs } from "dayjs";

import { FormatCurrency } from "../../utils";
import Breadcrumb from "../../components/Breadcumb";
import { ApiResponse, GroupedTransaction, MutationReq, Transaction } from "../../types/Mutation";
import { GetData } from "../../utils/GetData";

const Mutasi = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredBy, setFilteredBy] = useState<string>(searchParams ? searchParams.get('filter') || 'ALL_TRANSACTIONS' : 'ALL_TRANSACTIONS');
  const [modal2Open, setModal2Open] = useState(false);
  const [value, setValue] = useState<number>(searchParams ? Number(searchParams.get('value')) || 1 : 1);
  const { user } = useAuth();
  const { RangePicker } = DatePicker;
  const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs]>(searchParams ? searchParams.get('startDate') && searchParams.get('endDate') ? [dayjs(searchParams.get('startDate')), dayjs(searchParams.get('endDate'))] : [dayjs(), dayjs()] : [dayjs(), dayjs()]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const { data, post, isLoading } = usePostData<MutationReq, ApiResponse>(`/transactions/get-all-mutation?page=${currentPage - 1}&size=${pageSize}`, user?.token);
  const [loading, setLoading] = useState(false);

  const getMutation = async (startDate: string, endDate: string) => {
    await post({
      startDate,
      endDate,
      transactionCategory: filteredBy,
      page: currentPage - 1,
      size: pageSize
    });
  };

  const onFilter = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('filter', value);
    setSearchParams(newSearchParams);
    setFilteredBy(value);
  };

  useEffect(() => {
    const [startDate, endDate] = selectedDates;
    getMutation(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredBy, selectedDates, currentPage]);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    const today = dayjs();
    let startDate, endDate;

    switch (e.target.value) {
      case 1:
        startDate = today;
        endDate = today;
        break;
      case 2:
        startDate = today.subtract(6, 'day');
        endDate = today;
        break;
      case 3:
        startDate = today.subtract(14, 'day');
        endDate = today;
        break;
      case 4:
        startDate = today.subtract(1, 'month');
        endDate = today;
        break;
      case 5:
        startDate = selectedDates[0];
        endDate = selectedDates[1];
        break;
      default:
        startDate = today;
        endDate = today;
    }
    console.log(selectedDates)

    searchParams.set('startDate', startDate.format('YYYY-MM-DD'));
    searchParams.set('endDate', endDate.format('YYYY-MM-DD'));
    searchParams.set('value', e.target.value.toString());
    setSearchParams([...searchParams]);

    setSelectedDates([startDate, endDate]);
  };

  const onDateChange = (dates: [Dayjs, Dayjs] | null | undefined | unknown) => {
    if (Array.isArray(dates)) {
      searchParams.set('startDate', dates[0].format('YYYY-MM-DD'));
      searchParams.set('endDate', dates[1].format('YYYY-MM-DD'));
      setSearchParams([...searchParams]);
      setSelectedDates(dates as [Dayjs, Dayjs]);
    }
  };

  const onDownloadFile = async () => {
    setLoading(true);
    try {
      const blob = await GetData<Blob>('/transactions/generate-all-mutation-report', user?.token, true) as Blob;
      console.log(blob)
      // Buat URL dari Blob dan trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;

      const formattedDate = dayjs().format('YYYY-MM-DD HH-mm-ss');
      const fileName = `Mutasi Rekening - (${formattedDate}).pdf`;

      // "Mutasi Rekening (" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH-mm-ss")) + ").pdf";
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteringDataMutation = (data: Transaction[]): GroupedTransaction[] => {
    const groupedData = data.reduce((acc, transaction) => {
      const date = transaction.formatted_date;
      if (!acc[date]) {
        acc[date] = {
          date: transaction.time,
          transactions: []
        };
      }
      acc[date].transactions.push(transaction);
      return acc;
    }, {} as Record<string, GroupedTransaction>);

    return Object.values(groupedData);
  };

  const groupedTransactions = data?.data.mutation_responses ? filteringDataMutation(data.data.mutation_responses) : [];

  console.log(groupedTransactions)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb
        title="Mutasi Rekening"
        subtitle="Pantau Pengeluaran dan Pemasukan Rekening"
      />
      <div className="my-5 lg:my-10">
        <button onClick={() => onFilter('ALL_TRANSACTIONS')} className={`btn text-primary-100 rounded-full ${filteredBy === "ALL_TRANSACTIONS" ? "bg-primary-100 text-white" : ""}`}>
          Semua
        </button>
        <button onClick={() => onFilter('INCOMING')} className={`btn text-primary-100 rounded-full mx-2 ${filteredBy === "INCOMING" ? "bg-primary-100 text-white" : ""}`}>
          Pemasukan
        </button>
        <button onClick={() => onFilter('OUTGOING')} className={`btn text-primary-100 rounded-full ${filteredBy === "OUTGOING" ? "bg-primary-100 text-white" : ""}`}>
          Pengeluaran
        </button>
      </div>
      <div className="flex justify-between items-center my-5 lg:my-10">
        <div>
          <p>Rekening</p>
          <p className="text-primary-100 font-bold">{user?.user.account_number}</p>
        </div>
        <div className="flex items-center gap-4 ">
          {groupedTransactions.length >= 0 && <Button
            icon={<DownloadSimple size={16} />}
            onClick={onDownloadFile}
            type="primary"
            className="bg-primary-100 h-10 rounded-lg  font-semibold"
            disabled={loading}
          >
            {loading ? <Spin /> : 'Download'}
          </Button>}
          <Button onClick={() => setModal2Open(true)} className="border-primary-100 text-primary-100 h-10 font-semibold" icon={<SlidersHorizontal size={16} />}>
            Filter
          </Button>
        </div>
        <Modal
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>Hari Ini</Radio>
              <Radio value={2}>7 Hari Terakhir</Radio>
              <Radio value={3}>15 Hari Terakhir</Radio>
              <Radio value={4}>1 Bulan Terakhir</Radio>
              <Radio value={5}>
                Tanggal Lain
                {value === 5 ? (
                  <div>
                    <RangePicker value={selectedDates} onChange={onDateChange} />
                  </div>
                ) : null}
              </Radio>
            </Space>
          </Radio.Group>
        </Modal>
      </div>
      {isLoading ? (
        <div className="h-[200px] ">
          <div>
            <Skeleton active />
            <Skeleton paragraph={{ rows: 1 }} className="mt-4" />
            <Skeleton paragraph={{ rows: 1 }} className="mt-4" />
          </div>
          <div className="text-right">
            <Skeleton active />
            <Skeleton paragraph={{ rows: 1 }} className="mt-4" />
            <Skeleton paragraph={{ rows: 1 }} className="mt-4" />
          </div>
        </div>
      ) : groupedTransactions.length > 0 ? (
        <>
          {groupedTransactions.map((group, index) => (
            <div key={index}>
              <div className="my-4">
                <p className="text-primary-100 font-bold">{new Date(group.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</p>
                <hr className="border-primary-100" />
              </div>
              {group.transactions.map((value: Transaction, index: number) => (
                <div className="flex justify-between mb-4" key={index}>
                  <div className="">
                    <p className="text-secondary-200 font-bold mb-2">SUKSES</p>
                    <p className="mb-2">{value.unique_code}</p>
                    <p className="font-bold mb-2">{value.type}</p>
                  </div>
                  <div className="text-right">
                    {value.type === 'DEPOSIT' ? (
                      <p className="text-green-700 font-semibold mb-2">+ {FormatCurrency(value.total_amount)},00</p>
                    ) : (
                      <p className="text-red-700 font-semibold mb-2">- {FormatCurrency(value.total_amount)},00</p>
                    )}
                    <p className="text-slate-500 font-light mb-2">{value.formatted_time} WIB</p>
                    <p onClick={() => navigate(`/mutasi/${value.transaction_id}`)} className="mb-2 cursor-pointer underline text-primary-100 font-semibold">
                      Lihat Bukti Transfer
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="flex justify-start mb-4">
            <Pagination current={currentPage} pageSize={pageSize} total={data?.data.total_pages && +data?.data.total_pages * 10} onChange={handlePageChange} showSizeChanger={false} />
          </div>
          {groupedTransactions.length >= 0 && <Button
            onClick={onDownloadFile}
            type="primary"
            className="bg-primary-100 h-10 w-full md:w-[33%] md:ml-[33.5%] mt-5 lg:mt-10 rounded-lg sm:hidden"
            disabled={loading}
          >
            {loading ? <Spin /> : 'Download Mutasi Rekening'}
          </Button>}
        </>
      ) : (
        <div className="text-center">
          <h5 className="text-neutral-400 text-heading-5 font-bold">Belum Ada Transaksi :/</h5>
          <p className="text-neutral-300 text-body-large font-bold">
            Semua riwayat transaksi yang dilakukan akan <br />
            ditampilkan di halaman ini.
          </p>
          <img className="m-auto w-[332px]" src="/images/data-null.png" alt="No transactions" />
        </div>
      )}
    </div>
  );
};

export default Mutasi;
