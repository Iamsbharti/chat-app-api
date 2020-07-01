const { response, hashedPassword } = require("../lib");
const { ValidEmail, ValidPassword } = require("../lib/paramsValidation");
const User = require("../models/User");

exports.test = (req, res) => {
  res.status(200).json(response(false, "Test Sucess", " welcome to chat-app"));
};

exports.register = async (req, res) => {
  const { firstName, lastName, mobile, email, password } = req.body;
  console.log(email, password);
  //validate input
  validateInput = () => {
    let isParamsValidated =
      ValidEmail(email) === email && ValidPassword(password) === password;

    console.log(isParamsValidated);
    let result = isParamsValidated
      ? Promise.resolve(req)
      : Promise.reject(response(true, "Params Not Valid", "email or password"));

    return result;
  };
  //store to db

  createUser = async () => {
    let newUser = new User({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
      password: await hashedPassword(password),
    });

    //check for existing email
    let user = await User.findOne({ email: email });
    if (user)
      return Promise.reject(response(true, "user already exists", email));

    //create user
    let userCreated = await User.create(newUser);
    return Promise.resolve(userCreated);
  };

  //send response

  try {
    await validateInput()
      .then(createUser)
      .then((result) => {
        delete result.password;
        res.status(200).send(response(false, "user Create success", result));
      });
  } catch (error) {
    console.warn(error);
    res.send(error);
  }
};
