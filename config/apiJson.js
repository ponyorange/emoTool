const toJson = (code = -1, message = '无返回消息', data = undefined) => {
  return {code, message, data}
};


module.exports = toJson;
