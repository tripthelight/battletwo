export default (_case, _msg) => {
  return {
    errCase: _case ?? 'errorComn',
    message: _msg ? `local peer : ${_msg}` : 'local peer error.',
    sendMsg: _msg ? `remote peer : ${_msg}` : 'remote peer error.',
  };
};
