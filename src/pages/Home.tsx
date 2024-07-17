import Breadcrumb from '../components/Breadcumb';
import { Button } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;



const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='container mx-auto'>
        <Breadcrumb title='E-Wallet' subtitle='Silahkan Pilih E-Wallet yang ingin Anda Transfer' />
        <div className="font-bold text-center p-10">
          <p>Selamat Datang di HomePage</p>
          <Button onClick={() => navigate('/login')} type="dashed" className='bg-sky-600 border-sky-600 text-white'>AntDesign Button</Button>
          <Title level={5}>h5. Ant Design</Title>
        </div>
      </div>

    </>
  )
}

export default Home