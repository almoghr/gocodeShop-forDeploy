const Product = require("../models/product");
const { productAllowedUpdates } = require('./constants/allowedUpdates')
const serverResponse = require('./utils/serverResponse')

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return serverResponse(res, 200, allProducts);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    return serverResponse(res, 200, product);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
};

const getAllproductsByMatchingCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const product = await Product.find({ category });
    return serverResponse(res, 200, product);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body });
    await product.save();
    return serverResponse(res, 200, product);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOneAndDelete({ _id: productId });
    return serverResponse(res, 200, product);
  } catch (e) {
    return serverResponse(res, 500, { message: "internal error occured" + e });
  }
};

const updateProduct =  async (req,res) => {
    const productId = req.params.productId

        const updates = Object.keys(req.body);
        const isValidOperation = updates.every((update) =>
          productAllowedUpdates.includes(update)
        );
      
        if (!isValidOperation) {
          return serverResponse(res, 400, { message: "Invalid updates" });
        }
      
        try {
            const product = await Product.findOne({_id: productId})
          if (!product) {
            return serverResponse(res, 404, { message: "product does not exist" });
          }
          updates.forEach((update) => (product[update] = req.body[update]));
          await product.save();
          return serverResponse(res, 200, product);
        } catch (err) {
          return serverResponse(res, 500, {
            message: "Internal error while trying to update user",
          });
        }
}

module.exports = {
  getAllProducts,
  getProductById,
  getAllproductsByMatchingCategory,
  addProduct,
  deleteProduct,
  updateProduct
};
