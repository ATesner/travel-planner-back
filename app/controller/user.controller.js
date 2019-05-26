const config = require('../config/config.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
 
exports.signup = (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");
  let stmt = `INSERT INTO users(name, email, password, customer) VALUES(?, ?, ?, ?)`;
  
  let newUser = req.body;
  let passwordHash = bcrypt.hashSync(req.body.password, 8);
  let params = [newUser.name, newUser.email, passwordHash, 1];

  // execute the insert statment
  db.query(stmt, params, (err, results, fields) => {
      if (err) {
          res.status(500).send({ success: false, message: err });
      } else {
          res.status(200).json({ success: true, message: "Utilisateur créé avec succés !" });
      }
  });

}
 
exports.signin = (req, res) => {
  console.log("Sign-In");
 
  let stmt = `SELECT * FROM users WHERE email = ?`;

  // execute the insert statment
  db.query(stmt, [ req.body.email ], (err, results, fields) => {
    if (err) {
        res.status(404).send({ success: false, message: err });
    } else {
      if(results.length == 1 && req.body.password){
        let user = results[0];
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        
        if (!passwordIsValid) {
          return res.status(401).send({ success: false, message: "Mot de passe incorrect !" });
        }
        
        var jwttoken = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).json({ success: true, accesstoken: jwttoken });
      }else{
        return res.status(401).send({ success: false, message: "User introuvable !" });
      }
    }
  });
}
 
// exports.userContent = (req, res) => {
//   User.findOne({
//     where: {id: req.userId},
//     attributes: ['name', 'username', 'email'],
//     include: [{
//       model: Role,
//       attributes: ['id', 'name'],
//       through: {
//         attributes: ['userId', 'roleId'],
//       }
//     }]
//   }).then(user => {
//     res.status(200).json({
//       "description": "User Content Page",
//       "user": user
//     });
//   }).catch(err => {
//     res.status(500).json({
//       "description": "Can not access User Page",
//       "error": err
//     });
//   })
// }
 
// exports.adminBoard = (req, res) => {
//   User.findOne({
//     where: {id: req.userId},
//     attributes: ['name', 'username', 'email'],
//     include: [{
//       model: Role,
//       attributes: ['id', 'name'],
//       through: {
//         attributes: ['userId', 'roleId'],
//       }
//     }]
//   }).then(user => {
//     res.status(200).json({
//       "description": "Admin Board",
//       "user": user
//     });
//   }).catch(err => {
//     res.status(500).json({
//       "description": "Can not access Admin Board",
//       "error": err
//     });
//   })
// }
 
// exports.managementBoard = (req, res) => {
//   User.findOne({
//     where: {id: req.userId},
//     attributes: ['name', 'username', 'email'],
//     include: [{
//       model: Role,
//       attributes: ['id', 'name'],
//       through: {
//         attributes: ['userId', 'roleId'],
//       }
//     }]
//   }).then(user => {
//     res.status(200).json({
//       "description": "Management Board",
//       "user": user
//     });
//   }).catch(err => {
//     res.status(500).json({
//       "description": "Can not access Management Board",
//       "error": err
//     });
//   })
// }