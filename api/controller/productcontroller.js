const { products } = require("../../models");
const productValidations = require("../../validations/product");

const getProduct = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const countProduct = await products.count();

    const totalPage = Math.ceil(countProduct / limit);

    const data = await products.findAll({
      limit: limit,
      offset: offset,
    });
    const result = data.map((products) => ({
      status: "success",
      data: {
        id: products.id,
        namaproduct: products.namaproduct,
        Category: products.Category,
        harga: products.harga,
        
      },
    }));
    res.status(200).json({
      data: result,
      meta: {
        page: parseInt(page),
        totalPage: totalPage,
        totalData: countProduct,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const data = await products.findByPk(req.params.id, {
     
    });

    if (!data) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    const result = {
      status: "success",
      data
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
    try {
      const { errors } = productValidations.validateCreatePayload(req.body);
      if (errors) {
        return res.status(400).json({ status: "error", errors });
      }
  
      const { namaproduct, Category, harga } = req.body;
      if (!namaproduct|| !Category|| !harga) {
       return res.status(400).json({
            status:"error",message:"data tidak boleh kosong"
        })
      }
  
      // Pastikan product tersedia dan create dapat dipanggil
      const newProduct = await products.create({
        namaproduct,
        Category,
        harga,
      });
  
      res.status(201).json({
        status: "success",  
        data: newProduct,
        message: "Create Data Successfully",
      });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  };

const updateProduct = async (req, res) => {
  try {
    const { errors } = productValidations.validateUpdatePayload(req.body);
    if (errors) {
      return res.status(400).json({ errors });
    }

    const { id } = req.params;
    const { namaproduct, Category, harga } = req.body;

    const [updated] = await products.update(
      {
      namaproduct,
      Category,
      harga,
      },
      {
        where: { id },
      }
    );

    if (updated === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    const updatedProduct = await products.findByPk(id);

    // Respon sukses
    res.status(200).json({
      status: "success",
      message: "Update Data Successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await products.findByPk(req.params.id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    await products.destroy({ where: { id: req.params.id } });

    res
      .status(200)
      .json({ status: "success", message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};