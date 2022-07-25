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
var Fetch_1 = require("./Fetch");
var SensorSpec_1 = require("../model/SensorSpec");
var Demo_1 = require("./Demo");
var index_1 = __importDefault(require("../index"));
var jsonata_1 = __importDefault(require("jsonata"));
var SensorSpecService = /** @class */ (function () {
    function SensorSpecService() {
    }
    /**
     * Get all SensorSpecs registered by any Researcher.
     */
    SensorSpecService.prototype.all = function (transform) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            output = Demo_1.Demo.SensorSpec.map(function (x) { return Object.assign(new SensorSpec_1.SensorSpec(), x); });
                            output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                            return [2 /*return*/, Promise.resolve(output)];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/sensor_spec")];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new SensorSpec_1.SensorSpec(), x);
                        })];
                }
            });
        });
    };
    /**
     * Create a new SensorSpec.
     * @param sensorSpec
     */
    SensorSpecService.prototype.create = function (sensorSpec) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sensorSpec === null || sensorSpec === undefined)
                            throw new Error("Required parameter sensorSpec was null or undefined when calling sensorSpecCreate.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            // DEMO
                            return [2 /*return*/, Promise.resolve({ error: "500.demo-restriction" })];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.post("/sensor_spec", sensorSpec)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete an SensorSpec.
     * @param sensorSpecName
     */
    SensorSpecService.prototype.delete = function (sensorSpecName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sensorSpecName === null || sensorSpecName === undefined)
                            throw new Error("Required parameter sensorSpecName was null or undefined when calling sensorSpecDelete.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            // DEMO
                            return [2 /*return*/, Promise.resolve({ error: "500.demo-restriction" })];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.delete("/sensor_spec/" + sensorSpecName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update an SensorSpec.
     * @param sensorSpecName
     * @param sensorSpec
     */
    SensorSpecService.prototype.update = function (sensorSpecName, sensorSpec) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sensorSpecName === null || sensorSpecName === undefined)
                            throw new Error("Required parameter sensorSpecName was null or undefined when calling sensorSpecUpdate.");
                        if (sensorSpec === null || sensorSpec === undefined)
                            throw new Error("Required parameter sensorSpec was null or undefined when calling sensorSpecUpdate.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            // DEMO
                            return [2 /*return*/, Promise.resolve({ error: "500.demo-restriction" })];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.put("/sensor_spec/" + sensorSpecName, sensorSpec)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get a SensorSpec.
     * @param sensorSpecName
     */
    SensorSpecService.prototype.view = function (sensorSpecName, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var data, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sensorSpecName === null || sensorSpecName === undefined)
                            throw new Error("Required parameter sensorSpecName was null or undefined when calling sensorSpecView.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            data = Demo_1.Demo.SensorSpec.filter(function (x) { return x["name"] === sensorSpecName; }).map(function (x) { return Object.assign(new SensorSpec_1.SensorSpec(), x); });
                            if (data.length > 0) {
                                output = data[0];
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/sensor_spec/" + sensorSpecName)];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new SensorSpec_1.SensorSpec(), x);
                        })[0]];
                }
            });
        });
    };
    return SensorSpecService;
}());
exports.SensorSpecService = SensorSpecService;
