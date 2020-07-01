const { response } = require("../lib");
const { ValidEmail, ValidPassword } = require("../lib/paramsValidation");
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
  //send response

  try {
    await validateInput().then(createUser);
  } catch (error) {
    console.warn(error);
    res.send(error);
  }
};
