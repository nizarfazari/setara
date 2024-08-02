import Breadcrumb from "../../components/Breadcumb";
import { Card, Flex } from "antd";
import CustomerItem from "../../components/BCA/CustomerItem";
import FormTopUp from "../../components/FormTopUp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function AmountTopUpPage() {
const navigate = useNavigate();
const params = useParams();
const [contact, setContact] = useState();
useEffect(() => {
  fetch("https://setara-api-service-production.up.railway.app/api/v1/user/search-no-rek/" + params.id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKQU5FMTIzNCIsImlhdCI6MTcyMjUyODc4MSwiZXhwIjoxNzIyNjE1MTgxfQ.3ZHk3MvZGZDAhRvLSZfavj6XdkY5DcJB6sN6Viw3d6M' // Ganti dengan token yang valid
    }
  })
    .then((res) => res.json())
    .then((data) => {
      setContact(data.data);
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("fetch aborted.");
      }
    });
}, []);
console.log(contact)
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="container">
      <div className="my-[30px]">
        <Breadcrumb title={slug ? slug : 'Transfer'} subtitle="Masukkan Nominal Transaksi" />
      </div>
      <div className="w-full lg:max-w-[546px]">
        <Card className="border-white md:border-primary-300">
          <Flex vertical gap={28}>
            <div>
              <h5 className="text-primary-100 mb-2 text-body-small md:text-heading-5">Penerima</h5>
              <CustomerItem  {...contact} />
            </div>
            <FormTopUp pathUrl={`/bca/${slug}`}/>
          </Flex>
        </Card>
      </div>
    </div>
  );
}
