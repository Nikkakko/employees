const login = async (req, res) => {
  res.send('login');
};

const register = async (req, res) => {
  res.send('reg');
};

const current = async (req, res) => {
  res.send('curr');
};

module.exports = {
  login,
  register,
  current,
};
