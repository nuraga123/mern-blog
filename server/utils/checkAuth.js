import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "123");

      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(406).json({
        message: "нет доступа 6",
      });
    }
  } else {
    return res.status(403).json({
      message: "нет доступа 3",
    });
  }
};
