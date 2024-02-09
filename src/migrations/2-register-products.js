'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("register_products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            slug: {
                type: Sequelize.STRING,
            },
            fileNameImage: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            total: {
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            category: {
                type: Sequelize.STRING,
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("register_products")
    }
}