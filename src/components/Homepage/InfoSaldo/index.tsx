import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Avatar, List, notification, Skeleton } from "antd";
import { GoDotFill } from "react-icons/go";
import { CopySimple, Eye, EyeSlash } from "@phosphor-icons/react";
import { FormatCurrency, formatNorek } from "../../../utils/index";
import SkeletonInput from "antd/es/skeleton/Input";
import { useAuth } from "../../../hooks/useAuth";

const InfoSaldo: React.FC = () => {
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>();
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuth();
  const dots = new Array(7).fill(null);

  const fetchBalance = async () => {
    const token = user?.token;
    setLoading(true);
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
      notification.error({
        message: "Error",
        description: "Terjadi kesalahan saat memuat saldo.",
        duration: 2, // Duration in seconds
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBalance();
    }
  }, [user]);

  const copyToClipboard = () => {
    const accountNumber = user?.user?.account_number;

    if (accountNumber) {
      navigator.clipboard
        .writeText(accountNumber.toString())
        .then(() => {
          notification.success({
            message: "Success",
            description: "No. Rekening berhasil disalin",
            duration: 2, // Duration in seconds
          });
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          notification.error({
            message: "Error",
            description: "Tidak dapat menyalin nomor rekening.",
            duration: 2, // Duration in seconds
          });
        });
    } else {
      notification.error({
        message: "Error",
        description: "No. Rekening tidak tersedia.",
        duration: 2, // Duration in seconds
      });
    }
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden((prev) => !prev);
  };

  return (
    <>
      {loading ? (
        <div className="my-3 border p-5 md:w-1/3 grid gap-3">
          <SkeletonInput active size="small" />
          <Skeleton loading={loading} active avatar></Skeleton>
        </div>
      ) : (
        <div>
          <div className="my-3">
            <div
              className="bg-primary-100 rounded-lg md:w-1/3 px-7 py-5"
              aria-live="polite"
            >
              <h5
                className="text-white font-bold text-heading-6 mb-7"
                aria-label="Informasi Saldo Rekening"
              >
                Informasi Saldo Rekening
              </h5>
              <div className="flex gap-7">
                <img
                  src={user?.user.image_path}
                  alt="Foto profil pengguna"
                  className="w-16 h-16"
                />
                <div>
                  <div className="items-center">
                    <h5 className="text-neutral-50">Total Saldo</h5>
                    <div className="flex gap-2">
                      <h5 className="text-heading-6 font-semibold text-neutral-50">
                        {isBalanceHidden ? (
                          <span
                            className="text-neutral-50 flex gap-0"
                            aria-label="Saldo tersembunyi"
                          >
                            {dots.map((_, index) => (
                              <GoDotFill key={index} aria-hidden="true" />
                            ))}
                          </span>
                        ) : (
                          <span>{FormatCurrency(balance)}</span>
                        )}
                      </h5>
                      <button
                        onClick={toggleBalanceVisibility}
                        aria-label={
                          isBalanceHidden
                            ? "Saldo ditampilkan"
                            : "Saldo disembunyikan"
                        }
                      >
                        {isBalanceHidden ? (
                          <span className="text-neutral-100">
                            <Eye weight="fill" aria-label="Tampilkan saldo" />
                          </span>
                        ) : (
                          <span className="text-neutral-50">
                            <EyeSlash
                              weight="fill"
                              aria-label="Sembunyikan Saldo"
                            />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-neutral-100 text-caption-small mt-3 flex gap-2 items-center">
                    No. Rekening:
                    <span className="font-bold text-caption-large">
                      {formatNorek(user?.user.account_number)}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      aria-label={`Salin nomor rekening ${formatNorek(
                        user?.user.account_number
                      )}`}
                      className="items-center"
                    >
                      <CopySimple
                        size={16}
                        weight="fill"
                        aria-label="salin nomer rekening"
                      />
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoSaldo;
