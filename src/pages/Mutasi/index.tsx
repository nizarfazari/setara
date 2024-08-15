import Breadcrumb from "../../components/Breadcumb"
import { useEffect, useState } from "react"
import './mutasi.css'
import { Button, InputNumber, Modal, Radio, RadioChangeEvent, Space } from "antd"
import { SlidersHorizontal } from '@phosphor-icons/react';
import { useNavigate } from "react-router-dom";
import { usePostData } from "../../hooks/usePostData";
import { useAuth } from "../../hooks/useAuth";


type Transaction = {
  transaction_id: string;
  unique_code: string;
  type: string;
  total_amount: number;
  time: string;
  reference_number: string;
  destination_account_number: string | null;
  destination_phone_number: string | null;
  formatted_date: string;
  formatted_time: string;
};

const Mutasi = () => {
  const navigate = useNavigate()
  const [filteredBy, setFilteredBy] = useState<string>('semua')
  const [modal2Open, setModal2Open] = useState(false)
  const [value, setValue] = useState(1);
  const { user } = useAuth()

  const { data: datas2, post, isLoading } = usePostData('/transactions/get-all-mutation?page=0&size=10', user?.token)
  

  const getMutation = async () => {
    await post({
      startDate: "2024-08-10",
      endDate: "2024-08-15",
      transactionCategory: "ALL_TRANSACTIONS"
    })

  }

  useEffect(() => {
    getMutation()
  }, [])



  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const data = [
    {
      status: 'SUKSES',
      id: 'W5953185',
      destination: 'Transfer M-Banking DB',
      amount: '10.000',
      time: '17:16:20 WIB'
    },
    {
      status: 'SUKSES',
      id: 'W5953185',
      destination: 'Transfer M-Banking DB',
      amount: '10.000',
      time: '17:16:20 WIB'
    },
    {
      status: 'SUKSES',
      id: 'W5953185',
      destination: 'Transfer M-Banking DB',
      amount: '10.000',
      time: '17:16:20 WIB'
    },
    {
      status: 'SUKSES',
      id: 'W5953185',
      destination: 'Transfer M-Banking DB',
      amount: '10.000',
      time: '17:16:20 WIB'
    },
  ]

  if (isLoading) {
    <div>Is Loading</div>
  }

  return (
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb
        title="Mutasi Rekening"
        subtitle="Pantai Pengeluaran dan Pemasukan Rekening"
      />
      <div className="my-5 lg:my-10">
        <button onClick={() => setFilteredBy('semua')} className={`btn text-primary-100 rounded-full ${filteredBy === "semua" ? "bg-primary-100 text-white" : ""}`}>Semua</button>
        <button onClick={() => setFilteredBy('pemasukan')} className={`btn text-primary-100 rounded-full mx-2 ${filteredBy === "pemasukan" ? "bg-primary-100 text-white" : ""}`}>Pemasukan</button>
        <button onClick={() => setFilteredBy('pengeluaran')} className={`btn text-primary-100 rounded-full ${filteredBy === "pengeluaran" ? "bg-primary-100 text-white" : ""}`}>Pengeluaran</button>
      </div>
      <div className="flex justify-between items-center my-5 lg:my-10">
        <div>
          <p>Rekening</p>
          <p className="text-primary-100 font-bold">{'289137645'}</p>
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
              <Radio value={5}>
                Tanggal Lain
                {value === 5
                  ?
                  <div>
                    <InputNumber min={1} max={31} />
                    {/* <label>Tanggal</label>
                      <InputNumber min={1} max={31} />
                      <InputNumber min={1} max={12} />
                      <InputNumber min={2000} max={2024} /> */}
                  </div>
                  : null}
              </Radio>
            </Space>
          </Radio.Group>
        </Modal>
      </div>
      {
        datas2?.data?.length > 0 ?
          <div>
            <p className="text-primary-100 font-bold">{'15 Juni 2024'}</p>
            <hr className="border-primary-100" />
          </div>
          : null
      }
      {datas2?.data?.length > 0 ?
        datas2?.data?.map((value: Transaction, index: number) => {
          console.log(value)
          return (
            <div className="flex justify-between pt-5" key={index}>
              <div>
                <p className="text-secondary-200 font-bold">Sukses</p>
                <p>{value.unique_code}</p>
                <p className="font-bold">{value.type}</p>
              </div>
              <div className="text-right">
                {value.type === 'DEPOSIT' ? <p className="text-red-700 font-semibold">- Rp. {value.total_amount},00</p> : <p className="text-green-700 font-semibold">+ Rp. {value.total_amount},00</p>}

                <p className="text-slate-500 font-light">{value.formatted_time}</p>
                <p onClick={() => navigate(`/mutasi/${value.transaction_id}`)} className="cursor-pointer underline text-primary-100 font-semibold">Lihat Bukti Transfer</p>
              </div>
            </div>
          )
        })
        :
        <div className="text-center">
          <h5 className="text-neutral-400 text-heading-5 font-bold">Belum Ada Transaksi :/</h5>
          <p className="text-neutral-300 text-body-large font-bold">Semua riwayat transaksi yang dilakukan akan <br />
            ditampilkan di halaman ini.</p>
          <img className="m-auto w-[332px]" src="/images/data-null.png"></img>
        </div>
      }
      {
        data.length > 0 ?
          <Button type="primary" className="bg-primary-100 h-10 w-full md:w-[33%] md:ml-[33.5%] mt-5 lg:mt-10 rounded-lg">Download Mutasi Rekening</Button>
          : null
      }
    </div>
  )
}

export default Mutasi