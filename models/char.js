'use strict';
module.exports = (sequelize, DataTypes) => {
  const Char = sequelize.define('Char', {
    login: DataTypes.STRING,
    cash: DataTypes.INTEGER,
    bankmoney: DataTypes.INTEGER,
    number: DataTypes.INTEGER
  }, {});
  Char.associate = function(models) {
    // associations can be defined here
    Char.belongsTo(models.Account, {
      foreignKey: 'account',
      onDelete: 'CASCADE',
    });
  };
  return Char;
};
