import Category from "../models/category.js";

export const testing = (req, res, next) => {
  res.send("Server running");
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });

    return res.status(201).json({
      success: true,
      category,
      message: "New category created successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json({
      success: true,
      categories,
      message: "Data fetched successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    await Category.update({ name }, { where: { id } });

    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    await Category.destroy({ where: { id } });

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error(error);
  }
};
