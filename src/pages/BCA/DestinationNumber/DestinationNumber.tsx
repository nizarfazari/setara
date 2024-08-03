import DestinationNumber from "../../../components/BCA/DestinationNumber";
import CustomerList from "../../../components/BCA/CustomerList";
import { Card, Flex } from "antd";
import "./style.css";
import Breadcrumb from "../../../components/Breadcumb";
import { useParams } from "react-router-dom";
import { ChangeEventHandler, useEffect, useState } from "react";

export default function DestinationNumberPage() {
  const [favorites, setFavorites] = useState([]);
  const [saved, setSaved] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const token = JSON.parse(localStorage.getItem('user') || "").token;
  
  useEffect(() => {
    fetch(`https://setara-api-service-production.up.railway.app/api/v1/saved-accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Ganti dengan token yang valid
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data.data.favorites);
        setSaved([...data.data.saved, ...data.data.favorites]);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted.");
        }
      });
  }, [refresh]);

  const accountSaved = saved.map(item => ({
    account_name: item.account_name,
    account_number: item.account_number,
    user_image_path: item.user_image_path,
    bank_name: item.bank_name,
    favorite: item.favorite
  }));

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setFilteredResults([]);
    } else {
      const result = accountSaved.filter(
        (item) => item.account_name.toLowerCase().includes(value.toLowerCase()) || item.account_number.includes(value)
      );
      setFilteredResults(result);
    }
  };

  {filteredResults.length !== 0 ? (
    console.log(filteredResults)
  ):(console.log("kosong ngab"))}



  const { slug } = useParams<{ slug: string }>();
  return (
    <>
    <div className="container">
      <div className="my-[30px]">
      <Breadcrumb title='Transfer Antar BCA' subtitle='Masukkan Nomor Tujuan Transfer' />

      </div>
      <div className="w-full mb-12 flex flex-col lg:flex-row gap-6 justify-center items-start">
      <div className="basis-1/2">
        <DestinationNumber onSearch={handleSearch} searchValue={search} pathUrl={""}/>
        <div className="mt-6">
          <CustomerList header="Hasil Pencarian" contacts={filteredResults} pathUrl={""} refresh={refresh} setRefresh={setRefresh}/>
        </div>
      </div>
      <div className="basis-1/2">
        <Card className="border-white lg:border-[#E4EDFF] w-full" id="contacts">
          <Flex vertical gap={30} align="start">
            <CustomerList header="Daftar Favorit" contacts={favorites} pathUrl={""} refresh={refresh} setRefresh={setRefresh}/>
            <CustomerList header="Daftar Tersimpan" contacts={saved} pathUrl={""} refresh={refresh} setRefresh={setRefresh}/>
          </Flex>
        </Card>
      </div>
      </div>
    </div>
    </>
  );
}