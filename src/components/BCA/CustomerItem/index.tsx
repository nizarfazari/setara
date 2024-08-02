import React from "react";
import { Flex } from "antd";
import dotIcon from "/images/icons/ic_dot.svg";
import { Heart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

type TContactItemProps = {
  name: string;
  no: string;
  service_name: string;
  account_name: string;
  bank_name: string;
  account_number: string;
  favorite?: boolean;
  user_image_path: string;
};

const CustomerItem: React.FC<TContactItemProps> = ({ name, no, service_name, account_name, bank_name, account_number, favorite, user_image_path }) => {
  return (
    <Link to={"/bca/transfer-antar-bca/nominal-topup/" + (account_number || no)}>
      <Flex justify="space-between" className="text-primary-100 font-bold cursor-pointer" align="center">
        <Flex gap="1rem">
          <img src={user_image_path} alt="avatar" className="w-[47px] h-[47px] md:w-[54px] md:h-[54px]" />
          <Flex vertical gap={4} justify="center">
            <h6 className="text-caption-small md:text-body-large">{account_name || name}</h6>
            <Flex gap={5} align="center">
              <span className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{bank_name || service_name}</span>
              <img src={dotIcon} alt="dot-icon" className="w-[5px] h-[5px] md:w-[8px] md:h-[8px]" />
              <span className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{account_number || no}</span>
            </Flex>
          </Flex>
        </Flex>
        {favorite !== undefined && (
          <Heart weight={`${favorite ? "fill" : "regular"}`} className="w-[22px] h-[22px] md:w-[32px] md:h-[32px]" />
        )}
      </Flex>
    </Link>
  );
};

export default CustomerItem;
