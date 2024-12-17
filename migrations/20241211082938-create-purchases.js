'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products', // Nama tabel tujuan
          key: 'id'          // Kolom yang dirujuk
        },
        onUpdate: 'CASCADE', // Menyesuaikan foreign key jika `id` produk diperbarui
        onDelete: 'CASCADE'  // Menghapus pembelian jika produk terkait dihapus
      },
      jumlah: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      harga: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purchases');
  }
};
