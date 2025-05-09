
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteConfirmation = ({ show, handleClose, handleConfirm, itemType, hasChildren }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hasChildren ? (
          <>
            <p>Are you sure you want to delete this {itemType} and all its connected cards?</p>
            <p className="text-danger"><strong>Warning:</strong> This will delete all cards in the branch. This action cannot be undone.</p>
          </>
        ) : (
          <p>Are you sure you want to delete this {itemType}? This action cannot be undone.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
