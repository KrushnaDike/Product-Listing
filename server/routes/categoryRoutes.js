import Express from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  getSingleCategory,
  testing,
} from "../controller/categoryController.js";

export default Express.Router()

  .get("/cat", testing)
  .post("/createCategory", createCategory)
  .get("/getAllCategory", getAllCategory)
  .get("/getSingleCategory/:id", getSingleCategory)
  .put("/editCategory/:id", editCategory)
  .delete("/deleteCategory/:id", deleteCategory);
