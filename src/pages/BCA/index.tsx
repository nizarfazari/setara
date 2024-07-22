import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcumb';
import { Link } from 'react-router-dom';

const wallets = [
    { id: 1, name: 'Transfer Antar BCA', imgSrc: '/images/e-wallet/bca.png', slug: 'transfer-antar-bca' },
];

const TransferBCA: React.FC = () => {
    const [selectedWallet, setSelectedWallet] = useState<number | null>(null);

    const handleWalletClick = (id: number) => {
        setSelectedWallet(id);
    };

    return (
        <div className="container my-[30px]">
            <Breadcrumb title='E-Wallet' subtitle='Silahkan Pilih E-Wallet yang ingin Anda Transfer' />
            <div className="card shadow-2xl py-[32px] sm:px-[64px] px-[40px] rounded-xl mt-14">
                <div className="e-wallet flex flex-wrap sm:justify-evenly justify-center items-start gap-8 min-h-[160px] min-w-[160px]">
                    {wallets.map(wallet => (
                        <Link
                            to={`/bca/${wallet.slug}`}
                            key={wallet.id}
                            className='text-center flex flex-col items-center'
                        >
                            <div
                                onClick={() => handleWalletClick(wallet.id)}
                                className={`flex justify-center shadow-inner mb-3 ${selectedWallet === wallet.id ? 'bg-primary-100' : 'bg-primary-300'} rounded-2xl sm:h-[120px] h-[75px] sm:w-[120px] w-[75px] mx-auto items-center cursor-pointer`}>
                                <img src={wallet.imgSrc} alt={wallet.name} />
                            </div>
                            <h1 className='sm:text-heading-6 sm:bg-black-400 sm:font-bold font-semibold text-[12px] leading-[16px]'>{wallet.name}</h1>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransferBCA;
