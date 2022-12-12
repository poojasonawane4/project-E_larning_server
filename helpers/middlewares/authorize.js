const { verifyToken } = require("./token");

function authorize(roles = []) {
  return (req, res, next) => {
    const token = req.headers?.authorization;

    //verify token
    const payload = verifyToken(token);
    if (payload?._id) {
      // console.log("payload:", payload?._id);
      //token is valid
      const { _id, role } = payload;
      console.log("role", role, payload);
      if (roles.includes(role)) {
        next();
      } else {
        res.status(401).send({
          message: "You do not have permission to access the API",
          error: null,
        });
      }
    } else {
      res.status(420).send({ message: "Access Token expired", error: null });
    }
  };
}

module.exports = authorize;
