import { Flex } from "antd";
import dotIcon from "/images/icons/ic_dot.svg";
import { Heart } from "@phosphor-icons/react";
import { EwalletUser } from "../../types/E-Wallet";


export default function CustomerItem({ ewallet_user_image_path,ewallet_name,ewallet_user_name,ewallet_user_phone_number,favorite }:EwalletUser ) {
 
  return (
    <Flex justify="space-between" className="text-primary-100 font-bold cursor-pointer" align="center">
      <Flex gap="1rem">
        <img src={ewallet_user_image_path} alt="avatar" className="size-[47px] md:size-[54px]" />
        <Flex vertical gap={4} justify="center">
          <h6 className="text-caption-small md:text-body-large">{ewallet_user_name.toLocaleUpperCase()}</h6>
          <Flex gap={5} align="center">
            <span className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{ewallet_name.toLocaleUpperCase()}</span>
            {/* <Dot size={32} /> */}
            <img src={dotIcon} alt="dot-icon" className="size-[5px] md:size-[8px]"/>
            <span className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{ewallet_user_phone_number}</span>
          </Flex>
        </Flex>
      </Flex>
      {favorite !== undefined && (
        <Heart weight={`${favorite ? "fill" : "regular"}`} className="size-[22px] md:size-[32px]" />
      )}
    </Flex>
  );
}
