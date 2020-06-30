exports.response = (error, message, data) => {
  let res = {
    error: error,
    message: message,
    data: data,
  };
  return res;
};
