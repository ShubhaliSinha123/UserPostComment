module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        role: {
            type: Sequelize.ENUM("designer", "developer", "admin", "hr", "coder", "tester"),
            defaultValue: "coder",
            allowNull: false
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        password: {
            type: Sequelize.TEXT,
            default: sequelize.UUIDV4
        },
        phone: {
            type: Sequelize.TEXT,
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
    module.exports = User;
    return User;
};

