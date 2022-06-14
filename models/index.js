const User = require('./User');
const Project = require('./Project');
const Game = require('./Game')

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: "CASCADE"
})

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

Game.belongsTo(User, {
  foreignKey: 'user_id'
})



module.exports = { User, Project, Game };
