const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      req.body.userId = decoded.id;
      next();
    });

  } catch (error) {
    console.error("JWT Auth Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during token verification",
    });
  }
};

module.exports = authMiddleware;
