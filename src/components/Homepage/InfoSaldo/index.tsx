import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { notification, Skeleton } from "antd";
import { CopySimple, Eye, EyeSlash, Circle } from "@phosphor-icons/react";
import { FormatCurrency, formatNorek } from "../../../utils/index";
import { useAuth } from "../../../hooks/useAuth";

const InfoSaldo: React.FC = () => {
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>();
  const [, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuth();
  const dots = new Array(7).fill(null);

  const fetchBalance = async () => {
    const token = user?.token;
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.VITE_API_URL}/user/getBalance`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            duration: 2,
          });
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          notification.error({
            message: "Error",
            description: "Tidak dapat menyalin nomor rekening.",
            duration: 2,
          });
        });
    } else {
      notification.error({
        message: "Error",
        description: "No. Rekening tidak tersedia.",
        duration: 2,
      });
    }
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden((prev) => !prev);
  };

  return (
    <div>
      {loading ? (
        <div className="my-3 border p-5 md:w-1/3 grid gap-3">
          <Skeleton loading={loading} active avatar></Skeleton>
        </div>
      ) : (
        <div>
          <div className="my-3">
            <div
              className="bg-primary-100 rounded-lg md:w-1/3 px-7 py-5"
              aria-live="polite"
            >
              <p tabIndex={0}
                className="text-white font-bold text-heading-6 mb-7"
                aria-label="Informasi Saldo Rekening"
              >
                Informasi Saldo Rekening
              </p>
              <div className="flex gap-7">
                <img
                  src={user?.user.image_path}
                  alt="Foto profil pengguna"
                  className="w-16 h-16"
                />
                <div>
                  <div tabIndex={0} className="items-center">
                    <p className="text-neutral-50">Total Saldo</p>
                    <div className="flex gap-2">
                      <p className="text-heading-6 font-semibold text-neutral-50">
                        {isBalanceHidden ? (
                          <span
                            className="text-neutral-50 flex gap-0 mt-1"
                            aria-label="Saldo tersembunyi"
                          >
                            {dots.map((_, index) => (
                              <Circle key={index} size={15} className="mx-1"  weight="fill" aria-hidden="true" />
                            ))}
                          </span>
                        ) : (
                          <span>{FormatCurrency(balance)}</span>
                        )}
                      </p>
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

                  <p tabIndex={0} className="text-neutral-100 text-caption-small mt-3 flex gap-2 items-center">
                    No. Rekening:
                    <span className="font-bold text-caption-large">
                      {formatNorek(user?.user.account_number)}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      aria-label={`Salin nomer rekening ${formatNorek(user?.user.account_number)}`}
                      className="items-center"
                    >
                      <CopySimple
                        size={16}
                        weight="fill"
                        aria-label="Salin nomer rekening"
                      />
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoSaldo;
