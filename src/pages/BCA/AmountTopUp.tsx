import Breadcrumb from "../../components/Breadcumb";
import { Card, Flex } from "antd";
import CustomerItem from "../../components/BCA/CustomerItem";
import FormTopUp from "../../components/FormTopUp";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";




export default function AmountTopUpPage() {
  const { slug } = useParams<{ slug: string }>();
  const { transactions } = useAuth();
  console.log(transactions);
  const USER = {
    id: '',
    account_name: transactions.recipients.nama,
    bank_name: transactions.recipients.bank,
    account_number: transactions.recipients.numberDestination,
    user_image_path: transactions.recipients.imageUrl,
  };



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
              <h5 tabIndex={0} className="text-primary-100 mb-2 text-body-small md:text-heading-5">Penerima</h5>
              <CustomerItem {...USER} />
            </div>
            <FormTopUp pathUrl={`/bca/${slug}`} isTfBa />
          </Flex>
        </Card>
      </div>
    </div>
  );
}
