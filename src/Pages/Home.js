import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";
import BookCard from "../components/BookCard";

function Home() {
  const [books, setBooks] = useState([]);

  const { allList } = useFirebase();
  useEffect(() => {
    allList().then((res) => setBooks(res.docs));
  }, []);

  return (
    <div className="container mt-5">
      <CardGroup>
        {books.map((book) => (
          <React.Fragment key={book.id}>
            <BookCard
              link={`book/view/${book.id}`}
              id={book.id}
              {...book.data()}
            />
          </React.Fragment>
        ))}
      </CardGroup>
    </div>
  );
}

export default Home;
