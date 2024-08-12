import { Flex } from "antd";
import dotIcon from "/images/icons/ic_dot.svg";
import { Heart } from "@phosphor-icons/react";
import { BankUser } from "../../../types/Bank";

import { UpdateFavoriteResponse, UpdateFavourieRequest } from "../../../types/E-Wallet";
import { useAuth } from "../../../hooks/useAuth";
import { putData } from "../../../utils/GetData";
import { useNotification } from "../../../hooks/useNotification";

export default function CustomerItem({ id, user_image_path, account_name, account_number, bank_name, favorite }: BankUser) {
  const { user } = useAuth();
  
  const { openNotificationWithIcon } = useNotification();

  const onClickFavourite = async (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    try {
       await putData< UpdateFavourieRequest,UpdateFavoriteResponse>('/favorite-account', {
        idTersimpan: id,
        favorite: !favorite
      }, user?.token);

      openNotificationWithIcon('success', 'Success', "Berhasil Mengganti Favorit");
      window.location.reload()

    } catch (error) {
      openNotificationWithIcon('error', 'Error', "Gagal Mengganti Favorit");
      console.error(error);
    }
  }
  
  return (
    <Flex justify="space-between" className="text-primary-100 font-bold cursor-pointer" align="center">
      <Flex gap="1rem">
        <img src={user_image_path} alt="avatar" className="size-[47px] md:size-[54px]" />
        <Flex vertical gap={4} justify="center">
          <h6 className="text-caption-small md:text-body-large">{account_name}</h6>
          <Flex gap={5} align="center">
            <span className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{bank_name}</span>
            <img src={dotIcon} alt="dot-icon" className="size-[5px] md:size-[8px]" />
            <span className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{account_number}</span>
          </Flex>
        </Flex>
      </Flex>
      {favorite !== undefined && (
           <Heart weight={`${favorite ? "fill" : "regular"}`} className="size-[22px] md:size-[32px] " onClick={onClickFavourite} />
      )}
    </Flex>
  );
}
