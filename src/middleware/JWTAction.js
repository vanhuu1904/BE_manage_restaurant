import jwt from "jsonwebtoken";
require("dotenv").config();
import ms from "ms";
const nonSecurePaths = [
  "/auth/logout",
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
];

const createAccessTokenJWT = (payload) => {
  let key = process.env.JWT_ACCESS_TOKEN_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const createRefreshTokenJWT = (payload) => {
  let key = process.env.JWT_REFRESH_TOKEN_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_ACCESS_TOKEN_SECRET;
  let decoded = null;

  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkUserJWT = (req, res, next) => {
  console.log(">>>check req.path: ", req.path);
  if (
    nonSecurePaths.includes(req.path) ||
    req.path === "/food/read" ||
    req.path.includes("/food/getAFood")
  )
    return next();
  // let cookies = req.cookies;
  const tokenFromHeader = extractToken(req);
  console.log(">>>check token: ", tokenFromHeader);
  if (tokenFromHeader) {
    let token = tokenFromHeader;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user",
      });
    }
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  if (req.user) {
    let roles = req.user.groupWithRoles.Roles;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't have the permission to access this resource...",
      });
    }
    let canAccess = roles.some(
      (item) => item.url === currentUrl || currentUrl.includes(item.url)
    );
    console.log(">>>check req.path: ", currentUrl);
    console.log(">>>check canAccess: ", canAccess);
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource...",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};

module.exports = {
  createAccessTokenJWT,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
  createRefreshTokenJWT,
};
