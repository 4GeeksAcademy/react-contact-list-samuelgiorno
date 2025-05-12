import React from "react";
import ContactForm from "../components/ContactForm";

const AddContact = () => {
  return (
    <div className="container">
      <h2 className="mt-4">Add New Contact</h2>
      <ContactForm mode="add" />
    </div>
  );
};

export default AddContact;
