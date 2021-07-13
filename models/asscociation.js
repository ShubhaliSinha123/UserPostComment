module.exports = function (model) {

    model.user.hasOne(model.employee, {
        foreignKey: 'userId',
    });

    model.employee.belongsTo(model.user, {
        foreignKey: 'userId',
    });

    model.user.hasMany(model.post, {
        foreignKey: 'userId',
    });

    model.post.belongsTo(model.user, {
        foreignKey: 'userId',
    });

    model.employee.hasMany(model.comment, {
        foreignKey: 'employeeId',
    });

    model.comment.belongsTo(model.employee, {
        foreignKey: 'employeeId',
    });

    model.post.hasMany(model.comment, {
        foreignKey: 'postId',
    });

    model.comment.belongsTo(model.post, {
        foreignKey: 'postId',
    });
};