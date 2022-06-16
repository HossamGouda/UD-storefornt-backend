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
var products_model_1 = __importDefault(require("../../models/products.model"));
var database_1 = __importDefault(require("../../database/database"));
var productModel = new products_model_1.default();
describe('Product Model', function () {
    describe('Test methods in the Product model', function () {
        it('should return all products', function () {
            expect(productModel.getProducts).toBeDefined();
        });
        it('should return one product', function () {
            expect(productModel.getOneProduct).toBeDefined();
        });
        it('Should have creat method', function () {
            expect(productModel.createProduct).toBeDefined();
        });
        it('Should have creat update product method', function () {
            expect(productModel.updateProduct).toBeDefined();
        });
        it('should have a Delete User method', function () {
            expect(productModel.deleteProduct).toBeDefined();
        });
    });
    describe('test product Model Logic', function () {
        var product = {
            name: 'orange',
            description: 'lims',
            price: 3,
            category: 'fruit',
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.createProduct(product)];
                    case 1:
                        createdProduct = _a.sent();
                        product.id = createdProduct.id;
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
                        sql = 'DELETE FROM products;';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create method should return a product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.createProduct({
                            name: 'mango',
                            description: 'sweety yellow',
                            price: 5,
                            category: 'fruit',
                        })];
                    case 1:
                        newProduct = _a.sent();
                        expect(newProduct).toEqual({
                            id: newProduct.id,
                            name: 'mango',
                            description: 'sweety yellow',
                            price: 5,
                            category: 'fruit',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get All method should return all products available in DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.getProducts()];
                    case 1:
                        products = _a.sent();
                        expect(products.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get product method should return orange product when called with ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var retrieved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.getOneProduct(product.id)];
                    case 1:
                        retrieved = _a.sent();
                        expect(retrieved.id).toBe(product.id);
                        expect(retrieved.name).toBe(product.name);
                        expect(retrieved.description).toBe(product.description);
                        expect(retrieved.price).toBe(product.price);
                        expect(retrieved.category).toBe(product.category);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Update product method should return a product with the new data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedProdcut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.updateProduct(__assign(__assign({}, product), { name: 'mangoo', description: 'onlyFruit', price: 10 }))];
                    case 1:
                        updatedProdcut = _a.sent();
                        expect(updatedProdcut.id).toBe(product.id);
                        expect(updatedProdcut.name).toBe('mangoo');
                        expect(updatedProdcut.description).toBe('onlyFruit');
                        expect(updatedProdcut.price).toBe(10);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Delete product method should delete product from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.deleteProduct(product.id)];
                    case 1:
                        deletedProduct = _a.sent();
                        expect(deletedProduct.id).toBe(product.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
