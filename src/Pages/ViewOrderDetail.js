import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function ViewOrderDetail() {
  const [orders, setOrders] = useState([]);
  const firebase = useFirebase();
  const params = useParams();
  useEffect(() => {
    firebase.getOrders(params.bookId).then((res) => setOrders(res.docs));
  }, [firebase]);
  return (
    <div className="container mt-3">
      <h1>Orders</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
            key={data.userID}
          >
            <h3>Order By : {data.userName}</h3>
            <h4>Qunatity : {data.qty}</h4>
            <p>Email : {data.userEmail}</p>
          </div>
        );
      })}
    </div>




  );
}

export default ViewOrderDetail;
