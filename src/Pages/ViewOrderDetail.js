import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function ViewOrderDetail() {
  const [order, setOrders] = useState([]);
  const firebase = useFirebase();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    firebase.getOrders(params.bookId).then((res) => setOrders(res));
  }, []);
  return <div>ViewOrderDetail</div>;
}

export default ViewOrderDetail;
