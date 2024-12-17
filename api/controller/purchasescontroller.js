const { purchases, products } = require("../../models");
const product = require("../../models/product");
const purchasesValidations = require("../../validations/purchases");

const getPurchases = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const countPurchases = await purchases.count();

    const totalPage = Math.ceil(countPurchases / limit);

    const data = await purchases.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: products,
          as: "products", // Sesuaikan alias dengan definisi asosiasi di model Sequelize
          attributes: ["id", "namaproduct", "harga"],
        },
      ],
    });

    const result = data.map((purchases) => ({
      status: "success",
      data: {
        id: purchases.id,
        namaproduct: purchases.products.namaproduct,
        jumlah: purchases.jumlah,
        harga: purchases.harga,
      
      },
    }));

    res.status(200).json({
      data: result,
      meta: {
        page: parseInt(page),
        totalPage: totalPage,
        totalData: countPurchases,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPurchasesById = async (req, res) => {
  try {
    const data = await purchases.findByPk(req.params.id, {
      include: [
        {
          model: products,
          as: "products",
          attributes: ["id", "namaproduct","harga"],
        },
      ],
    });

    if (!data) {
      return res
        .status(404)
        .json({ status: "error", message: "Purchases not found" });
    }

    const result = {
      status: "success",
      data: {
        id: data.id,
        product_id: {
         data: data.products
        },
        jumlah: data.jumlah,
        harga: data.harga,
       
      },
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message,error:"error" });
  }
};

const createPurchases = async (req, res) => {
  try {
    const { errors } = purchasesValidations.validateCreatePayload(req.body);
    if (errors) {
      return res.status(400).json({ status: "error", errors });
    }

    const { product_id, jumlah, harga } = req.body;
    if (!product_id || !jumlah || !harga) {
      return res.status(400).json({
        status: "error",
        message: "Product ID and quantity are required",
      });
    }

    // Cek apakah produk dengan productId ada di database
    

    // Buat data pembelian
    const newPurchases = await purchases.create({
      product_id, // Foreign key dari tabel products
      jumlah,
      harga, // Harga total
    });

    res.status(201).json({
      status: "success",
      data: newPurchases,
      message: "Purchase created successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


const updatePurchases = async (req, res) => {
  try {
    const { errors } = purchasesValidations.validateUpdatePayload(req.body);
    if (errors) {
      return res.status(400).json({ errors });
    }

    const { id } = req.params;
    const { namaproduct, jumlah, harga, productId } = req.body;

    const purchase = await purchases.findByPk(id);
    if (!purchase) {
      return res
        .status(404)
        .json({ status: "error", message: "Purchases not found" });
    }

    if (productId) {
      const product = await products.findByPk(productId);
      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Product not found",
        });
      }
    }

    await purchases.update(
      { namaproduct, jumlah, harga, productId },
      { where: { id } }
    );

    const updatedPurchases = await purchases.findByPk(id, {
      include: [
        {
          model: products,
          as: "product",
          attributes: ["id", "name", "price", "stock"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: updatedPurchases,
      message: "Update Data Successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const deletePurchases = async (req, res) => {
  try {
    const deletedPurchases = await purchases.findByPk(req.params.id);

    if (!deletedPurchases) {
      return res
        .status(404)
        .json({ status: "error", message: "Purchases not found" });
    }

    await purchases.destroy({ where: { id: req.params.id } });

    res
      .status(200)
      .json({ status: "success", message: "Purchases deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  getPurchases,
  getPurchasesById,
  createPurchases,
  updatePurchases,
  deletePurchases,
};
