const Sequelize = require('sequelize')

class User extends Sequelize.Model {
    static initiate(sequelize){
        User.init({
            email : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            chatting : {
                type: Sequelize.TEXT,
                allowNull: false,
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