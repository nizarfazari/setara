import Breadcrumb from "../../components/Breadcumb";
import { useState } from "react";
import './mutasi.css';
import { Button, InputNumber, Modal, Radio, RadioChangeEvent, Space } from "antd";
import { SlidersHorizontal } from '@phosphor-icons/react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import dayjs from "dayjs";

const Mutasi = () => {
  const navigate = useNavigate();
  const [filteredBy, setFilteredBy] = useState<string>('semua');
  const [modal2Open, setModal2Open] = useState(false);
  const [value, setValue] = useState<number | null>(null); // Default to null
  const { user } = useAuth();

  const data = [
    { type: 'Pemasukan', transactionId: '12345', destinationAccountNumber: 'Transfer M-Banking DB', totalAmount: '10.000', time: '17:16:20 WIB', formattedDate: '15/08/2024' },
    { type: 'Pengeluaran', transactionId: '678910', destinationAccountNumber: 'Transfer M-Banking DB', totalAmount: '10.000', time: '17:16:20 WIB', formattedDate: '15/08/2024' },
    { type: 'Pemasukan', transactionId: 'W5953185', destinationAccountNumber: 'Transfer M-Banking DB', totalAmount: '10.000', time: '17:16:20 WIB', formattedDate: '08/08/2024' },
    { type: 'Pengeluaran', transactionId: '112234', destinationAccountNumber: 'Transfer M-Banking DB', totalAmount: '10.000', time: '17:16:20 WIB', formattedDate: '15/07/2024' },
  ];

  const today = dayjs();

  const filterDataByDate = () => {
    switch (value) {
      case null:
        return data;
      case 1:
        return data.filter(item => dayjs(item.formattedDate, 'DD/MM/YYYY').isSame(today, 'day'));
      case 2:
        return data.filter(item => dayjs(item.formattedDate, 'DD/MM/YYYY').isAfter(today.subtract(7, 'day')));
      case 3:
        return data.filter(item => dayjs(item.formattedDate, 'DD/MM/YYYY').isAfter(today.subtract(15, 'day')));
      case 4:
        return data.filter(item => dayjs(item.formattedDate, 'DD/MM/YYYY').isAfter(today.subtract(1, 'month')));
      default:
        return data;
    }
  };

  const filteredData = filteredBy === 'semua'
    ? filterDataByDate()
    : filterDataByDate().filter(item => item.type.toLowerCase() === filteredBy.toLowerCase());

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return ( 
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb
        title="Mutasi Rekening"
        subtitle="Pantau Pengeluaran dan Pemasukan Rekening"
      />
      <div className="my-5 lg:my-10">
        <button onClick={() => setFilteredBy('semua')} className={`btn text-primary-100 rounded-full ${filteredBy === "semua" ? "bg-primary-100 text-white" : ""}`}>Semua</button>
        <button onClick={() => setFilteredBy('pemasukan')} className={`btn text-primary-100 rounded-full mx-2 ${filteredBy === "pemasukan" ? "bg-primary-100 text-white" : ""}`}>Pemasukan</button>
        <button onClick={() => setFilteredBy('pengeluaran')} className={`btn text-primary-100 rounded-full ${filteredBy === "pengeluaran" ? "bg-primary-100 text-white" : ""}`}>Pengeluaran</button>
      </div>
      <div className="flex justify-between items-center my-5 lg:my-10">
        <div>
          <p>Rekening</p>
          <p className="text-primary-100 font-bold">{user?.user.account_number}</p>
        </div>
        <Button onClick={() => setModal2Open(true)} className="border-primary-100 text-primary-100 h-10" icon={<SlidersHorizontal size={16} />}>Filter</Button>
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
              <Radio value={5}>Tanggal Lain {/* Custom filter date logic can be added here */}</Radio>
            </Space>
          </Radio.Group>
        </Modal>
      </div>
      
      {filteredData.length > 0 ?
        filteredData.map((row, index) => {
          return (
            <div key={index} className="flex justify-between pt-5">
              <div>
                <p className={`${row.type === 'Pengeluaran' ? "text-red-700" : "text-secondary-200"} font-bold`}>{row.type}</p>
                <p>{row.transactionId}</p>
                <p className="font-bold">{row.destinationAccountNumber}</p>
              </div>
              <div className="text-right">
                {row.type === 'Pengeluaran' ? <p className="text-red-700 font-semibold">- Rp. {row.totalAmount},00</p> : <p className="text-secondary-200 font-semibold">+ Rp. {row.totalAmount},00</p>}
                <p className="text-slate-500 font-light">{row.formattedDate}</p>
                <p onClick={() => navigate(`/mutasi/${row.transactionId}`)} className="cursor-pointer underline text-primary-100 font-semibold">Lihat Bukti Transfer</p>
              </div>
            </div>
          );
        })
        :
        <div className="text-center">
          <h5 className="text-neutral-400 text-heading-5 font-bold">Belum Ada Transaksi :/</h5>
          <p className="text-neutral-300 text-body-large font-bold">Semua riwayat transaksi yang dilakukan akan <br />
            ditampilkan di halaman ini.</p>
          <img className="m-auto w-[332px]" src="/images/data-null.png" alt="No data" />
        </div>
      }
      {
        filteredData.length > 0 ?
          <Button type="primary" className="bg-primary-100 h-10 w-full md:w-[33%] md:ml-[33.5%] mt-5 lg:mt-10 rounded-lg">Download Mutasi Rekening</Button>
          : null
      }
    </div>
  );
}

export default Mutasi;
