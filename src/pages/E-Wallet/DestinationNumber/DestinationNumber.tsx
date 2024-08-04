import DestinationNumber from "../../../components/DestinationNumber";
import CustomerList from "../../../components/CustomerList";
import { Card, Flex, Skeleton } from "antd";
import "./style.css";
import Breadcrumb from "../../../components/Breadcumb";
import { useParams } from "react-router-dom";
import { capitalFirstLetter } from "../../../utils";
import { useAuth } from "../../../hooks/useAuth";
import { useFetchData } from "../../../hooks/useFetchData";
import { ResponseEWallet } from "../../../types/E-Wallet";



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
  const { user } = useAuth();

  const { data, isLoading, isError } = useFetchData<ResponseEWallet>(`/saved-ewallet-users?ewalletName=${capitalFirstLetter(slug)}`, user?.token);
  console.log(data)

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
        <Breadcrumb title={capitalFirstLetter(slug)} subtitle='Masukkan Nomor Tujuan Transfer' />
      </div>
      <div className="w-full mb-12 flex flex-col lg:flex-row gap-6 justify-center items-start">
        <DestinationNumber pathUrl={`/e-wallet/${slug}`} contacts={DAFTAR_TERSIMPAN} />
        <Card className="border-white lg:border-[#E4EDFF] w-full" id="contacts">
          {data ? (
            <Flex vertical gap={30} align="start">
              <CustomerList pathUrl={`/e-wallet/${slug}`} header="Daftar Favorit" contacts={data.favorites} />
              <CustomerList pathUrl={`/e-wallet/${slug}`} header="Daftar Tersimpan" contacts={data.saved} />
            </Flex>
          ) : <></>}

        </Card>
      </div>
    </div>
  );
}
