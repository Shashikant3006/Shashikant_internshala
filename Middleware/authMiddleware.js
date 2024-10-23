import JWT from "jsonwebtoken";

export const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming token is passed as 'Bearer <token>'
    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    
    // Verify the token and extract user data
    const decoded = JWT.verify(token, process.env.SECRET);
    req.user = decoded; // Attach user info (like _id) to req.user

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).send({ success: false, message: "Invalid Token" });
  }
};
