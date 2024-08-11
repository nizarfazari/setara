import * as React from 'react';

interface ICardUserProps {
    role: string
    imageUrl: string
    username: string
    bankName: string
    accountNumber: string
}

const CardUser: React.FunctionComponent<ICardUserProps> = ({ role, imageUrl, username, bankName, accountNumber }) => {
    return (
        <div>
            <p className="font-bold">{role}</p>
            <div className="flex items-center mt-2">
                <img className="w-[70px] mr-4" src={imageUrl} alt="" />
                <div className="text-[12px] md:text-[14px]">
                    <p className="font-bold">{username}</p>
                    <div className="flex items-center">
                        <p>{bankName}</p>
                        <img className="w-[6px] h-[6px] mx-2" src="/images/icons/dot.png"></img>
                        <p>{accountNumber}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardUser;
