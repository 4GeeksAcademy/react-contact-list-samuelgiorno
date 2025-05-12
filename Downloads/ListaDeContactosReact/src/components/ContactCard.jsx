import React from "react";
import PropTypes from "prop-types";

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="card my-2">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-1">{contact.full_name}</h5>
          <p className="mb-0"><strong>Email:</strong> {contact.email}</p>
          <p className="mb-0"><strong>Phone:</strong> {contact.phone}</p>
          <p className="mb-0"><strong>Address:</strong> {contact.address}</p>
        </div>
        <div>
          <button className="btn btn-sm btn-primary me-2" onClick={onEdit}>Edit</button>
          <button className="btn btn-sm btn-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ContactCard;
