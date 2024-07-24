import { ArrowLeft } from '@phosphor-icons/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  subtitle: string;
}

const Breadcrumb: React.FC<Props> = ({ title, subtitle }) => {
  const navigate = useNavigate();


  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex gap-4 ">
      <ArrowLeft size={27} weight="bold" color='#343330' className='mt-[5px] cursor-pointer' onClick={handleBackClick} />
      <div className="font-bold">
        <h5 className="text-neutral-400 text-heading-5  ">{title}</h5>
        <p className="text-neutral-300 text-body-large ">{subtitle}</p>
      </div>
    </div>
  );
};

export default Breadcrumb;
