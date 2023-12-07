const Sequelize = require('sequelize')

class Chat extends Sequelize.Model {
    static initiate(sequelize){
        Chat.init({
            owner : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            title : {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            chatting : {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            writer : {
                type: Sequelize.TEXT,
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored:false,
            modelName: 'Chat',
            tableName: 'chats',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};

module.exports = Chat;