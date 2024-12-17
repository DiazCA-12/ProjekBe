'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi belongsTo ke tabel products
      purchases.belongsTo(models.products, {
        foreignKey: 'product_id', 
        as: 'products', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'  
      });
    }
  }

  purchases.init(
    {
      product_id: DataTypes.INTEGER,
      jumlah: DataTypes.INTEGER,
      harga: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'purchases',
    }
  );
  return purchases;
};
