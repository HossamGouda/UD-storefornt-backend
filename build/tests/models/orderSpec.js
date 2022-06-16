"use strict";
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
var orders_model_1 = __importDefault(require("../../models/orders.model"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var products_model_1 = __importDefault(require("../../models/products.model"));
var userModel = new user_model_1.default();
var productModel = new products_model_1.default();
var orderModel = new orders_model_1.default();
describe('Order Model', function () {
    describe('Test methods exist', function () {
        it('should have an index method', function () {
            expect(orderModel.getOrders).toBeDefined();
        });
        it('should have a show method', function () {
            expect(orderModel.getOneOrder).toBeDefined();
        });
        it('should have a create method', function () {
            expect(orderModel.createOrder).toBeDefined();
        });
        it('should have a delete method', function () {
            expect(orderModel.deleteOrder).toBeDefined();
        });
    });
    describe('Test Model logic', function () {
        var user = {
            email: 'gouda@h.com',
            user_name: 'hos',
            first_name: 'Hossam',
            last_name: 'Gouda',
            password: '321',
        };
        var product = {
            name: 'orange',
            description: 'lims',
            price: 3,
            category: 'fruit',
        };
        var order = {
            user_id: 1,
            status: 'active',
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(user.id);
                        // create user/product to test with order model
                        if (user.id)
                            order.user_id = user.id;
                        return [4 /*yield*/, userModel.create(user)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, productModel.createProduct(product)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // afterAll(async () => {
        //   const connection = await db.connect();
        //   const sql =
        //     'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        //   await connection.query(sql);
        //   connection.release();
        // });
        it('Create method should create an order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.createOrder(order)];
                    case 1:
                        createdOrder = _a.sent();
                        expect(createdOrder.id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        // it('Index method should return a list of orders', async () => {
        //   const orders = await orderModel.getOrders();
        //   expect(orders[0].id).toBe(1);
        // });
        // it('Show method should return the correct order', async () => {
        //   const returnedOrder = await orderModel.getOneOrder(1);
        //   expect(returnedOrder.id).toEqual(1);
        // });
        // it('Edit method should return an order with edited attributes', async () => {
        //   const returnedOrder = await orderModel.updateOrder({
        //     id: 1,
        //     user_id: 1,
        //     status: 'completed',
        //   });
        //   expect(returnedOrder.status).toBe('completed');
        // });
        // it('Delete method should remove the order', async () => {
        //   const deletedOrder = await orderModel.deleteOrder(1);
        //   expect(deletedOrder.id).toBe(1);
        // });
    });
});
