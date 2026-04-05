function notFoundHandler(req, res) {
  res.status(404).json({ message: 'Not Found' });
}

function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;
  const message =
    status === 500 && process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message || 'Internal Server Error';

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({ message });
}

module.exports = { notFoundHandler, errorHandler };
