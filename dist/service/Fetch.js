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
var index_1 = __importDefault(require("../index"));
var await_semaphore_1 = require("await-semaphore");
var _tokenSemaphore = new await_semaphore_1.Semaphore(1);
var _fetch = function (method, route, body, tryRefreshToken, waitForToken) {
    if (tryRefreshToken === void 0) { tryRefreshToken = true; }
    if (waitForToken === void 0) { waitForToken = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var release, _a, id, password, accessToken, authorization, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!waitForToken) return [3 /*break*/, 2];
                    return [4 /*yield*/, _tokenSemaphore.acquire()];
                case 1:
                    release = _b.sent();
                    release();
                    _b.label = 2;
                case 2:
                    if (!index_1.default.Auth._auth)
                        throw new Error("Cannot make HTTP request due to invalid configuration.");
                    _a = index_1.default.Auth._auth, id = _a.id, password = _a.password, accessToken = _a.accessToken;
                    authorization = accessToken
                        ? "Bearer " + accessToken
                        : id && password
                            ? "Basic " + id + ":" + password
                            : undefined;
                    return [4 /*yield*/, fetch("https://" + index_1.default.Auth._auth.serverAddress + route, {
                            method: method,
                            headers: new Headers({
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                Authorization: authorization
                            }),
                            body: !!body ? JSON.stringify(body) : undefined
                        }).catch(function () { return new Response(); })];
                case 3:
                    response = _b.sent();
                    if (!(response.status === 401 && tryRefreshToken && accessToken)) return [3 /*break*/, 5];
                    return [4 /*yield*/, refreshToken(accessToken)];
                case 4:
                    _b.sent();
                    return [2 /*return*/, _fetch(method, route, body, false)];
                case 5: return [2 /*return*/, response.json()];
            }
        });
    });
};
var refreshToken = function (expiredToken) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, _tokenSemaphore.use(function () { return __awaiter(void 0, void 0, void 0, function () {
                var newAuth;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (index_1.default.Auth._auth.accessToken !== expiredToken) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, _fetch("post", "/token", { refresh_token: index_1.default.Auth._auth.refreshToken }, false, false)];
                        case 1:
                            newAuth = _a.sent();
                            if (!newAuth.success) {
                                index_1.default.Auth._auth = __assign(__assign({}, index_1.default.Auth._auth), { accessToken: null, refreshToken: null });
                                index_1.default.dispatchEvent("TOKEN_REFRESH_FAILED");
                                return [2 /*return*/];
                            }
                            index_1.default.Auth._auth = __assign(__assign({}, index_1.default.Auth._auth), { accessToken: newAuth.access_token, refreshToken: newAuth.refresh_token });
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
var Fetch = /** @class */ (function () {
    function Fetch() {
    }
    Fetch.get = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _fetch("get", route)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Fetch.post = function (route, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _fetch("post", route, body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Fetch.put = function (route, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _fetch("put", route, body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Fetch.patch = function (route, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _fetch("patch", route, body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Fetch.delete = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _fetch("delete", route)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Fetch;
}());
exports.Fetch = Fetch;
