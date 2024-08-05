import { Button, Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const TransaksiBerhasil = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { body } = location.state || {}
  const getUser = localStorage.getItem('user');
  const user_name = JSON.parse(getUser!).user.name;
  const bank_name = JSON.parse(getUser!).user.bank_name;
  const account_number = JSON.parse(getUser!).user.account_number;

  return (
    <div className="container py-5 lg:py-[20px] pb-[50px]">
      <p className="text-heading-5 text-center font-bold pb-[15px]">Transaksi Berhasil</p>
      <div className="lg:flex justify-center">
        <img className="w-[200px] lg:w-[400px] m-auto lg:h-[400px] my-4" src="/images/check-data.png" alt="" />
        <Card className="px-5 py-3 lg:w-[35%] text-primary-100 shadow-lg lg:mr-32">
          <div>
            <p className="font-bold">Pengirim</p>
            <div className="flex items-center mt-2">
              <img className="w-[70px] mr-4" src="/images/avatar.svg" alt="" />
              <div>
                <p className="font-bold">{user_name}</p>
                <div className="flex items-center">
                  <p>{bank_name}</p>
                  <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png"></img>
                  <p>{account_number}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 mb-5">
            <p className="font-bold mb-2">Penerima</p>
            <div className="flex items-center">
              <img className="w-[70px] mr-4" src="/images/avatar.svg" alt="" />
              <div>
                <p className="font-bold">{body.account_name}</p>
                <div className="flex items-center">
                  <p>{bank_name}</p>
                  <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png"></img>
                  <p>{body.destinationAccountNumber}</p>
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
              <p>Rp {body.amount}</p>
              <p>Rp {'1000'}</p>
              <p>{body.note}</p>
            </div>
          </div>
          <hr className='border-neutral-300 my-2' />
          <div className='flex justify-between font-bold'>
            <p>Total</p>
            <p>Rp {body.amount + 1000}</p>
          </div>
        </Card>
      </div>
      <div className="flex gap-3 mb-10 lg:px-28">
        <Button onClick={() => navigate('/')} type="primary" className="bg-primary-300 text-primary-100 font-bold h-10 w-full mt-5 lg:mt-10 rounded-lg">Kembali Ke Homepage</Button>
        <Button onClick={() => navigate('/')} type="primary" className="bg-primary-100 h-10 w-full mt-5 lg:mt-10 rounded-lg">Bagikan Bukti Transaksi</Button>
      </div>
    </div>
  )
}

export default TransaksiBerhasil