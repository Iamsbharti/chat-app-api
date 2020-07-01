const { response, validatePassword } = require("../lib");
const { ValidEmail, ValidPassword } = require("../lib/paramsValidation");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  //inputvalidation
  validateInput = () => {
    let isInputValid = ValidEmail(email) === email;
    return isInputValid
      ? Promise.resolve(req)
      : Promise.reject(response(true, "Input Params Not Valid", email));
  };
  //check for email existence
  emailExistence = async () => {
    console.log("email existence call");
    let user = await User.findOne({ email: email });
    //console.log(user.password);
    return !user
      ? Promise.reject(response(true, "user doesn't exists", email))
      : Promise.resolve(user);
  };
  //compare password
  credentialMatch = async (user) => {
    console.log("cred-match", password, user.password);
    let result = await validatePassword(password, user.password);
    console.log("result", result);

    return !result
      ? response(true, "Email or password is wrong", null)
      : Promise.resolve(user);
  };
  //
  try {
    await validateInput()
      .then(emailExistence)
      .then((user) => {
        credentialMatch(user).then((results) => {
          res.send(results);
        });
      });
  } catch (error) {
    console.log("Error", error);
    res.send(error);
  }
};
