import React, { useState, ChangeEventHandler } from "react";
import DestinationNumber from "../../../components/BCA/DestinationNumber";
import CustomerList from "../../../components/BCA/CustomerList";
import { Card, Flex, Skeleton } from "antd";
import "./style.css";
import Breadcrumb from "../../../components/Breadcumb";
import { useParams } from "react-router-dom";
import { capitalFirstLetter } from "../../../utils";
import { useAuth } from "../../../hooks/useAuth";
import { useFetchData } from "../../../hooks/useFetchData";
import { ResponseBank, BankUser } from "../../../types/Bank";

export default function DestinationNumberPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, setRecipients } = useAuth();
  const [favorites, setFavorites] = useState<BankUser[]>([]);
  const [saved, setSaved] = useState<BankUser[]>([]);
  const [filteredResults, setFilteredResults] = useState<BankUser[]>([]);
  const [search, setSearch] = useState("");
  console.log(search)

  const { data, isLoading, isError, refetch } = useFetchData<ResponseBank>("/saved-accounts", user?.token);
  console.log(isError)

  React.useEffect(() => {
    if (data) {
      setFavorites(data.favorites);
      setSaved(data.saved);
    }
  }, [data]);

  const combinedAccounts = [...favorites, ...saved];

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setFilteredResults([]);
    } else {
      const result = combinedAccounts.filter(
        (item) => item.account_name.toLowerCase().includes(value.toLowerCase()) || item.account_number.includes(value)
      );
      setFilteredResults(result);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="my-[30px] w-[500px]">
          <Skeleton active paragraph={{ rows: 1 }} className="mt-4" />
        </div>
        <div className="w-full mb-12 flex flex-col lg:flex-row gap-6 justify-center items-start">
          <Card className="w-full border-white md:border-primary-300">
            <Skeleton.Button active block size="large" />
            <Skeleton active paragraph={{ rows: 0 }} className="mt-10" />
            <Skeleton.Input active block size="large" />
          </Card>
          <Card className="border-white lg:border-[#E4EDFF] w-full">
            <Card className="w-full border-white md:border-primary-300">
              <Skeleton paragraph={{ rows: 0 }} />
              <Flex vertical gap={30} align="start">
                <Skeleton active avatar paragraph={{ rows: 1 }} />
                <Skeleton active avatar paragraph={{ rows: 1 }} />
              </Flex>
            </Card>
            <Card className="w-full border-white md:border-primary-300 mt-6">
              <Skeleton paragraph={{ rows: 0 }} />
              <Flex vertical gap={30} align="start">
                <Skeleton active avatar paragraph={{ rows: 1 }} />
                <Skeleton active avatar paragraph={{ rows: 1 }} />
              </Flex>
            </Card>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="my-[30px]">
        <Breadcrumb title={capitalFirstLetter(slug)} subtitle="Masukkan Nomor Tujuan Transfer" />
      </div>
      <div className="w-full mb-12 flex flex-col lg:flex-row gap-6 justify-center items-start">
        <div className="lg:basis-1/2 w-full">
          {data && (
            <DestinationNumber pathUrl={`bca/${slug}`} bank={data ?? []} onSearch={handleSearch} />
          )}
          <div className="mt-6">
            <CustomerList header="Hasil Pencarian" contacts={filteredResults} setRecipients={setRecipients} pathUrl={""} refetch={refetch} />
          </div>
        </div>
        <div className="lg:basis-1/2 w-full">
          <Card className="border-white lg:border-[#E4EDFF] w-full" id="contacts">
            {data && (
              <Flex vertical gap={30} align="start">
                <CustomerList pathUrl={`bca/${slug}`} header="Daftar Favorit" contacts={data.favorites} setRecipients={setRecipients} refetch={refetch} />
                <CustomerList pathUrl={`bca/${slug}`} header="Daftar Tersimpan" contacts={data.saved} setRecipients={setRecipients} refetch={refetch} />
              </Flex>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
