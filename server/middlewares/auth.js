const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.body.token;
  if (!token) {
    return res.status(404).json({
      message: "Token not found",
    });
  }
  // any error may occur here , so it is better to wrap it around try/catch
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(404).json({
        message: "Not verified",
      });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Some error occured",
    });
  }
}

module.exports = auth;
