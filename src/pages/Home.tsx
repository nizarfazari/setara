import { Button } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;



const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="font-bold text-center p-10">
      <p>Selamat Datang di HomePage</p>
      <Button onClick={() => navigate('/login')} type="dashed" className='bg-sky-600 border-sky-600 text-white'>AntDesign Button</Button>
      <Title level={5}>h5. Ant Design</Title>
    </div>
  )
}

export default Home