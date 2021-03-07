// store token secrets
require('dotenv').config();
const auth_router = require("express").Router();
const jwt = require('jsonwebtoken')

let refreshTokens = []


auth_router.post('/register', (req, res) => {
  res.end("register!!!!")
  // TODO
})

auth_router.post('/login', (req, res) => {
  const username = req.body.username;
  if (!username) return res.sendStatus(401)
  const user = { name: username }
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
})

auth_router.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken })
  })
})

auth_router.post('/logout', (req, res) => {
  // TODO
})


function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30min' })
}


module.exports = auth_router;
