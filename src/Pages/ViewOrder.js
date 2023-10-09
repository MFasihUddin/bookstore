import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/BookCard";

function ViewOrder() {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase.fetchMyBooks().then((books) => setBooks(books.docs));
    }
  }, [firebase.isLoggedIn]);
  return (
    <div>
      {books.map((book) => (
        <BookCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
}

export default ViewOrder;
