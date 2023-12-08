const Sequelize = require('sequelize')

class User extends Sequelize.Model {
    static initiate(sequelize){
        User.init({
            email : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            char: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            name : {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            major : {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            age: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            mbti: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            mediaid: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            idtype: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            smoke: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored:false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};

module.exports = User;