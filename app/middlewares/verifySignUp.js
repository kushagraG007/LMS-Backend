const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const usernameUser = await User.findOne({ username: req.body.username });
    const emailUser = await User.findOne({ email: req.body.email });

    if (usernameUser) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    if (emailUser) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

checkRolesExisted = (req, res, next) => {
  const userRole = req.body.role; // Assuming the role is passed as `role` in the request body

  // Check if the userRole is included in the predefined roles (ROLES) array
  if (!ROLES.includes(userRole)) {
    res.status(400).send({
      message: `Failed! Role ${userRole} does not exist!`,
    });
    return;
  }

  // Check specific conditions based on roles
  if (userRole === "admin") {
    if (!req.body.password) {
      res
        .status(400)
        .send({ message: "Failed! Admin role is not applicable for you" });
      return;
    }
  }

  if (userRole === "moderator") {
    if (req.body.ModeratorKey != env.ModeratorKey) {
      res.status(400).send({ message: "Invalid Secret Key" });
      return;
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
