const {prisma} = require('../prisma/')

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = await 
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
