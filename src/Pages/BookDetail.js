import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function BookDetail() {
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const { getBookById, getImageUrl } = useFirebase();
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

  if (data === null) return <h1>Loading...</h1>;
  return (
    <div>
      <div className="container mt-5">
        <img src={url} width="500px" style={{ borderRadius: "10px" }} />
      </div>
    </div>
  );
}

export default BookDetail;
