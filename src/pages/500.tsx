import Navbar from '../components/Navbar';
import image from '/images/500.png';
import { Link, useNavigate } from 'react-router-dom';

interface IServerErrorProps {}

const ServerError: React.FunctionComponent<IServerErrorProps> = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };
  return (
    <>
      <Navbar />
      <main>
        <div className="flex mt-20 justify-center items-center container">
          <div className="text-center md:w-[600px] mb-[50px]">
            <h1 className=" text-heading-6 md:text-heading-5 font-bold" tabIndex={0} >
              Maaf! Terjadi kesalahan pada server kami.
            </h1>
            <p className="font-bold text-[14px] md:text-[16px] text-neutral-300 my-2" tabIndex={0} >
              Kami sedang berusaha memperbaikinya secepat mungkin. Silakan
              kembali ke halaman utama atau coba lagi nanti.
            </p>
            <img
              src={image}
              alt="505 Server Sedang Error"
              className="mx-auto"
            />
            <Link
              to={'/'}
              tabIndex={0} 
              onClick={handleHome}
              className="bg-primary-300 w-full p-3 rounded-full text-primary-100 font-bold mt-7 block hover:bg-primary-100 hover:text-white transition duration-300 ease-in-out"
            >
              Kembali ke HomePage
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ServerError;
