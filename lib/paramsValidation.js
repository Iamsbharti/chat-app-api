exports.ValidEmail = (mail) => {
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail.match(emailRegex)) {
    return mail;
  } else {
    return false;
  }
};

exports.ValidPassword = (password) => {
  let passwordRegex = /^[A-Za-z0-9]\w{7,}$/;
  if (password.match(passwordRegex)) {
    return password;
  } else {
    return false;
  }
};
exports.validateGetChatParams = (request) => {
  console.log("validataion", request.query);
  const { senderId, recieverId } = request.query;
  console.log(senderId, recieverId);
  if (
    senderId === undefined ||
    senderId === "" ||
    recieverId === undefined ||
    recieverId === ""
  ) {
    return false;
  }
  return true;
};
