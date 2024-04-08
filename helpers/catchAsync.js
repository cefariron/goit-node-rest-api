export const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    });
  };
  