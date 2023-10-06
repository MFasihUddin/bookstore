import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

function List() {
  const [name, setName] = useState("");
  const [isbnNumber, setisbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const { handleCreate } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreate(name, isbnNumber, price, coverPic);
  };
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            placeholder="Enter Book Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN Number</Form.Label>
          <Form.Control
            type="number"
            name="isbnNumber"
            onChange={(e) => setisbnNumber(e.target.value)}
            value={isbnNumber}
            required
            placeholder="ISBN Number"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
            placeholder="Price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Book Image</Form.Label>
          <Form.Control
            type="file"
            name="coverPic"
            onChange={(e) => setCoverPic(e.target.files[0])}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default List;
