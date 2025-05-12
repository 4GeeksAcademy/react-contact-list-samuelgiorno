import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import ContactCard from "../components/ContactCard";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal"; // ejemplo

function Home() {
  const { state, dispatch, fetchContacts, deleteContact } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ensureAgendaAndLoadContacts = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const res = await fetch("https://playground.4geeks.com/contact/agendas/samuelgiorno/contacts");

        if (res.status === 404) {
          await fetch("https://playground.4geeks.com/contact/agendas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: "samuelgiorno" }),
          });
        }

        await fetchContacts();
      } catch (error) {
        console.error("Error loading contacts:", error);
        dispatch({ type: "SET_ERROR", payload: "Error loading contacts" });
      }
    };

    ensureAgendaAndLoadContacts();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteContact(contactToDelete);
      toast.success("Contact deleted successfully");
    } catch {
      toast.error("Failed to delete contact");
    }
    setShowModal(false);
  };

  return (
    <div className="container">
      {state.error && <div className="alert alert-danger mt-3 text-center">{state.error}</div>}

      <Link to="/add" className="btn btn-success mt-3">Add new contact</Link>

      {state.loading ? (
        <LoadingSpinner />
      ) : state.contacts.length > 0 ? (
        state.contacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={() => {
              dispatch({ type: "SET_EDITING_CONTACT", payload: contact });
              navigate("/add");
            }}
            onDelete={() => {
              setContactToDelete(contact.id);
              setShowModal(true);
            }}
          />
        ))
      ) : (
        <p className="mt-3">No contacts available.</p>
      )}

      <ConfirmModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Confirm delete"
        message="Are you sure you want to delete this contact?"
      />
    </div>
  );
}

export default Home;
