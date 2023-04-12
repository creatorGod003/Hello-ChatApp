import React, { useState } from "react";
import ContactHeader from "./ContactHeader";
import ContactList from "./ContactList";


// Contact component which is responsible for showing contact header and contact list

const Contact = () => {

  return (
    <div className="row-span-full col-span-2 h-screen bg-gray-700 p-4 border-r-2 border-gray-300  select-none">
      <ContactHeader/>
      <ContactList/>
    </div>
  );
};

export default Contact;
