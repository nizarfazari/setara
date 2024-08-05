import { Flex } from "antd";
import dotIcon from "/images/icons/ic_dot.svg";
import { Heart } from "@phosphor-icons/react";

type TContactItemProps = {
  name: string;
  type: string;
  number: string;
  isFavorite?: boolean;
  avatar: string;
};

export default function CustomerItem({ name, type, number, isFavorite, avatar }: TContactItemProps) {
  console.log(isFavorite);
  return (
    <Flex justify="space-between" className="text-primary-100 font-bold cursor-pointer" align="center">
      <Flex gap="1rem">
        <img src={avatar} alt="avatar" className="size-[47px] md:size-[54px]" />
        <Flex vertical gap={4} justify="center">
          <h6 className="text-caption-small md:text-body-large">{name.toUpperCase()}</h6>
          <Flex gap={5} align="center">
            <span className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{type}</span>
            {/* <Dot size={32} /> */}
            <img src={dotIcon} alt="dot-icon" className="size-[5px] md:size-[8px]"/>
            <span className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{number}</span>
          </Flex>
        </Flex>
      </Flex>
      {isFavorite !== undefined && (
        <Heart weight={`${isFavorite ? "fill" : "regular"}`} className="size-[22px] md:size-[32px]" />
      )}
    </Flex>
  );
}
