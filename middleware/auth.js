const { validateToken } = require("../config/tokens");
function validateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    const { payload } = validateToken(token);

    req.user = payload;

    if (payload) return next();
  }
  res.sendStatus(401);
}
module.exports = validateUser;
