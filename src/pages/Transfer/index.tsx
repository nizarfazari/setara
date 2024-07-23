import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcumb';
import { useNavigate } from 'react-router-dom';

const wallets = [
    { id: 1, isActive: true, name: 'Transfer Antar BCA', imgSrc: '/images/e-wallet/bca.png', slug: 'bca' },
    { id: 2, isActive: false, name: 'Transfer ke Bank Lain', imgSrc: '/images/e-wallet/bank.png', slug: 'bca' },
    { id: 3, isActive: false, name: 'Transfer Proxy Address', imgSrc: '/images/e-wallet/proxy-address.png', slug: 'bca' },
    { id: 4, isActive: false, name: 'Virtual Account', imgSrc: '/images/e-wallet/virtual-account.png', slug: 'bca' },
    { id: 5, isActive: false, name: 'Sakuku', imgSrc: '/images/e-wallet/sakuku.png', slug: 'bca' },
    { id: 6, isActive: false, name: 'Impor Daftar Transfer', imgSrc: '/images/e-wallet/import-daftar-tf.png', slug: 'bca' },
];

const Transfer: React.FC = () => {
    const [selectedWallet, setSelectedWallet] = useState<number | null>(null);
    const navigate = useNavigate()
    const handleWalletClick = (id: number, navigateTo: string) => {
        setSelectedWallet(id);
        navigate(navigateTo)
    };

    return (
        <div className="container my-[30px]">
            <Breadcrumb title='Transfer' subtitle='Silahkan Pilih Jenis Transfer' />
            <div className="card shadow-2xl py-[32px] sm:px-[64px] px-[40px] rounded-xl mt-14 flex">
                <div className="e-wallet flex flex-wrap sm:justify-evenly justify-center items-start gap-8 min-h-[160px] min-w-[160px]">
                    {wallets.map(wallet => (
                        <div
                            key={wallet.id}
                            className='text-center flex flex-col items-center'
                        >
                            <div
                                onClick={() => { wallet.isActive === true ? handleWalletClick(wallet.id, '/transfer/bca') : null }}
                                className={`flex justify-center shadow-inner mb-3 ${selectedWallet === wallet.id ? 'bg-primary-100' : 'bg-primary-300'} rounded-2xl sm:h-[120px] h-[75px] sm:w-[120px] w-[75px] mx-auto items-center cursor-pointer`}>
                                <img src={wallet.imgSrc} alt={wallet.name}  />
                            </div>
                            <h1 className='sm:text-heading-6 sm:bg-black-400 sm:font-bold font-semibold text-[12px] leading-[16px]'>{wallet.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Transfer;
