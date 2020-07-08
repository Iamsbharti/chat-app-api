const { validateGetChatParams } = require("../lib/paramsValidation");
const { response } = require("../lib");
const Chat = require("../models/Chat");
exports.getChatForUser = async (req, res) => {
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
  getChatDetails = async () => {
    const { senderId, recieverId } = req.query;

    console.log("get chat details");
    let findChatQuery = {
      $or: [
        {
          $and: [{ senderId: senderId }, { recieverId: recieverId }],
        },
        {
          $and: [{ recieverId: senderId }, { senderId: recieverId }],
        },
      ],
    };
    console.log("finding chat");
    let result;
    let foundChat = await Chat.find(findChatQuery)
      .select("-_id -__v -chatRoom") //remove params
      .sort("-createdOn") //sort based on date
      .skip(req.query.skip || 0) //for pagination purpose
      .lean() //convert mongoose doc to plain js objects
      .limit(10) //limit the no of chat returned ,controled for pagination---//execute
      .exec();
    console.log(foundChat);
    result = foundChat
      ? Promise.resolve(foundChat)
      : response(true, "Error fetching chat details", 401, error);

    return result;
  };
  validateRequest()
    .then(getChatDetails)
    .then((result) => {
      console.log("result-final", result);
      res.status(200).json(response(false, 200, "Chat Found", result));
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status).json(error);
    });
};
