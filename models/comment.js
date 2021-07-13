module.exports = function(sequelize, Sequelize) {
    const Comment = sequelize.define('comments', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        employeeId: {
            type: Sequelize.INTEGER,
            field: 'employee_id'
        },
        postId: {
            type: Sequelize.INTEGER,
            field: "post_id"
        },
        comment : {
            type: Sequelize.TEXT,
            trim: true,
            allowNull: false 
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_at'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at'
        },
        deletedAt: {
            type: Sequelize.DATE,
            field: 'deleted_at'
        }
    },{
        timestamps: true
    })
    module.exports = Comment;
    return Comment;
};