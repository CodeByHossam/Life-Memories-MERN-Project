//Not found middleware
function notFound(req, res, next) {

  res.status(404).json({ message: 'Not found' });
}

export default notFound;