import  { useEffect, useState } from "react";
import iconInfo from "/images/homepage/info.svg";
import iconTransfer from "/images/homepage/tf-kartu.svg";
import iconEwallet from "/images/homepage/tf-e-wallet.svg";
import iconBuy from "/images/homepage/Pembelian.svg";
import iconInvest from "/images/homepage/investasi.svg";
import iconCardless from "/images/homepage/Cardless.svg";
import { Button, Modal } from "antd";
import { FormatCurrency, formatNorek, formattedTimeWithColon } from "../../../utils";
import { formattedDate } from "../../../utils";
import { useAuth } from "../../../hooks/useAuth";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const MenuList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState<number>();
  const [error, setError] = useState<AxiosError | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(error)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchBalance = async () => {
    const token = user?.token;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getBalance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.data.balance);
    } catch (error) {
      setError(error as AxiosError);
    }
  };
  useEffect(() => {
    fetchBalance();
  }, []);
  return (
    <>
      {/* {loading ? (
        <div className="grid grid-cols-3 md:grid-cols-6 py-4 gap-y-4 rounded-lg border border-primary-300">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div className="py-3 px-10 rounded-xl flex justify-center">
                {" "}
                <Space key={i}>
                  <Skeleton.Image
                    active
                    style={{ width: "75px", height: "75px" }}
                  />
                </Space>
              </div>
            ))}
        </div>
      ) : ( */}
        <div className="grid grid-cols-3 md:grid-cols-6 py-4 gap-y-4 rounded-lg border border-primary-300 ">
          <div className=" text-center" aria-modal="true" aria-live="polite">
            <img
              src={iconInfo}
              onClick={showModal}
              alt="info"
              className="mx-auto w-16 p-3 shadow-md rounded-xl border border-primary-300 cursor-pointer"
            />
            <Modal
              open={isModalOpen}
              footer={
                <Button
                  onClick={handleCancel}
                  className="w-full bg-primary-100 text-neutral-100 font-semibold"
                  aria-label="Kembali ke beranda"
                >
                  Kembali ke Beranda
                </Button>
              }
              onCancel={handleCancel}
              closable={false}
            >
              <h1 className="text-body-large text-primary-100 font-semibold text-center">
                Info Saldo
              </h1>

              <div className="border rounded-xl p-5 my-7 shadow-sm">
                <p
                  className="text-primary-100"
                  aria-label={`Tanggal saat ini: ${formattedDate}`}
                >
                  {formattedDate}, {formattedTimeWithColon}
                </p>
                <p
                  className="text-primary-100 font-semibold py-2"
                  aria-label={`Nomor Rekening: ${String(
                    formatNorek(user?.user.account_number)
                  )}`}
                >
                  {formatNorek(user?.user.account_number)}
                </p>

                <p
                  className="text-body-large font-semibold"
                  aria-label={`${balance?.toLocaleString("id-ID")} Rupiah`}
                >
                  {FormatCurrency(balance)}
                </p>
              </div>
            </Modal>
            <p className="pt-2">Info</p>
          </div>
          <div className=" text-center" onClick={() => navigate("/bca")}>
            <img
              src={iconTransfer}
              alt="Transfer"
              aria-label="Transfer"
              className="mx-auto w-16 p-3 shadow-md cursor-pointer rounded-xl border border-primary-300"
            />
            <p className="pt-2">Transfer</p>
          </div>
          <div
            className="text-center"
            aria-label="E-wallet"
            onClick={() => navigate("/e-wallet")}
          >
            <img
              src={iconEwallet}
              alt="E-Wallet"
              className="mx-auto w-16 p-3 shadow-md rounded-xl border border-primary-300 cursor-pointer"
            />
            <p className="pt-2">E-Wallet</p>
          </div>
          <button
            type="button"
            disabled
            className="cursor-not-allowed text-center"
            aria-label="Pembelian"
          >
            <img
              src={iconBuy}
              alt="pembelian"
              className="mx-auto bg-gray-200 w-16 p-3 shadow-md rounded-xl border border-primary-300"
            />
            <p className="pt-2">Pembelian</p>
          </button>
          <button
            disabled
            className="cursor-not-allowed text-center"
            aria-label="Investasi"
          >
            <img
              src={iconInvest}
              alt="invest"
              className="mx-auto w-16 p-3 bg-gray-200 shadow-md rounded-xl border border-primary-300"
            />
            <p className="pt-2">Investasi</p>
          </button>
          <button
            disabled
            className="cursor-not-allowed text-center"
            aria-label="Cardless"
          >
            <img
              src={iconCardless}
              alt="cardless"
              className="mx-auto w-16 p-3 bg-gray-200 shadow-md rounded-xl border border-primary-300"
            />
            <p className="pt-2">Cardless</p>
          </button>
        </div>
      {/* )} */}
    </>
  );
};
