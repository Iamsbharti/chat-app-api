const { response, validatePassword } = require("../lib");
const { ValidEmail, ValidPassword } = require("../lib/paramsValidation");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password);
  //inputvalidation
  validateInput = () => {
    let isInputValid = ValidEmail(email) === email;
    return isInputValid
      ? Promise.resolve(req)
      : Promise.reject(response(true, "Input Params Not Valid", email));
  };
  //check for email existence
  emailExistence = async () => {
    //console.log("email existence call");
    let user = await User.findOne({ email: email });
    //console.log(user.password);
    return !user
      ? Promise.reject(response(true, "user doesn't exists", email))
      : Promise.resolve(user);
  };
  //compare password
  credentialMatch = async (user) => {
    //console.log("cred-match", password, user.password);
    let result = await validatePassword(password, user.password);
    console.log("result", result);

    return !result
      ? Promise.reject(response(true, "Email or password is wrong", null))
      : Promise.resolve(user);
  };
  //

  validateInput()
    .then(emailExistence)
    .then((user) => {
      credentialMatch(user)
        .then((results) => {
          console.log(results);
          res.send(results);
        })
        .catch((error) => {
          /**Error (promise reject handler) for wrong cred */
          console.log(error);
          res.send(error);
        });
    })
    .catch((err) => {
      console.log("errorhandler");
      console.log(err);
      res.send(err);
    });
};
