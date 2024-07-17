import React from "react";
import { Flex } from "antd";
import heartIcon from "../../assets/icons/ic_heart.svg";
import heartFilledIcon from "../../assets/icons/ic_heart_filled.svg";
import dotIcon from "../../assets/icons/ic_dot.svg";

type TContactItemProps = {
  name: string;
  type: string;
  number: string;
  isFavorite: boolean;
  avatar: string;
};

export default function ContactItem({ name, type, number, isFavorite, avatar }: TContactItemProps) {
  return (
    <Flex justify="space-between" className="text-primary-100 font-bold cursor-pointer">
      <Flex gap="1rem">
        <img src={avatar} alt="avatar" className="size-[47px] md:size-[54px]" />
        <Flex vertical gap={4} justify="center">
          <h6 className="text-caption-small md:text-body-large">{name.toUpperCase()}</h6>
          <Flex gap={5} align="center">
            <span className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{type}</span>
            <img src={dotIcon} alt="dot-icon" className="size-[5px] md:size-[8px]"/>
            <span className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{number}</span>
          </Flex>
        </Flex>
      </Flex>
      <img src={isFavorite ? heartFilledIcon : heartIcon} alt="icon"/>
    </Flex>
  );
}
