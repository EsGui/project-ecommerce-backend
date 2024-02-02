"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("response_comment", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            response: {
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
            commentId: {
                type: Sequelize.INTEGER,
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                references: {
                    model: "comments_product",
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
        await queryInterface.dropTable("response_comment")
    }
}