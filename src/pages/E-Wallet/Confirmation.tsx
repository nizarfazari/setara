import { Button, Card } from "antd"
import Breadcrumb from "../../components/Breadcumb"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { FormatCurrency } from "../../utils"

const Konfirmasi = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { transactions, user } = useAuth();
  const admin = 1000
  console.log(user)
  return (
    <div className="container py-5 lg:py-[50px] pb-[50px]">
      <Breadcrumb title="Konfirmasi" subtitle="Harap periksa kembali sebelum melakukan konfirmasi"></Breadcrumb>
      <div className="md:flex text-primary-100 justify-between md:gap-5 lg:gap-10 mx-11 mt-6">
        <div>
          <div>
            <p className="font-bold">Pengirim</p>
            <div className="flex items-center mt-2">
              <img className="w-[70px] mr-4" src={user?.user.image_path} alt="" />
              <div className="text-[12px] md:text-[14px]">
                <p className="font-bold">{user?.user.name}</p>
                <div className="flex items-center">
                  <p>{user?.user.bank_name}</p>
                  <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png"></img>
                  <p>{user?.user.account_number}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-5 mb-5">
            <p className="font-bold mb-2">Penerima</p>
            <div className="flex items-center">
              <img className="w-[70px] mr-4" src={transactions.recipients.imageUrl} alt="" />
              <div className="text-[12px] md:text-[14px]">
                <p className="font-bold">{transactions.recipients.nama}</p>
                <div className="flex items-center">
                  <p>{transactions.recipients.wallet}</p>
                  <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png"></img>
                  <p>{transactions.recipients.numberDestination}</p>
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
                <p>{FormatCurrency(transactions.transaction.nominal)}</p>
                <p>{FormatCurrency(admin)}</p>
                <p>{transactions.transaction.notes ? transactions.transaction.notes : "-"}</p>
              </div>
            </div>
            <hr className='border-neutral-300 my-2' />
            <div className='flex justify-between font-bold'>
              <p>Total</p>
              <p>{FormatCurrency(+transactions.transaction.nominal + admin)}</p>
            </div>
          </Card>
          <Button onClick={() => navigate(`/e-wallet/${slug}/konfirmasi`)} type="primary" className="bg-primary-100 h-10 w-full mt-5 lg:mt-10 rounded-lg">Top Up</Button>
        </div>
      </div>
    </div>
  )
}

export default Konfirmasi