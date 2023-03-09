import React, { useState } from "react";
import ContactHeader from "./ContactHeader";
import ContactList from "./ContactList";

const Contact = () => {

    
  return (
    <div className="row-span-full col-span-2 bg-gray-700 p-4 overflow-y-hidden border-r-2 border-gray-300">
      <ContactHeader/>
      <ContactList/>
    </div>
  );
};

export default Contact;
