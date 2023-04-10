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
exports.CredentialService = void 0;
var Fetch_1 = require("./Fetch");
var Credential_1 = require("../model/Credential");
var Demo_1 = require("./Demo");
var index_1 = __importDefault(require("../index"));
var jsonata_1 = __importDefault(require("jsonata"));
var PersonalAccessToken_1 = require("../model/PersonalAccessToken");
var CredentialService = /** @class */ (function () {
    function CredentialService() {
    }
    /**
     *
     * @param typeId
     * @param secretKey
     */
    CredentialService.prototype.create = function (typeId, accessKey, secretKey, description) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, exists, unique;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (accessKey === null || accessKey === undefined)
                            throw new Error("Required parameter accessKey was null or undefined when calling credentialCreate.");
                        if (secretKey === null || secretKey === undefined)
                            throw new Error("Required parameter secretKey was null or undefined when calling credentialCreate.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (typeId === "me")
                                typeId = credential.length > 0 ? credential[0]["origin"] : typeId;
                            exists = Demo_1.Demo.Researcher.filter(function (x) { return x["id"] === typeId; }).length > 0 ||
                                Demo_1.Demo.Study.filter(function (x) { return x["id"] === typeId; }).length > 0 ||
                                Demo_1.Demo.Participant.filter(function (x) { return x["id"] === typeId; }).length > 0 ||
                                Demo_1.Demo.Activity.filter(function (x) { return x["id"] === typeId; }).length > 0 // ???
                            ;
                            unique = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === accessKey; }).length === 0;
                            if (exists && unique) {
                                Demo_1.Demo.Credential.push({
                                    "#type": "Credential",
                                    "#parent": typeId,
                                    origin: typeId,
                                    access_key: accessKey,
                                    secret_key: secretKey,
                                    description: description
                                });
                                return [2 /*return*/, Promise.resolve({})];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.post("/type/" + typeId + "/credential", { origin: typeId, access_key: accessKey, secret_key: secretKey, description: description })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param typeId
     * @param accessKey
     */
    CredentialService.prototype.delete = function (typeId, accessKey) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (accessKey === null || accessKey === undefined)
                            throw new Error("Required parameter accessKey was null or undefined when calling credentialDelete.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (typeId === "me")
                                typeId = credential.length > 0 ? credential[0]["origin"] : typeId;
                            idx = Demo_1.Demo.Credential.findIndex(function (x) { return x["#parent"] === typeId && x["access_key"] === accessKey; });
                            if (idx >= 0) {
                                Demo_1.Demo.Credential.splice(idx, 1);
                                return [2 /*return*/, Promise.resolve({})];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.delete("/type/" + typeId + "/credential/" + accessKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param typeId
     */
    CredentialService.prototype.list = function (typeId, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, exists, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (typeId === "me")
                                typeId = credential.length > 0 ? credential[0]["origin"] : typeId;
                            exists = Demo_1.Demo.Researcher.filter(function (x) { return x["id"] === typeId; }).length > 0 ||
                                Demo_1.Demo.Study.filter(function (x) { return x["id"] === typeId; }).length > 0 ||
                                Demo_1.Demo.Participant.filter(function (x) { return x["id"] === typeId; }).length > 0 ||
                                Demo_1.Demo.Activity.filter(function (x) { return x["id"] === typeId; }).length > 0 // ???
                            ;
                            if (exists) {
                                output = Demo_1.Demo.Credential.filter(function (x) { return x["#parent"] === typeId; }).map(function (x) {
                                    return Object.assign(new Credential_1.Credential(), __assign(__assign({}, x), { secret_key: "" }));
                                });
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/type/" + typeId + "/credential")];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new Credential_1.Credential(), x);
                        })];
                }
            });
        });
    };
    /**
     *
     * @param typeId
     * @param accessKey
     * @param secretKey
     */
    CredentialService.prototype.update = function (typeId, accessKey, secretKey, description) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (accessKey === null || accessKey === undefined)
                            throw new Error("Required parameter accessKey was null or undefined when calling credentialUpdate.");
                        if (secretKey === null || secretKey === undefined)
                            throw new Error("Required parameter secretKey was null or undefined when calling credentialUpdate.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (typeId === "me")
                                typeId = credential.length > 0 ? credential[0]["origin"] : typeId;
                            idx = Demo_1.Demo.Credential.findIndex(function (x) { return x["#parent"] === typeId && x["access_key"] === accessKey; });
                            if (idx >= 0) {
                                Demo_1.Demo.Credential[idx] = {
                                    "#type": "Credential",
                                    "#parent": typeId,
                                    origin: typeId,
                                    access_key: accessKey,
                                    secret_key: secretKey !== null && secretKey !== void 0 ? secretKey : Demo_1.Demo.Credential[idx]["secret_key"],
                                    description: description !== null && description !== void 0 ? description : Demo_1.Demo.Credential[idx]["description"]
                                };
                                return [2 /*return*/, Promise.resolve({})];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.put("/type/" + typeId + "/credential/" + accessKey, secretKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param accessKey
     */
    CredentialService.prototype.listTokens = function (accessKey) {
        return __awaiter(this, void 0, void 0, function () {
            var tenDays;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (accessKey === null || accessKey === undefined)
                            throw new Error("Required parameter accessKey was null or undefined when calling credentialCreateToken.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            tenDays = 1000 * 3600 * 24 * 10;
                            return [2 /*return*/, [{ token: "qwertyuiop", expiry: Date.now() + tenDays, created: Date.now() - tenDays, description: "My Token" }]];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/credential/" + accessKey + "/token")];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new PersonalAccessToken_1.PersonalAccessToken(), x);
                        })];
                }
            });
        });
    };
    /**
     *
     * @param accessKey
     * @param expiry
     * @param description
     */
    CredentialService.prototype.createToken = function (accessKey, expiry, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (accessKey === null || accessKey === undefined)
                            throw new Error("Required parameter accessKey was null or undefined when calling credentialCreateToken.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            // DEMO
                            return [2 /*return*/, Promise.resolve({})];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.post("/credential/" + accessKey + "/token", { expiry: expiry, description: description })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     *
     * @param accessKey
     * @param token
     */
    CredentialService.prototype.deleteToken = function (accessKey, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (accessKey === null || accessKey === undefined)
                            throw new Error("Required parameter accessKey was null or undefined when calling credentialDeleteToken.");
                        if (token === null || token === undefined)
                            throw new Error("Required parameter token was null or undefined when calling credentialDeleteToken.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            // DEMO
                            return [2 /*return*/, Promise.resolve({})];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.delete("/credential/" + accessKey + "/token/" + token)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CredentialService;
}());
exports.CredentialService = CredentialService;
