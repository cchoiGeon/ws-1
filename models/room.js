const Sequelize = require('sequelize')

class Room extends Sequelize.Model {
    static initiate(sequelize){
        Room.init({
            title : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            password : {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            count : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            owner : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored:false,
            modelName: 'Room',
            tableName: 'rooms',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};

module.exports = Room;