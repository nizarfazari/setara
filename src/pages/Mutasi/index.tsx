import Breadcrumb from "../../components/Breadcumb"
import { useState } from "react"
import './mutasi.css'
import { Button, InputNumber, Modal, Radio, RadioChangeEvent, Space } from "antd"
import { SlidersHorizontal } from '@phosphor-icons/react';
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { ResponseBank } from "../../types/Bank";

const Mutasi = () => {
  const navigate = useNavigate() 
  const [filteredBy, setFilteredBy] = useState<string>('semua')
  const [modal2Open, setModal2Open] = useState(false)
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const { data, isLoading, isError } = useFetchData<ResponseBank>("/saved-accounts", user?.token);
  console.log(isError)


  return (
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb
        title="Mutasi Rekening" 
        subtitle="Pantai Pengeluaran dan Pemasukan Rekening"
      />
      <div className="my-5 lg:my-10">
        <button onClick={() => setFilteredBy('semua')} className={`btn text-primary-100 rounded-full ${ filteredBy === "semua" ? "bg-primary-100 text-white" : ""}`}>Semua</button>
        <button onClick={() => setFilteredBy('pemasukan')} className={`btn text-primary-100 rounded-full mx-2 ${ filteredBy === "pemasukan" ? "bg-primary-100 text-white" : ""}`}>Pemasukan</button>
        <button onClick={() => setFilteredBy('pengeluaran')} className={`btn text-primary-100 rounded-full ${ filteredBy === "pengeluaran" ? "bg-primary-100 text-white" : ""}`}>Pengeluaran</button>
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
        data.length > 0 ?
          <div>
            <p className="text-primary-100 font-bold">{'15 Juni 2024'}</p>
            <hr className="border-primary-100" />
          </div>
        : null
      }
      { data.length > 0 ?
          data.map(row => {
            return (
              <div className="flex justify-between pt-5">
                <div>
                  <p className="text-secondary-200 font-bold">{row.status}</p>
                  <p>{row.id}</p>
                  <p className="font-bold">{row.destination}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-700 font-semibold">- Rp. {row.amount},00</p>
                  <p className="text-slate-500 font-light">{row.time}</p>
                  <p onClick={() => navigate(`/mutasi/${row.id}`)} className="cursor-pointer underline text-primary-100 font-semibold">Lihat Bukti Transfer</p>
                </div>
              </div>
            )
          })
          :
          <div className="text-center">
            <h5 className="text-neutral-400 text-heading-5 font-bold">Belum Ada Transaksi :/</h5>
            <p className="text-neutral-300 text-body-large font-bold">Semua riwayat transaksi yang dilakukan akan <br/>
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
