"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var handle = function (next) {
    var error = new Error("logain faild : try again later");
    error.status = 401;
    next(error);
};
var validateMiddleware = function (req, _res, next) {
    try {
        var authHeader = req.get('Authorization');
        if (authHeader) {
            var bearer = authHeader.split(' ')[0].toLowerCase();
            var token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                var decode = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
                if (decode) {
                    next();
                }
                else {
                    // Failed to authenticate user.
                    handle(next);
                }
            }
            else {
                // token type not bearer
                handle(next);
            }
        }
        else {
            // No Token Provided.
            handle(next);
        }
    }
    catch (err) {
        handle(next);
    }
};
exports.default = validateMiddleware;
