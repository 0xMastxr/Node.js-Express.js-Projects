class CustomAPIError extends Error {
    constuctor(message, statusCode) {
        Super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

module.exports = { CustomAPIError, createCustomError }
