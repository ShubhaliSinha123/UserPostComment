module.exports = function(sequelize, Sequelize) {
    const Employee = sequelize.define('employees', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            field: 'user_id'
        },
        companyName: {
            type: Sequelize.TEXT,
            field: "company_name",
            defaultValue: 'Mindrops pvt. ltd.'
        },
        post: {
            type: Sequelize.TEXT,
        },
        address: {
            type: Sequelize.STRING,
            trim: true
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
    module.exports = Employee;
    return Employee;
};