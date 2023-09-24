const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

exports.userAuthMiddleware = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      console.log(JSON.stringify(token));
      // token
      // const { userID } = jwt.verify(token, process.env.SECRETKEY);
      // console.log(userID);

      // getUSer

      // req.user = await userModel.findById(userID).select("-password");
    
      // console.log(JSON.stringify(req.user));
      next();
    } catch (error) {
      console.error("unauthorized error ");
      res.status(401).send("unauthorized User");
    }
  } else {
    res.status(404).send("token ni hai");
  }
};
