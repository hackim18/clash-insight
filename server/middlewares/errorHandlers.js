function errorHandling(err, req, res, next) {
  console.log(err.name, ">>>name");
  console.log(err.message, ">>>msg");
  let statusCode = 500;
  let errorMessage = "Internal server error";
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      errorMessage = err.errors[0].message || "Bad Request";
      break;
    case "ValidationError":
      statusCode = 400;
      errorMessage = err.message || "Validation Error";
      break;
    case "BadRequest":
      statusCode = 400;
      errorMessage = err.message || "Bad Request";
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      errorMessage = "Invalid token";
      break;
    case "Unauthorized":
    case "Unauthenticated":
      statusCode = 401;
      errorMessage = err.message || "Invalid token";
      break;
    case "NotFound":
      statusCode = 404;
      errorMessage = err.message || "Not Found";
      break;
    case "Forbidden":
      statusCode = 403;
      errorMessage = err.message || "Forbidden";
      break;

    default:
      break;
  }
  res.status(statusCode).json({ message: errorMessage });
}
module.exports = errorHandling;
