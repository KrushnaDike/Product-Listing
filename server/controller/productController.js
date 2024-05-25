import Product from "../models/product.js";
import Category from "../models/category.js";

export const testing = (req, res, next) => {
  res.send("Server running");
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Name and categoryId are required.",
      });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    const product = await Product.create({ name, categoryId });

    return res.status(201).json({
      success: true,
      product,
      message: "New Product created successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const { count, rows } = await Product.findAndCountAll({
      include: [Category],
      limit: parseInt(pageSize),
      offset: parseInt(offset),
    });

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        totalItems: count,
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
        totalPages: Math.ceil(count / pageSize),
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found.",
        });
      }
    }

    await product.update({ name, categoryId });

    return res.status(200).json({
      success: true,
      product,
      message: "Product updated successfully.",
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await product.destroy();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [Category],
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
  }
};
