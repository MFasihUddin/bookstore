import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function BookDetail() {
  const [data, setData] = useState(null);
  const [qty, setQty] = useState(1);
  const [url, setURL] = useState(null);
  const { getBookById, getImageUrl, placeOrder } = useFirebase();
  const params = useParams();
  useEffect(() => {
    getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      getImageUrl(imageURL).then((url) => setURL(url));
    }
  }, [data]);

  const bookOrder = async () => {
    const result = await placeOrder(params.bookId, qty);
  };

  if (data === null) return <h1>Loading...</h1>;
  return (
    <div>
      <div className="container mt-5">
        <h1>{data.name}</h1>
        <img src={url} width="500px" style={{ borderRadius: "10px" }} />
        <h1>Details</h1>
        <h4>Price Rs.{data.price}</h4>
        <h1>Owner Details</h1>
        <p>Name: {data.displayName}</p>
        <p>Email: {data.userEmail}</p>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="qty"
            name="qty"
            onChange={(e) => setQty(e.target.value)}
            value={qty}
            required
            placeholder="Enter Quatity"
          />
        </Form.Group>
        <Button onClick={bookOrder} variant="success">
          Buy Now
        </Button>
      </div>
    </div>
  );
}

export default BookDetail;
