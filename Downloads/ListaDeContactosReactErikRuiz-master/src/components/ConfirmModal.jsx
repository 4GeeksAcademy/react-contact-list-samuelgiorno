<ConfirmModal
  show={showModal}
  onCancel={() => setShowModal(false)}
  onConfirm={handleDelete}
  title="Confirm delete"
  message="Are you sure you want to delete this contact?"
/>
