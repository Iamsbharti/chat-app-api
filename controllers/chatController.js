const { validateGetChatParams } = require("../lib/paramsValidation");
const { request } = require("express");
const { response } = require("../lib");
exports.getChatForUser = (req, res) => {
  console.log("get chat for user route control");
  console.log("params", req.query);
  validateRequest = () => {
    console.log("validate func");
    let result;
    if (validateGetChatParams(req)) {
      result = Promise.resolve(req);
    } else {
      result = Promise.reject(
        response(true, 403, "Input Paramters are not Valid", null)
      );
    }
    return result;
  };
  getChatDetails = () => {
    console.log("get chat details");
    return Promise.resolve(true);
  };
  validateRequest()
    .then(getChatDetails)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status).json(error);
    });
};
