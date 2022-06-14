
/*
* This will hold game instances: game # burgers eaten, burger type and user who played
*/

// module.exports = function(sequelize, DataTypes) {
//     var Game = sequelize.define("Game", {
//       burger: DataTypes.TEXT,
//       numEaten: DataTypes.INTEGER
//     });
//     Game.associate = function(models) {
//       Game.belongsTo(models.User, {
//         foreignKey: {
//           allowNull: false
//         }
//       });
//       Game.belongsTo(models.User, {
//         foreignKey: {
//           allowNull: false
//         }
//       });
//     };
//     return Game;
// }



const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init(
  {
    ninja: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'game',
  }
);

module.exports = Game;