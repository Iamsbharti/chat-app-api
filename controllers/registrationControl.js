const { response, hashedPassword } = require("../lib");
const { ValidEmail, ValidPassword } = require("../lib/paramsValidation");
const User = require("../models/User");

exports.test = (req, res) => {
  res.status(200).json(response(false, "Test Sucess", " welcome to chat-app"));
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  //validate input
  validateInput = () => {
    let isParamsValidated =
      ValidEmail(email) === email && ValidPassword(password) === password;

    console.log(isParamsValidated);
    let result = isParamsValidated
      ? Promise.resolve(req)
      : Promise.response(true, "Params Not Valid", "email or password");

    return result;
  };
  //store to db

  createUser = async () => {
    let newUser = new User({
      email: email,
      password: await hashedPassword(password),
    });
    let createdUser = await User.create(newUser);
    return response(false, "User Create Success", createUser);
  };

  //send response

  try {
    await validateInput()
      .then(createUser)
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    console.warn(error);
    res.send(error);
  }
};
