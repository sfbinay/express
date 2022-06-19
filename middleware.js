const accessControl = (req, res, next) => {
  const access = true;

  if (!access) {
    res.status(401).json({
      success: access,
      message: "You are not authorized",
    });
  }
  console.log("MiddleWare: Access Control");
  next();
};

const defaultMiddleWare = (req, res, next) => {
  console.log("Default MiddleWare");
  next();
};

module.exports = {
  accessControl,
  defaultMiddleWare,
};
