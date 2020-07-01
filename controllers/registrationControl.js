const { response } = require("../lib");
const { ValidEmail, ValidPassword } = require("../lib/paramsValidation");
exports.test = (req, res) => {
  res.status(200).json(response(false, "Test Sucess", " welcome to chat-app"));
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  //validate input
  validateInput = () => {
    let isParamsValidated = ValidEmail(email) && ValidPassword(password);
    if (isParamsValidated) {
      console.log("params validated");
      return Promise.resolve("validated");
    } else {
      console.log("params not valid");
      return Promise.reject("not validated");
    }
  };
  //store to db
  //send response

  try {
    await validateInput().then((resolved) => {
      res.send(resolved);
    });
  } catch (error) {
    console.warn(error);
    res.send(error);
  }
};
