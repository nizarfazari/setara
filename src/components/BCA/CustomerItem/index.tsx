import { Flex } from "antd";
import dotIcon from "/images/icons/ic_dot.svg";
import { Heart } from "@phosphor-icons/react";
import { BankUser } from "../../../types/Bank";
import { useAuth } from "../../../hooks/useAuth";
import { putData } from "../../../utils/GetData";
import { useNotification } from "../../../hooks/useNotification";
import { UpdateFavoriteResponse, UpdateFavourieRequest } from "../../../types/E-Wallet";

interface CustomerItemProps extends BankUser {
  refetch?: () => void;
}

export default function CustomerItem({ id, user_image_path, account_name, account_number, bank_name, favorite, refetch }: CustomerItemProps) {
  const { user } = useAuth();
  const { openNotificationWithIcon } = useNotification();

  const onClickFavourite = async (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    try {
      await putData<UpdateFavourieRequest, UpdateFavoriteResponse>('/favorite-account', {
        idTersimpan: id,
        favorite: !favorite
      }, user?.token);

      openNotificationWithIcon('success', 'Success', "Berhasil Mengganti Favorit");

      // Refetch data after successful update
      if (refetch) {
        refetch();
      }
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
          <h6 tabIndex={0} className="text-caption-small md:text-body-large">{account_name}</h6>
          <Flex gap={5} align="center">
            <span tabIndex={0} className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{bank_name}</span>
            <img src={dotIcon} alt="dot-icon" className="size-[5px] md:size-[8px]" />
            <span tabIndex={0} className="text-[10px] leading-[14px] font-normal md:font-bold md:text-caption-large">{account_number}</span>
          </Flex>
        </Flex>
      </Flex>
      {favorite !== undefined && (
        <Heart tabIndex={0} weight={`${favorite ? "fill" : "regular"}`} className="size-[22px] md:size-[32px] " onClick={onClickFavourite} />
      )}
    </Flex>
  );
}
