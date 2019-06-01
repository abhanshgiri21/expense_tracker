const ValidationError = require('objection').ValidationError;

// The error returned by this function is handled in the error handler middleware in app.js.
createStatusCodeError = function (statusCode, message) {
    return Object.assign(new Error(), {
        statusCode,
        message,
    });
}

badRequestError = function (msg) {
    return new ValidationError({
        message: msg,
        type: 'Validation',
        data: {
            message: msg
        }
    })
}

conflictError = function (res, msg = 'Request cannot be completed because fo a conflict', data = {}) {
    return res.status(409).json({
        success: false,
        message: msg,
        data: data
    });
}

forbiddenError = function (msg) {
    return createStatusCodeError(403, msg);
}

forbiddenResponse = function (res, msg = 'Not Allowed') {
    return res.status(403).json(
        forbiddenError(msg)
    );
}

unauthorizedError = function (msg) {
    return createStatusCodeError(401, msg);
}

notFoundError = function (msg) {
    return createStatusCodeError(404, msg);
}


// Response handlers
successResponse = function (res, code, data, message) {
    return res.status(code || 200).json({
        success: true,
        data,
        message
    })
}

okResponse = function (res, data, message) {
    return successResponse(res, 200, data, message);
}

createdResponse = function (res, data, message) {
    return successResponse(res, 201, data, message);
}

noContentResponse = function (res, message) {
    return successResponse(res, 204, {}, message);
}

// Utility functions
slugify = function (Text) {
    Text = Text || '';
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
to = function (promise) {
    return promise
        .then(data => {
            return [null, data];
        }).catch(err => [pe(err)]);
}
