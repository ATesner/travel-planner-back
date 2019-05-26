const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
 
module.exports = function(app, express) {
 
  const userController = require('../controller/user.controller');
  const tripController = require('../controller/trip.controller');
  const countryController = require('../controller/country.controller');
  const visaController = require('../controller/visa.controller');

  var apiRoutes = express.Router();

  //** USER CONTROLLER */
  apiRoutes.post('/signup', [ verifySignUp.checkUserParams, verifySignUp.checkDuplicateEmail], userController.signup); 
  apiRoutes.post('/signin', userController.signin);
 
  //** TRIP CONTROLLER */
  apiRoutes.get('/trips', [ authJwt.verifyToken ], tripController.getTrip);
  apiRoutes.post('/trip', [ authJwt.verifyToken ], tripController.addTrip);
  apiRoutes.delete('/trip', [ authJwt.verifyToken ], tripController.deleteTrip);

  //** COUNTRY CONTROLLER */
  apiRoutes.get('/countries', countryController.getCountries);

  //** VISA CONTROLLER */
  apiRoutes.get('/visa', visaController.getVisa);

  // app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
  // app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
  // app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

  app.use('/api', apiRoutes);
}