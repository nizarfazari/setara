import Breadcrumb from "../../components/Breadcumb";
import { Card, Flex } from "antd";
import CustomerItem from "../../components/CustomerItem";
import FormTopUp from "../../components/FormTopUp";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";



export default function AmountTopUpPage() {
  const { slug } = useParams<{ slug: string }>();
  const { transWallet } = useAuth();


  const USER = {
    ewallet_user_name: transWallet.recipients.nama,
    ewallet_name: transWallet.recipients.wallet,
    ewallet_user_phone_number: transWallet.recipients.numberDestination,
    ewallet_user_image_path: transWallet.recipients.imageUrl,
  };
  console.log(transWallet)

  const toTitleCase = (str: string) => {
    return str.toLowerCase().split(' ').map((word: string) => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  return (
    <div className="container">
      <div className="my-[30px]">
        <Breadcrumb title={slug ? toTitleCase(slug) : 'Transfer'} subtitle="Masukkan Nominal Transaksi" />
      </div>
      <div className="w-full lg:max-w-[546px]">
        <Card className="border-white md:border-primary-300">
          <Flex vertical gap={28}>
            <div>
              <h5 className="text-primary-100 mb-2 text-body-small md:text-heading-5">Penerima</h5>
              <CustomerItem {...USER} />
            </div>
            <FormTopUp pathUrl={`/e-wallet/${slug}`} />
          </Flex>
        </Card>
      </div>
    </div>
  );
}
