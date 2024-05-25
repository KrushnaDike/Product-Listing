import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CategoryForm from "./components/Category/CategoryForm";
import ProductForm from "./components/Products/ProductForm";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/categories">Category Master</Link>
            </li>
            <li>
              <Link to="/products">Product Master</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/categories" element={<CategoryForm />} />
          <Route path="/products" element={<ProductForm />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
};

const Homepage = () => {
  return <h2>Welcome to the CRUD Application</h2>;
};

export default App;
