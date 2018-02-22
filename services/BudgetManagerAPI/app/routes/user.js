const models = require('@BudgetManager/app/setup');

module.exports = (app) => {
  app.route('/api/v1/signup').post(api.signup(models.User));
}