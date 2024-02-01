"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("comments_product", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            comment: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.INTEGER,
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                references: {
                    model: "register_users",
                    key: "id"
                }
            },
            productId: {
                type: Sequelize.INTEGER,
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                references: {
                    model: "register_products",
                    key: "id"
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("comments_product")
    }
}