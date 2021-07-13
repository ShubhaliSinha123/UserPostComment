module.exports = function(sequelize, Sequelize) {
    const Post = sequelize.define('posts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            field: 'user_id',
        },
        title: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        description: {
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
    module.exports = Post;
    return Post;
};