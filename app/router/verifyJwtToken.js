const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  
  if (!token){
    return res.status(403).send({ 
      success: false, message: 'Token non fourni.' 
    });
  }
 
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err){
      return res.status(500).send({ 
          success: false, 
          message: 'Echec authentification. Erreur -> ' + err 
        });
    }
    req.userId = decoded.id;
    next();
  });
}
 
isAdmin = (req, res, next) => {
  
  let stmt = `SELECT * FROM users WHERE id = ?`;
  
  db.query(stmt, [ req.userId ], (err, results) => {
    if (err) {
      return res.status(500).send({ success: false, message: err });
  } else {

      if(results.length == 1) {
        let user = results[0];
        if(!user.customer) {
          next();
        }else{
          return res.status(403).send({ success: false, message: 'Accès refusé' })
        }
      }else{
        return res.status(500).json({ success: false, message: '2 users trouvés !' });
      }
  }
  });

}
 
const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
 
module.exports = authJwt;