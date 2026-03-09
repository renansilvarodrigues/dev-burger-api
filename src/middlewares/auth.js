import jwt from 'jsonwebtoken';
import authConfig from './../config/auth.js';

const authMiddleware = (request, response, next) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token is missing' });
  }
  const token = authToken.split(' ')[0];

  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw Error();
      }

      request.userId = decoded.id;
    });
  } catch (_err) {
    return response.status(401).json({ error: 'Token is invalid' });
  }

  return next();
};

export default authMiddleware;
