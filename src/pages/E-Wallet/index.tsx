import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { Skeleton } from 'antd';

// const wallets = [
//     { id: 1, name: 'OVO', imgSrc: '/images/e-wallet/ovo.png', slug: 'ovo' },
//     { id: 2, name: 'ShopeePay', imgSrc: '/images/e-wallet/shopee.png', slug: 'shopeepay' },
//     { id: 3, name: 'GoPay', imgSrc: '/images/e-wallet/gopay.png', slug: 'gopay' },
//     { id: 4, name: 'Dana', imgSrc: '/images/e-wallet/dana.png', slug: 'dana' },
//     { id: 5, name: 'LinkAja', imgSrc: '/images/e-wallet/link-aja.png', slug: 'linkaja' },
// ];

type TWallets = {
    id: string;
    name: string;
    image_path: string;
}   

const TransferWallet: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [wallets, setWallets] = useState<TWallets[] | null>(null);
    
    const handleWalletClick = (id: string) => {
        setSelectedWallet(id);
        localStorage.setItem('e-wallet', id)
    };

    const fetchAllVendorEwallet = async () => {
        setLoading(true)
        try {
            const response = await axios.get("https://setara-api-service-production.up.railway.app/api/v1/vendor/ewallets", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                }
            })
            const data = await response.data.data;
            setWallets(data);

           
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllVendorEwallet();
    }, []);

    return (
        <div className="container my-[30px]">
            <Breadcrumb title='E-Wallet' subtitle='Silahkan Pilih E-Wallet yang ingin Anda Transfer' />
            <div className="card shadow-2xl py-[32px] sm:px-[64px] px-[50px] rounded-xl lg:mt-14">
                <div className="e-wallet flex flex-wrap sm:justify-evenly justify-center items-start gap-8 min-h-[160px] min-w-[160px]">
                    {wallets?.map(wallet => (
                        <Link
                            to={`/e-wallet/${wallet.name.toLowerCase()}`}
                            key={wallet.id}
                            className='text-center flex flex-col items-center'
                        >
                            <div
                                onClick={() => handleWalletClick(wallet.id)}
                                className={`flex justify-center shadow-inner mb-3 ${selectedWallet === wallet.id ? 'bg-primary-100' : 'bg-primary-300'} rounded-2xl sm:h-[120px] h-[75px] sm:w-[120px] w-[75px] mx-auto items-center cursor-pointer`}>
                                <img src={wallet.image_path} alt={wallet.name} className='sm:w-[60px] sm:h-[60px] w-[40px] h-[40px]' />
                            </div>
                            <h1 className='sm:text-heading-6 sm:bg-black-400 sm:font-bold font-semibold text-[12px] leading-[16px]'>{wallet.name}</h1>
                        </Link>
                    ))}
                    {loading && (
                        [1,2,3,4,5].map((item) => (
                            <div key={item} className='flex flex-col gap-4 self-center'>
                                <Skeleton.Image active className='m-auto'/>
                                <Skeleton.Input active size='small'/>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransferWallet;
