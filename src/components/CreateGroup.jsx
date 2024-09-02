import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import { create } from "../api/group";

const CreateGroup = ({ refreshGroups }) => {
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await create({ groupName: e.target.elements.groupName.value })) {
      alert("Group created successfully");
      refreshGroups();
      return setShow(false);
    }

    alert("Group creation failed");
  };

  return (
    <>
      <div className="d-flex p-4 justify-content-end">
        <Button variant="primary" onClick={() => setShow(true)}>
          Create Group
        </Button>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                name="groupName"
                placeholder="Enter Group Name"
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateGroup;
