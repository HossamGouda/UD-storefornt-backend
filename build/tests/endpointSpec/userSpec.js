"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var database_1 = __importDefault(require("../../database/database"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var server_1 = __importDefault(require("../../server"));
var userModel = new user_model_1.default();
var request = (0, supertest_1.default)(server_1.default);
var token = '';
describe('Users API Endpoints', function () {
    var user = {
        email: 'test@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123',
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    user.id = createdUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, connection.query(sql)];
                case 2:
                    _a.sent();
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Test Authenticate methods', function () {
        it('should be able to authenticate to get token back', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, email, userToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/users/auth')
                            .set('Content-type', 'application/json')
                            .send({
                            email: 'test@test.com',
                            password: 'test123',
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, id = _a.id, email = _a.email, userToken = _a.token;
                        expect(id).toBe(user.id);
                        expect(email).toBe('test@test.com');
                        token = userToken;
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be failed to authenticate with wrong email', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/users/auth')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            email: 'wrongmail@email.com',
                            password: 'test123',
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Test CRUD API methods', function () {
        it('should create new user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, email, user_name, first_name, last_name;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/users/')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            email: 'test2@test2.com',
                            user_name: 'testUser2',
                            first_name: 'Test2',
                            last_name: 'User2',
                            password: 'test123',
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, email = _a.email, user_name = _a.user_name, first_name = _a.first_name, last_name = _a.last_name;
                        expect(email).toBe('test2@test2.com');
                        expect(user_name).toBe('testUser2');
                        expect(first_name).toBe('Test2');
                        expect(last_name).toBe('User2');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get list of users', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/users/')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data).toBeDefined;
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get user info', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get("/api/users/".concat(user.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.user_name).toBe('testUser');
                        expect(res.body.data.email).toBe('test@test.com');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update user info', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, email, user_name, first_name, last_name;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .patch("/api/users/".concat(user.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send(__assign(__assign({}, user), { user_name: 'HossamGouda', first_name: 'Hossam', last_name: 'Gouda' }))];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, id = _a.id, email = _a.email, user_name = _a.user_name, first_name = _a.first_name, last_name = _a.last_name;
                        expect(id).toBe(user.id);
                        expect(email).toBe(user.email);
                        expect(user_name).toBe('HossamGouda');
                        expect(first_name).toBe('Hossam');
                        expect(last_name).toBe('Gouda');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .delete("/api/users/".concat(user.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.id).toBe(user.id);
                        expect(res.body.data.user_name).toBe('HossamGouda');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});