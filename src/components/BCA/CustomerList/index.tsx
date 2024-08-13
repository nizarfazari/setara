import CustomerItem from "../CustomerItem";
import { Card, Flex } from "antd";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { BankUser } from "../../../types/Bank";
import { recipientsData } from "../../../types/Transaction";


type TContactList = {
  pathUrl: string;
  header: string;
  contacts: BankUser[];
  setRecipients: (recipients: recipientsData) => void;
  refetch : () => void
};

export default function CustomerList({  header, contacts, setRecipients, refetch }: TContactList) {
  const navigate = useNavigate();

  const onClickCard = (contact: BankUser) => {
    setRecipients({
      nama: contact.account_name,
      bank: contact.bank_name,
      numberDestination: contact.account_number,
      imageUrl: contact.user_image_path,
      wallet:  contact.bank_name,
      account_number: ""
    });
    navigate(`/bca/transfer-antar-bca/nominal-topup/`);
  };

  return (
    <div className="text-primary-100 w-full">
      <h5 className="font-bold mb-3 text-body-small md:text-heading-5">{`${header} (${contacts.length})`}</h5>
      {contacts.length !== 0 ? (
        <Card
          className="lg:p-0 py-[23px] px-[18px] rounded-xl shadow-[0px_5px_30px_0px_#0000000D] lg:shadow-none lg:border-none"
          id="contact-list"
        >
          <Flex vertical gap={12}>
            {contacts.map((contact, index) => (
              <Card className="border-white lg:border-primary-300" id="contact-item" key={index} onClick={() => onClickCard(contact)}>
                <CustomerItem {...contact} refetch={refetch} />
              </Card>
            ))}
          </Flex>
        </Card>
      ) : (
        <p className="text-neutral-300 text-center font-bold text-caption-large md:text-body-large">Daftar Kosong</p>
      )}
    </div>
  );
}
