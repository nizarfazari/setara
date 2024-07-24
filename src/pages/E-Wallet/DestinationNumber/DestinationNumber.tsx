import DestinationNumber from "../../../components/DestinationNumber";
import CustomerList from "../../../components/CustomerList";
import Avatar from "/images/avatar.svg";
import { Card, Flex } from "antd";
import "./style.css";
import Breadcrumb from "../../../components/Breadcumb";
import { useParams } from "react-router-dom";
import { capitalFirstLetter } from "../../../utils";

const DAFTAR_FAVORIT = [
  {
    name: "Aurlyn Puspita",
    type: "OVO",
    number: "0877283746112",
    isFavorite: true,
    avatar: Avatar,
  },
  {
    name: "Ferri Mahendra",
    type: "OVO",
    number: "0899832104522",
    isFavorite: true,
    avatar: "https://ui-avatars.com/api/?name=Ferri+Mahendra&background=EFEFEF&color=115DA9&rounded=true",
  },
];

const DAFTAR_TERSIMPAN = [
  {
    name: "Kevin Atmajaya",
    type: "OVO",
    number: "089812492821",
    isFavorite: false,
    avatar: "https://ui-avatars.com/api/?name=Kevin+Atmajaya&background=EFEFEF&color=115DA9&rounded=true",
  },
  {
    name: "Felin Agustina",
    type: "OVO",
    number: "088812194203",
    isFavorite: false,
    avatar: "https://ui-avatars.com/api/?name=Felin+Agustina&background=EFEFEF&color=115DA9&rounded=true",
  },
  {
    name: "Helmi Bayu",
    type: "OVO",
    number: "081928476322",
    isFavorite: false,
    avatar: "https://ui-avatars.com/api/?name=Helmi+Bayu&background=EFEFEF&color=115DA9&rounded=true",
  },
];

export default function DestinationNumberPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="container">
      <div className="my-[30px]">
        <Breadcrumb title={capitalFirstLetter(slug)} subtitle='Masukkan Nomor Tujuan Transfer' />
      </div>
      <div className="w-full mb-12 flex flex-col lg:flex-row gap-6 justify-center items-start">
        <DestinationNumber  pathUrl={`/e-wallet/${slug}`} contacts={DAFTAR_TERSIMPAN}/>
        <Card className="border-white lg:border-[#E4EDFF] w-full" id="contacts">
          <Flex vertical gap={30} align="start">
            <CustomerList pathUrl={`/e-wallet/${slug}`} header="Daftar Favorit" contacts={DAFTAR_FAVORIT} />
            <CustomerList pathUrl={`/e-wallet/${slug}`} header="Daftar Tersimpan" contacts={DAFTAR_TERSIMPAN} />
          </Flex>
        </Card>
      </div>
    </div>
  );
}
