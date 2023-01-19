const jwt = require('jsonwebtoken');

const { User } = require('../models');
const CustomError = require('../utils/custom-error');

module.exports = async (req, res, next) => {
  try {
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjc0MDMyMDkzLCJleHAiOjIyNzg4MzIwOTN9.zC9f4IAfIbvH4VpbTNXTCb-Y9r4DfeH0P3H6aOeUuZI
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new CustomError('you are unauthorized', 401));
    }
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      return next(new CustomError('you are unauthorized', 401));
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
