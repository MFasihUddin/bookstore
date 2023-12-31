import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//components
import MyNavbar from "./components/MyNavbar";

//pages
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import List from "./Pages/List";
import Home from "./Pages/Home";
import BookDetail from "./Pages/BookDetail";
import ViewOrder from "./Pages/ViewOrder";
import ViewOrderDetail from "./Pages/ViewOrderDetail";

function firestore() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/list" element={<List />} />
        <Route path="/book/view/:bookId" element={<BookDetail />} />
        <Route path="/book/orders/" element={<ViewOrder />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetail />} />
      </Routes>
    </div>
  );
}

export default firestore;
