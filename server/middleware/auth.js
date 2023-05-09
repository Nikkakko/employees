const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

const auth = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  // Check for token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload
    req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
    next();
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
