// const { CustomAPIError } = require("../errors")
const { StatusCodes } = require("http-status-codes")
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again later",
    }

    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({ msg: err.message })
    // } // With the new setup we don't need CustomAPIError
    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",")
        // e.g. : When you register with just a name, it's missing Password and Email, those are two "item",
        // so we get each message and make an array of the message of each item
        customError.statusCode = 400
    }
    if (err.code && err.code === 11000) {
        //This is for duplicated emails, the err.code was 11000
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`
        customError.statusCode = 400
    }
    if (err.name === "CastError") {
        customError.msg = `No item found with id: ${err.value}`
        customError.statusCode = 404
    }
    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
