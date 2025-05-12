import React from "react";
import ContactForm from "../components/ContactForm";

const EditContact = () => {
  return (
    <div className="container">
      <h2 className="mt-4">Edit Contact</h2>
      <ContactForm mode="edit" />
    </div>
  );
};

export default EditContact;