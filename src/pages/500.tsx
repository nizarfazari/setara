import Navbar from "../components/Navbar";
import image from "/images/500.png";
import { Link, useNavigate } from 'react-router-dom';

interface IServerErrorProps {
}

const ServerError: React.FunctionComponent<IServerErrorProps> = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/");
    };
    return (
        <>
            <Navbar />
            <main>
                <div className="flex justify-center items-center container h-screen">
                    <div className="text-center md:w-[600px] mb-[50px]">
                        <h1 className=" text-heading-6 md:text-heading-5 font-bold">Oops! Halaman tidak ditemukan.</h1>
                        <p className="font-bold text-[14px] md:text-[16px] text-neutral-300 my-2">
                            Sepertinya halaman yang Anda cari tidak ada atau telah dipindahkan.
                            Silakan kembali ke halaman utama atau coba gunakan fitur pencarian.
                        </p>
                        <img src={image} className="mx-auto" />
                        <Link to={'/'} onClick={handleHome} className="bg-primary-300 w-full p-3 rounded-full text-primary-100 font-bold mt-7 block">Kembali ke HomePage</Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ServerError;
