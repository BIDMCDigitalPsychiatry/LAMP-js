"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("isomorphic-fetch");
var index_1 = require("./service/index");
var Demo_1 = require("./service/Demo");
var Fetch_1 = require("./service/Fetch");
var jsonwebtoken_1 = require("jsonwebtoken");
__exportStar(require("./service/index"), exports);
__exportStar(require("./model/index"), exports);
//
var _bus = (_a = global.document) === null || _a === void 0 ? void 0 : _a.createElement("_lamp_fake");
/**
 * The root type in LAMP. You must use `LAMP.connect(...)` to begin using any LAMP classes.
 */
var LAMP = /** @class */ (function () {
    function LAMP() {
    }
    LAMP.addEventListener = function (event, callback) {
        _bus === null || _bus === void 0 ? void 0 : _bus.addEventListener(event, callback);
    };
    LAMP.removeEventListener = function (event, callback) {
        _bus === null || _bus === void 0 ? void 0 : _bus.removeEventListener(event, callback);
    };
    LAMP.dispatchEvent = function (event, detail) {
        if (detail === void 0) { detail = null; }
        _bus === null || _bus === void 0 ? void 0 : _bus.dispatchEvent(new CustomEvent(event, { detail: detail }));
    };
    //
    // [Demo API]
    //
    LAMP.initializeDemoDB = function (db) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        db = JSON.parse(JSON.stringify(db)); // make a deep copy first!
        Demo_1.Demo.ActivitySpec = (_a = db.ActivitySpec) !== null && _a !== void 0 ? _a : [];
        Demo_1.Demo.SensorSpec = (_b = db.SensorSpec) !== null && _b !== void 0 ? _b : [];
        Demo_1.Demo.Researcher = (_c = db.Researcher) !== null && _c !== void 0 ? _c : [];
        Demo_1.Demo.Study = (_d = db.Study) !== null && _d !== void 0 ? _d : [];
        Demo_1.Demo.Participant = (_e = db.Participant) !== null && _e !== void 0 ? _e : [];
        Demo_1.Demo.Activity = (_f = db.Activity) !== null && _f !== void 0 ? _f : [];
        Demo_1.Demo.Sensor = (_g = db.Sensor) !== null && _g !== void 0 ? _g : [];
        Demo_1.Demo.ActivityEvent = (_h = db.ActivityEvent) !== null && _h !== void 0 ? _h : [];
        Demo_1.Demo.SensorEvent = (_j = db.SensorEvent) !== null && _j !== void 0 ? _j : [];
        Demo_1.Demo.Credential = (_k = db.Credential) !== null && _k !== void 0 ? _k : [];
        Demo_1.Demo.Tags = (_l = db.Tags) !== null && _l !== void 0 ? _l : [];
    };
    //
    // [Credential/Identity Management]
    //
    // Shorthand for console/data analysis usage.
    LAMP.connect = function (identity) {
        if (identity === void 0) { identity = {
            serverAddress: undefined,
            accessKey: null,
            secretKey: null,
        }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Propogate the authorization.
                LAMP.Auth._auth = {
                    id: identity.accessKey,
                    password: identity.secretKey,
                    serverAddress: identity.serverAddress,
                };
                return [2 /*return*/];
            });
        });
    };
    var _b;
    LAMP.Activity = new index_1.ActivityService();
    LAMP.ActivityEvent = new index_1.ActivityEventService();
    LAMP.ActivitySpec = new index_1.ActivitySpecService();
    LAMP.API = new index_1.APIService();
    LAMP.Credential = new index_1.CredentialService();
    LAMP.OAuth = new index_1.OAuthService();
    LAMP.Participant = new index_1.ParticipantService();
    LAMP.Researcher = new index_1.ResearcherService();
    LAMP.Sensor = new index_1.SensorService();
    LAMP.SensorEvent = new index_1.SensorEventService();
    LAMP.SensorSpec = new index_1.SensorSpecService();
    LAMP.Study = new index_1.StudyService();
    LAMP.Type = new index_1.TypeService();
    LAMP.Auth = (_b = /** @class */ (function () {
            function class_1() {
            }
            /**
             * Authenticate/authorize as a user of a given `type`.
             * If all values are null (especially `type`), the authorization is cleared.
             */
            class_1.set_identity = function (identity) {
                var _a;
                if (identity === void 0) { identity = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var serverAddress, authorization, id, payload, typeData, e_1, _b, err_1;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (identity.serverAddress) {
                                    serverAddress = identity.serverAddress.replace("http://", "").replace("https://", "");
                                }
                                else {
                                    serverAddress = LAMP.Auth._auth.serverAddress;
                                }
                                // Propogate the authorization.
                                LAMP.Auth._auth = {
                                    id: identity.id,
                                    password: identity.password,
                                    accessToken: identity.accessToken,
                                    refreshToken: identity.refreshToken,
                                    serverAddress: serverAddress,
                                };
                                _c.label = 1;
                            case 1:
                                _c.trys.push([1, 9, 10, 11]);
                                if (!(!!identity.id && !!identity.password || !!identity.accessToken)) return [3 /*break*/, 7];
                                authorization = void 0;
                                id = void 0;
                                if (!!identity.accessToken) {
                                    authorization = "Bearer " + identity.accessToken;
                                    payload = void 0;
                                    try {
                                        payload = jsonwebtoken_1.decode(identity.accessToken);
                                    }
                                    catch (_d) {
                                        throw Error("Invalid access token");
                                    }
                                    id = payload.id;
                                }
                                else {
                                    authorization = "Basic " + identity.id + ":" + identity.password;
                                    id = identity.id;
                                }
                                typeData = void 0;
                                _c.label = 2;
                            case 2:
                                _c.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, LAMP.Type.parent("me")];
                            case 3:
                                typeData = _c.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _c.sent();
                                return [3 /*break*/, 5];
                            case 5:
                                LAMP.Auth._type =
                                    typeData.error === "400.context-substitution-failed"
                                        ? "admin"
                                        : Object.entries(typeData.data).length === 0
                                            ? "researcher"
                                            : !!typeData.data
                                                ? "participant"
                                                : null;
                                // Get our 'me' object now that we figured out our type.
                                _b = LAMP.Auth;
                                return [4 /*yield*/, (LAMP.Auth._type === "admin"
                                        ? { id: id }
                                        : LAMP.Auth._type === "researcher"
                                            ? LAMP.Researcher.view("me")
                                            : LAMP.Participant.view("me"))];
                            case 6:
                                // Get our 'me' object now that we figured out our type.
                                _b._me = _c.sent();
                                LAMP.dispatchEvent("LOGIN", {
                                    authorizationToken: authorization,
                                    identityObject: LAMP.Auth._me,
                                    serverAddress: serverAddress
                                });
                                return [3 /*break*/, 8];
                            case 7:
                                LAMP.dispatchEvent("LOGOUT", {
                                    deleteCache: true,
                                });
                                _c.label = 8;
                            case 8: return [3 /*break*/, 11];
                            case 9:
                                err_1 = _c.sent();
                                // We failed: clear and propogate the authorization.
                                LAMP.Auth._auth = { id: null, password: null, accessToken: null, refreshToken: null, serverAddress: null };
                                // Delete the "self" identity and throw the error we received.
                                LAMP.Auth._me = null;
                                LAMP.Auth._type = null;
                                throw new Error("invalid id or password");
                            case 10:
                                // Save the authorization in sessionStorage for later.
                                ;
                                (_a = global.sessionStorage) === null || _a === void 0 ? void 0 : _a.setItem("LAMP._auth", JSON.stringify(LAMP.Auth._auth));
                                return [7 /*endfinally*/];
                            case 11: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.refresh_identity = function () {
                var _a, _b;
                return __awaiter(this, void 0, void 0, function () {
                    var _saved;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _saved = JSON.parse((_b = (_a = global.sessionStorage) === null || _a === void 0 ? void 0 : _a.getItem("LAMP._auth")) !== null && _b !== void 0 ? _b : "null") || LAMP.Auth._auth;
                                return [4 /*yield*/, LAMP.Auth.set_identity(_saved)];
                            case 1:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.get_legacy_token = function (identity) {
                return __awaiter(this, void 0, void 0, function () {
                    var body;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Fetch_1.Fetch.post("/token", { id: identity.id, password: identity.password })];
                            case 1:
                                body = _a.sent();
                                return [2 /*return*/, body.access_token];
                        }
                    });
                });
            };
            return class_1;
        }()),
        _b._auth = { id: null, password: null, serverAddress: "api.lamp.digital", accessToken: null, refreshToken: null },
        _b._type = null,
        _b);
    return LAMP;
}());
exports.default = LAMP;
exports.main = function () {
    if (process === undefined) {
        console.error("This function cannot be invoked from within the library.");
        return;
    }
    console.log("This command-line tool is currently disabled.");
    process === null || process === void 0 ? void 0 : process.exit(1);
};
