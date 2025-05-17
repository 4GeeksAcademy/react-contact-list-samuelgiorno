import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "../store";
import ContactCard from "../components/ContactCard";
import ConfirmModal from "../components/ConfirmModal";

function Home() {
  const navigate = useNavigate();
  const { state, dispatch, fetchContacts, deleteContact} = useStore();
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    const initializeAgendaAndLoadContacts = async () => {
      dispatch({ type: "SET_LOADING" });
      
      try {
        const response = await fetch(
          "https://playground.4geeks.com/contact/agendas/samuelgiorno/contacts", 
          { headers: { Accept: "application/json" }}
        );

        if (response.status === 404) {
          await fetch("https://playground.4geeks.com/contact/agendas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: "samuelgiorno" }),
          });
        } 

        await fetchContacts();

      } catch (error) {
        console.error("Error loading contacts:", error);
        toast.error("Failed to load contacts");
        dispatch({ type: "SET_ERROR", payload: error.message });
      }

       
    };
    initializeAgendaAndLoadContacts();
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
      {state.error && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {state.error}
        </div>
      )}

      <Link to="/add" className="btn btn-success mt-3">Add new contact</Link>

      {state.loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : Array.isArray(state.contacts) && state.contacts.length > 0 ? (
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

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm delete</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this contact?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
