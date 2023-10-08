import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

function BookCard(props) {
  const { id, name, isbnNumber, price, imageURL, displayName, userEmail } =
    props;
  const { getImageUrl } = useFirebase();

  const navigate = useNavigate();

  const [url, setURL] = useState();
  useEffect(() => {
    getImageUrl(imageURL).then((imgURL) => setURL(imgURL));
  }, []);

  return (
    <div>
      <Card style={{ width: "18rem", margin: "15px" }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            This Book has a title {name} and this book is sold by {displayName}{" "}
            and this book costs Rs.{price}
          </Card.Text>
          <Button
            onClick={(e) => navigate(`book/view/${id}`)}
            variant="primary"
          >
            View
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookCard;
