export const getCurrentToken = (req) =>
  req.headers.authorization?.startsWith("Bearer ") &&
  req.headers.authorization.split(" ")[1];
