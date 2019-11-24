'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    login: DataTypes.STRING
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
    Account.hasMany(models.Char, {
      foreignKey: 'account',
    });

    Account.hasOne(models.Admin, {
      foreignKey: 'account',
    });
  };
  return Account;
};
