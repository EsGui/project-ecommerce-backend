const ResponseCommentModel = (sequelize, DataTypes) => {
    const ResponseComment = sequelize.define("ResponseComment", {
        response: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        commentId: DataTypes.INTEGER
    }, {
        tableName: "response_comment"
    });

    ResponseComment.associate = (db) => {
        ResponseComment.belongsTo(db.CommentsProduct, { as: "responseComment", foreignKey: "commentId" })
    }

    return ResponseComment;
}

module.exports = ResponseCommentModel;