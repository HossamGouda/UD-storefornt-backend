"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (error, req, res, _next) {
    var status = error.status || 500;
    var message = error.message || ' Error happened';
    res.status(status).json({ status: status, message: message });
};
exports.default = errorHandler;
