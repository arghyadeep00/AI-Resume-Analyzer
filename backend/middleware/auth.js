const auth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.roles)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

export { authorize, auth };
