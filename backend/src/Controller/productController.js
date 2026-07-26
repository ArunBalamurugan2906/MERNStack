import product from "../model/productSchema.js";

const createProduct = async (req, res) => {
  const { title, price, description, category, image, rating } = req.body;
  try {
    const createItem = await product.create({
      title,
      price,
      description,
      category,
      image,
      rating,
    });
    res.status(201).json({ message: "Created Product Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const totalProduct = await product.find({});
    res.status(200).json(totalProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const getProduct = await product.findById(id);
    if (!getProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ getProduct });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      res.status(400).json({ message: "Invalid Product Id" });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updateItem = await product.findById(id);
    if (!updateItem) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    updateItem.title = req.body.title || updateItem.title;
    updateItem.price = req.body.price || updateItem.price;
    updateItem.description = req.body.description || updateItem.description;
    updateItem.category = req.body.category || updateItem.category;
    updateItem.image = req.body.image || updateItem.image;
    if (req.body.rating) {
      updateItem.rating.rate = req.body.rating.rate ?? updateItem.rating.rate;
      updateItem.rating.count =
        req.body.rating.count ?? updateItem.rating.count;
    }
    const saveProduct = await updateItem.save();
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      res.status(400).json({ message: "Invalid Product Id" });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteItem = await product.findByIdAndDelete(id);
    if (!deleteItem) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      res.status(400).json({ message: "Invalid Product Id" });
    }
    res.status(500).json({ message: error.message });
  }
};

export {
  createProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
