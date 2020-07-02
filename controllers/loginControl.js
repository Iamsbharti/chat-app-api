const { response, validatePassword, getAuthToken } = require("../lib");
const { ValidEmail } = require("../lib/paramsValidation");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password);
  //inputvalidation
  validateInput = () => {
    let isInputValid = ValidEmail(email) === email;
    return isInputValid
      ? Promise.resolve(req)
      : Promise.reject(response(true, "Email Not Valid", email));
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
    let userModified = user.toObject();
    //delete addition info
    delete userModified._id;
    delete userModified.__v;
    delete userModified.password;
    return !result
      ? Promise.reject(response(true, "Email or password is wrong", null))
      : Promise.resolve(userModified);
  };
  //generate authToken
  generateToken = async (userDetails) => {
    let res;
    getAuthToken(userDetails, (error, tokenDetails) => {
      if (error) {
        console.log(error);
        res = Promise.reject(response(true, "Error", error));
      } else {
        tokenDetails.userId = userDetails.userId;
        tokenDetails.userDetails = userDetails;
        res = Promise.resolve(tokenDetails);
      }
    });
    return res;
  };
  /** Function start*/
  validateInput()
    .then(emailExistence)
    .then(credentialMatch)
    .then(generateToken)
    .then((result) => {
      console.log("result", result);
      res.status(200).json(response(false, "Login Success", result));
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};
