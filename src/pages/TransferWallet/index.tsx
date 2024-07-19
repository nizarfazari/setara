import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcumb';

const wallets = [
    { id: 1, name: 'OVO', imgSrc: '/images/e-wallet/ovo.png', slug: 'ovo' },
    { id: 2, name: 'ShopeePay', imgSrc: '/images/e-wallet/shopee.png', slug: 'shopeepay' },
    { id: 3, name: 'GoPay', imgSrc: '/images/e-wallet/gopay.png', slug: 'gopay' },
    { id: 4, name: 'Dana', imgSrc: '/images/e-wallet/dana.png', slug: 'dana' },
    { id: 5, name: 'LinkAja', imgSrc: '/images/e-wallet/link-aja.png', slug: 'linkaja' },
];

const TransferWallet: React.FC = () => {
    const [selectedWallet, setSelectedWallet] = useState<number | null>(null);

    const handleWalletClick = (id: number) => {
        setSelectedWallet(id);
    };

    return (
        <div className="container my-[30px]">
            <Breadcrumb title='E-Wallet' subtitle='Silahkan Pilih E-Wallet yang ingin Anda Transfer' />
            <div className="card shadow-2xl py-[32px] sm:px-[64px] px-[50px] rounded-xl mt-14">
                <div className="e-wallet flex flex-wrap sm:justify-evenly justify-center items-start gap-8 min-h-[160px] min-w-[160px]">
                    {wallets.map(wallet => (
                        <div
                            key={wallet.id}
                            className='text-center flex flex-col items-center'
                        >
                            <div
                                onClick={() => handleWalletClick(wallet.id)}
                                className={`flex justify-center shadow-inner mb-3 ${selectedWallet === wallet.id ? 'bg-primary-100' : 'bg-primary-300'} rounded-2xl sm:h-[120px] h-[75px] sm:w-[120px] w-[75px] mx-auto items-center cursor-pointer`}>
                                <img src={wallet.imgSrc} alt={wallet.name} className='sm:w-[60px] sm:h-[60px] w-[40px] h-[40px]' />
                            </div>
                            <h1 className='sm:text-heading-6 sm:bg-black-400 sm:font-bold font-semibold text-[12px] leading-[16px]'>{wallet.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransferWallet;
