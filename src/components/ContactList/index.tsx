import React from "react";
import ContactItem from "../ContactItem";
import { Card, Flex } from "antd";
import "./style.css";

type TContactList = {
  header: string;
  contacts: { name: string; type: string; number: string; isFavorite: boolean; avatar: string }[];
};

export default function ContactList({ header, contacts }: TContactList) {
  return (
    <div className="text-primary-100 w-full">
      <h5 className="font-bold mb-3 text-body-small md:text-heading-5">{`${header} (${contacts.length})`}</h5>
      <Card className="lg:p-0 py-[23px] px-[18px] rounded-xl shadow-[0px_5px_30px_0px_#0000000D] lg:shadow-none lg:border-none" id="contact-list">
        <Flex vertical gap={12}>
          {contacts.map((contact, index) => (
            <Card className="border-white lg:border-primary-300" id="contact-item">
                <ContactItem key={index} {...contact} />
            </Card>
          ))}
        </Flex>
      </Card>
    </div>
  );
}