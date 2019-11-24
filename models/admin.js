'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    account: DataTypes.INTEGER,
    pass: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    rname: DataTypes.STRING,
    lastip: DataTypes.STRING
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
    Admin.belongsTo(models.Account, {
      foreignKey: 'account',
      onDelete: 'CASCADE'
    });
  };
  return Admin;
};
