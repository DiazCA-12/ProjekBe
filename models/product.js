'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi hasMany ke tabel purchases
      products.hasMany(models.purchases, {
        foreignKey: 'product_id', 
        as: 'purchases', 
      });
    }
  }

  products.init(
    {
      namaproduct: DataTypes.STRING,
      Category: DataTypes.STRING, 
      harga: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'products', 
    }
  );

  return products;
};
