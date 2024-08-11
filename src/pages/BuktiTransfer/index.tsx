import { Card } from "antd"
import Breadcrumb from "../../components/Breadcumb"

const BuktiTransfer = () => {
  return (
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb
        title="Bukti Transfer" 
        subtitle="Periksa Rincian Keuangan Anda"
      />
      <div className="lg:flex">
        <img className="w-[200px] lg:w-[521px] mx-auto my-4" src="/images/check-data.png" alt="" />
        <Card className="p-5 lg:w-[45%] text-primary-100 shadow-lg">
          <div>
            <p className="font-bold">Pengirim</p>
            <div className="flex items-center mt-2">
              <img className="w-[70px] mr-4" src="/images/avatar.svg" alt="" />
              <div>
                <p className="font-bold">{'ANDHIKA PUTRA'}</p>
                <div className="flex items-center">
                  <p>{'TAHAPAN BCA'}</p>
                  <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png"></img>
                  <p>{'289137645'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 mb-5">
            <p className="font-bold mb-2">Penerima</p>
            <div className="flex items-center">
              <img className="w-[70px] mr-4" src="/images/avatar.svg" alt="" />
              <div>
                <p className="font-bold">{'ANDHIKA PUTRA'}</p>
                <div className="flex items-center">
                  <p>{'TAHAPAN BCA'}</p>
                  <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png"></img>
                  <p>{'289137645'}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="font-bold">Detail</p>
          <div className='flex justify-between mt-4'>
            <div className="text-neutral-300 font-normal">
              <p>Nominal Top Up</p>
              <p>Biaya Admin</p>
              <p>Catatan</p>
            </div>
            <div>
              <p>Rp {'111.111'}</p>
              <p>Rp {'1.000'}</p>
              <p>{'-'}</p>
            </div>
          </div>
          <hr className='border-neutral-300 my-2' />
          <div className='flex justify-between font-bold'>
            <p>Total</p>
            <p>Rp {'111.211'}</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default BuktiTransfer
