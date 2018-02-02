const mongoose = require('mongoose'),
      UserModel = require('@BudgetmanagerModels/user');

const models = {
  User: mongoose.model('User')
}
module.exports = models;