import { Button, Card } from "antd"
import Breadcrumb from "../../components/Breadcumb"
import { useNavigate, useParams, useLocation } from "react-router-dom"

const Konfirmasi = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams()

  const { body } = location.state || {};
  const getUser = localStorage.getItem('user');
  const user_name = JSON.parse(getUser!).user.name;
  const bank_name = JSON.parse(getUser!).user.bank_name;
  const account_number = JSON.parse(getUser!).user.account_number;
  const onFinish = () => {
    navigate(`/bca/${slug}/konfirmasi`, { 
      state: { body }
    })
  }
  
  return (
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb title="Konfirmasi" subtitle="Harap periksa kembali sebelum melakukan konfirmasi"></Breadcrumb>
      <div className="md:flex text-primary-100 justify-between md:gap-5 lg:gap-10 mx-11 mt-6">
        <div>
          <div>
            <p className="font-bold">Pengirim</p>
            <div className="flex items-center mt-2">
              <img className="w-[70px] mr-4" src="/images/avatar.svg" alt="" />
              <div className="text-[12px] md:text-[14px]">
                <p className="font-bold">{user_name}</p>
                <div className="flex items-center">
                  <p>{bank_name}</p>
                  <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png"></img>
                  <p>{account_number}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-5 mb-5">
            <p className="font-bold mb-2">Penerima</p>
            <div className="flex items-center">
              <img className="w-[70px] mr-4" src="/images/avatar.svg" alt="" />
              <div className="text-[12px] md:text-[14px]">
                <p className="font-bold">{body.account_name}</p>
                <div className="flex items-center">
                  <p>{bank_name}</p>
                  <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png"></img>
                  <p>{body.destinationAccountNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[50%]">
          <Card className="p-3 text-primary-100 shadow-lg">
            <p className="font-bold">Detail</p>
            <div className='flex justify-between mt-4'>
              <div className="text-neutral-300 font-normal">
                <p>Nominal Top Up</p>
                <p>Biaya Admin</p>
                <p>Catatan</p>
              </div>
              <div>
                <p>Rp {body.amount}</p>
                <p>Rp {'1.000'}</p>
                <p>{body.note}</p>
              </div>
            </div>
            <hr className='border-neutral-300 my-2' />
            <div className='flex justify-between font-bold'>
              <p>Total</p>
              <p>Rp {body.amount + 1000}</p>
            </div>
          </Card>
          <Button onClick={() => onFinish() } type="primary" className="bg-primary-100 h-10 w-full mt-5 lg:mt-10 rounded-lg">Lanjutkan</Button>
        </div>
      </div>
    </div>
  )
}

export default Konfirmasi