const express = require('express');
const app = express();

app.use(express.json());


function authenticateUser(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  

  const userToken = authorization.split(' ')[1];
  const user = getUserFromToken(userToken);
  if (!user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  req.user = user;
  next();
}