function errorHandler(error, req, res, next) {
    if (error.name === "CastError") {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({
            message: error.message
        });
    }

    res.status(error.statusCode || 500).json({
        message: error.message || "Something went wrong"
    });
}

module.exports = errorHandler;
