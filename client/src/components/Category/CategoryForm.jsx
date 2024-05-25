import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchCategories = async () => {
    const res = await axios.get(
      "http://localhost:2000/api/v1/catagory/getAllCategory"
    );

    setCategories(res.data.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(
        `http://localhost:2000/api/v1/catagory/editCategory/${currentId}`,
        {
          name,
        }
      );
    } else {
      await axios.post("http://localhost:2000/api/v1/catagory/createCategory", {
        name,
      });
    }
    setName("");
    setEditing(false);
    fetchCategories();
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditing(true);
    setCurrentId(category.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:2000/api/v1/catagory/deleteCategory/${id}`
    );
    fetchCategories();
  };

  return (
    <div>
      <h2>Category Master</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{editing ? "Update" : "Add"}</button>
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => handleEdit(category)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryForm;
