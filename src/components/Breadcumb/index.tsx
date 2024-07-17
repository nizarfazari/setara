import React from 'react';

type Props = {
  title: string;
  subtitle: string;
}

const Breadcrumb: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="container flex mx-auto px-1">
      <img className="" src="/images/icons/ArrowLeft.svg" alt="Arrow left" />
      <div className="container mt-6">
        <h5 className="text-neutral-400 text-heading-5 text-nunito font-bold">{title}</h5>
        <p className="text-neutral-300 text-body-large text-nunito font-bold">{subtitle}</p>
      </div>
    </div>
  );
};

export default Breadcrumb;
