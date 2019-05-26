
checkUserParams = (req, res, next) => {

  let newUser = req.body;
  //email and password and email are mandatory. Password must be 8 or more characters
  if( newUser.email == null || newUser.email.trim() == "" 
    || newUser.password == null || newUser.password.trim().length < 8
    || newUser.name == null || newUser.name.trim() == "") {

      res.status(400).json({ 
        success: false, 
        message: "Tous les champs sont requis. Le mot de passe doit faire au moins 8 caractères" 
      });
      return;
    }
    next();
}

checkDuplicateEmail = (req, res, next) => {

  // -> Check Email is already in use
  let stmt = "SELECT * FROM users where email = ?";
  db.query(stmt, [ req.body.email ], (err, results) => {
      if (err) {
          res.status(500).send({ success: false, message: err });
      } else {

        if(results.length > 0) {
          res.status(400).json({ success: false, message: "Cet email est déjà pris !" });
          return;
        }
        next();
      }
  })
}
 
const signUpVerify = {};
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;
signUpVerify.checkUserParams = checkUserParams;
 
module.exports = signUpVerify;