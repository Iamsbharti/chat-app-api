const { response, validatePassword, getAuthToken } = require("../lib");
const { ValidEmail } = require("../lib/paramsValidation");
const User = require("../models/User");
const Auth = require("../models/Auth");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password);
  //inputvalidation
  validateInput = () => {
    let isInputValid = ValidEmail(email) === email;
    return isInputValid
      ? Promise.resolve(req)
      : Promise.reject(response(true, 400, "Email Not Valid", email));
  };
  //check for email existence
  emailExistence = async () => {
    //console.log("email existence call");
    let user = await User.findOne({ email: email });
    //console.log(user.password);
    return !user
      ? Promise.reject(response(true, 404, "user doesn't exists", email))
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
      ? Promise.reject(response(true, 401, "Email or password is wrong", null))
      : Promise.resolve(userModified);
  };
  //generate authToken
  generateToken = async (userDetails) => {
    let res;
    getAuthToken(userDetails, (error, tokenDetails) => {
      if (error) {
        console.log(error);
        res = Promise.reject(response(true, 500, "Error", error));
      } else {
        tokenDetails.userDetails = userDetails;
        tokenDetails.userId = userDetails.userId;
        console.log("tokendetails", tokenDetails);
        res = Promise.resolve(tokenDetails);
      }
    });
    return res;
  };
  //save token for authorization needs
  saveAuthToken = async (userTokenDetails) => {
    const { authToken, userDetails } = userTokenDetails;
    const { created, userId } = userDetails;
    const tokenSecret = process.env.TOKEN_SECRET;
    let res;
    //search for existing token if found overwrite it
    let foundUsersAuth = await Auth.findOne({ userId: userId });
    if (foundUsersAuth) {
      //update
      let updateOptions = {
        authToken: authToken,
        tokenSecret: tokenSecret,
        tokenGenerationTime: created,
      };
      let updatedDetails = await foundUsersAuth.save(updateOptions);
      res = updatedDetails
        ? Promise.resolve(userTokenDetails)
        : Promise.reject(response(true, 500, "Save Token Error", error));
    } else {
      //create
      let newToken = new Auth({
        userId: userId,
        authToken: authToken,
        tokenSecret: tokenSecret,
        tokenGenerationTime: created,
      });
      let createdAuth = await Auth.create(newToken);

      res = updatedDetails
        ? Promise.resolve(userTokenDetails)
        : Promise.reject(response(true, 500, "Save Token Error", error));
    }
    return res;
  };
  /** Function start*/
  validateInput()
    .then(emailExistence)
    .then(credentialMatch)
    .then(generateToken)
    .then(saveAuthToken)
    .then((result) => {
      console.log("result-final", result);
      res.status(200).json(response(false, 200, "Login Success", result));
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status).json(error);
    });
};
