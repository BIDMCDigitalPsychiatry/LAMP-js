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
var ActivitySpec_1 = require("../model/ActivitySpec");
var Demo_1 = require("./Demo");
var index_1 = __importDefault(require("../index"));
var jsonata_1 = __importDefault(require("jsonata"));
var ActivitySpecService = /** @class */ (function () {
    function ActivitySpecService() {
    }
    /**
     * Get all ActivitySpecs registered.
     */
    ActivitySpecService.prototype.all = function (transform) {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            output = Demo_1.Demo.ActivitySpec.map(function (x) { return Object.assign(new ActivitySpec_1.ActivitySpec(), x); });
                            output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                            return [2 /*return*/, Promise.resolve(output)];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/activity_spec")];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new ActivitySpec_1.ActivitySpec(), x);
                        })];
                }
            });
        });
    };
    /**
     * Create a new ActivitySpec.
     * @param activitySpec
     */
    ActivitySpecService.prototype.create = function (activitySpec) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (activitySpec === null || activitySpec === undefined)
                            throw new Error("Required parameter activitySpec was null or undefined when calling activitySpecCreate.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            // DEMO
                            return [2 /*return*/, Promise.resolve({ error: "500.demo-restriction" })];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.post("/activity_spec", activitySpec)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete an ActivitySpec.
     * @param activitySpecName
     */
    ActivitySpecService.prototype.delete = function (activitySpecName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (activitySpecName === null || activitySpecName === undefined)
                            throw new Error("Required parameter activitySpecName was null or undefined when calling activitySpecDelete.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            // DEMO
                            return [2 /*return*/, Promise.resolve({ error: "500.demo-restriction" })];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.delete("/activity_spec/" + activitySpecName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update an ActivitySpec.
     * @param activitySpecName
     * @param activitySpec
     */
    ActivitySpecService.prototype.update = function (activitySpecName, activitySpec) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (activitySpecName === null || activitySpecName === undefined)
                            throw new Error("Required parameter activitySpecName was null or undefined when calling activitySpecUpdate.");
                        if (activitySpec === null || activitySpec === undefined)
                            throw new Error("Required parameter activitySpec was null or undefined when calling activitySpecUpdate.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            // DEMO
                            return [2 /*return*/, Promise.resolve({ error: "500.demo-restriction" })];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.put("/activity_spec/" + activitySpecName, activitySpec)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * View an ActivitySpec.
     * @param activitySpecName
     */
    ActivitySpecService.prototype.view = function (activitySpecName, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var data, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (activitySpecName === null || activitySpecName === undefined)
                            throw new Error("Required parameter activitySpecName was null or undefined when calling activitySpecView.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            data = Demo_1.Demo.ActivitySpec.filter(function (x) { return x["name"] === activitySpecName; }).map(function (x) {
                                return Object.assign(new ActivitySpec_1.ActivitySpec(), x);
                            });
                            if (data.length > 0) {
                                output = data[0];
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/activity_spec/" + activitySpecName)];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new ActivitySpec_1.ActivitySpec(), x);
                        })[0]];
                }
            });
        });
    };
    return ActivitySpecService;
}());
exports.ActivitySpecService = ActivitySpecService;
