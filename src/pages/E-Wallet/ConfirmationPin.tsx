
import * as React from 'react';
import Breadcrumb from '../../components/Breadcumb';

interface IConfirmationPinEWalletProps {
}

const ConfirmationPinEWallet: React.FunctionComponent<IConfirmationPinEWalletProps> = () => {
    return (
        <>
            <div className="container">
                <div className="my-[30px]">
                    <Breadcrumb title="OVO" subtitle="Masukkan Nominal Transaksi" />
                </div>
                <div className="w-full lg:max-w-[546px]">
                  
                </div>
            </div>
        </>
    );
};

export default ConfirmationPinEWallet;
