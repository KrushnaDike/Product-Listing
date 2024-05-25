import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchCategories = async () => {
    const res = await axios.get(
      "http://localhost:2000/api/v1/catagory/getAllCategory"
    );
    setCategories(res.data.categories);
  };

  const fetchProducts = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:2000/api/v1/product/getAllProducts?page=${page}&pageSize=10`
      );
      
      setProducts(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(page);
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(
        `http://localhost:2000/api/v1/product/editProduct/${currentId}`,
        {
          name,
          categoryId,
        }
      );
    } else {
      await axios.post("http://localhost:2000/api/v1/product/createProduct", {
        name,
        categoryId,
      });
    }
    setName("");
    setCategoryId("");
    setEditing(false);
    fetchProducts(page);
  };

  const handleEdit = (product) => {
    setName(product.name);
    setCategoryId(product.categoryId);
    setEditing(true);
    setCurrentId(product.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:2000/api/v1/product/deleteProduct/${id}`
    );
    fetchProducts(page);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <h2>Product Master</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">{editing ? "Update" : "Add"}</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.Category.name}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductForm;
