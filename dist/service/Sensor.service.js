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
exports.SensorService = void 0;
var Fetch_1 = require("./Fetch");
var Sensor_1 = require("../model/Sensor");
var Demo_1 = require("./Demo");
var index_1 = __importDefault(require("../index"));
var jsonata_1 = __importDefault(require("jsonata"));
var SensorService = /** @class */ (function () {
    function SensorService() {
    }
    /**
     * Get the set of all activities.
     */
    SensorService.prototype.all = function (transform) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            output = Demo_1.Demo.Sensor.map(function (x) { return Object.assign(new Sensor_1.Sensor(), x); });
                            output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                            return [2 /*return*/, Promise.resolve(output)];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/sensor")];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new Sensor_1.Sensor(), x);
                        })];
                }
            });
        });
    };
    /**
     * Get the set of all activities available to a participant,  by participant identifier.
     * @param participantId
     */
    SensorService.prototype.allByParticipant = function (participantId, transform, ignore_binary) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (participantId === null || participantId === undefined)
                            throw new Error("Required parameter participantId was null or undefined when calling sensorAllByParticipant.");
                        if (ignore_binary === null || ignore_binary === undefined)
                            ignore_binary = false;
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (participantId === "me")
                                participantId = credential.length > 0 ? credential[0]["origin"] : participantId;
                            if (Demo_1.Demo.Participant.filter(function (x) { return x["id"] === participantId; }).length > 0) {
                                output = Demo_1.Demo.Sensor.filter(function (x) {
                                    return Demo_1.Demo.Participant.filter(function (y) { return y["id"] === participantId; })
                                        .map(function (y) { return y["#parent"]; })
                                        .includes(x["#parent"]);
                                }).map(function (x) { return Object.assign(new Sensor_1.Sensor(), x); });
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/participant/" + participantId + "/sensor?ignore_binary=" + ignore_binary)];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new Sensor_1.Sensor(), x);
                        })];
                }
            });
        });
    };
    /**
     * Get the set of all activities available to participants  of any study conducted by a researcher, by researcher identifier.
     * @param researcherId
     */
    SensorService.prototype.allByResearcher = function (researcherId, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (researcherId === null || researcherId === undefined)
                            throw new Error("Required parameter researcherId was null or undefined when calling sensorAllByResearcher.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0) {
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            }
                            if (researcherId === "me") {
                                researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId;
                            }
                            if (Demo_1.Demo.Researcher.filter(function (x) { return x["id"] === researcherId; }).length > 0) {
                                output = Demo_1.Demo.Sensor.filter(function (x) {
                                    return Demo_1.Demo.Study.filter(function (y) { return y["#parent"] === researcherId; })
                                        .map(function (y) { return y["id"]; })
                                        .includes(x["#parent"]);
                                }).map(function (x) { return Object.assign(new Sensor_1.Sensor(), x); });
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/researcher/" + researcherId + "/sensor")];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new Sensor_1.Sensor(), x);
                        })];
                }
            });
        });
    };
    /**
     * Get the set of all activities available to  participants of a single study, by study identifier.
     * @param studyId
     */
    SensorService.prototype.allByStudy = function (studyId, transform, ignore_binary) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (studyId === null || studyId === undefined)
                            throw new Error("Required parameter studyId was null or undefined when calling sensorAllByStudy.");
                        if (ignore_binary === null || ignore_binary === undefined)
                            ignore_binary = false;
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (studyId === "me")
                                studyId = credential.length > 0 ? credential[0]["origin"] : studyId;
                            if (Demo_1.Demo.Study.filter(function (x) { return x["id"] === studyId; }).length > 0) {
                                output = Demo_1.Demo.Sensor.filter(function (x) { return x["#parent"] === studyId; }).map(function (x) { return Object.assign(new Sensor_1.Sensor(), x); });
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/study/" + studyId + "/sensor?ignore_binary=" + ignore_binary)];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new Sensor_1.Sensor(), x);
                        })];
                }
            });
        });
    };
    /**
     * Create a new Sensor under the given Study.
     * @param studyId
     * @param sensor
     */
    SensorService.prototype.create = function (studyId, sensor) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (studyId === null || studyId === undefined)
                            throw new Error("Required parameter studyId was null or undefined when calling sensorCreate.");
                        if (sensor === null || sensor === undefined)
                            throw new Error("Required parameter sensor was null or undefined when calling sensorCreate.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (studyId === "me")
                                studyId = credential.length > 0 ? credential[0]["origin"] : studyId;
                            if (Demo_1.Demo.Study.filter(function (x) { return x["id"] === studyId; }).length > 0) {
                                data = __assign(__assign({ "#type": "Sensor", "#parent": studyId }, sensor), { id: "sensor" +
                                        Math.random()
                                            .toString()
                                            .substring(2, 6) });
                                Demo_1.Demo.Sensor.push(data);
                                return [2 /*return*/, Promise.resolve({ data: data["id"] })];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.post("/study/" + studyId + "/sensor", sensor)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete an Sensor.
     * @param sensorId
     */
    SensorService.prototype.delete = function (sensorId) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sensorId === null || sensorId === undefined)
                            throw new Error("Required parameter sensorId was null or undefined when calling sensorDelete.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (sensorId === "me")
                                sensorId = credential.length > 0 ? credential[0]["origin"] : sensorId;
                            idx = Demo_1.Demo.Sensor.findIndex(function (x) { return x["id"] === sensorId; });
                            if (idx >= 0) {
                                Demo_1.Demo.Sensor.splice(idx, 1);
                                Demo_1.Demo.SensorEvent = Demo_1.Demo.SensorEvent.filter(function (x) { return x["sensor"] !== sensorId; });
                                Demo_1.Demo.Credential = Demo_1.Demo.Credential.filter(function (x) { return x["#parent"] !== sensorId; });
                                Demo_1.Demo.Tags = Demo_1.Demo.Tags.filter(function (x) { return x["#parent"] !== sensorId && x["target"] !== sensorId; });
                                return [2 /*return*/, Promise.resolve({})];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.delete("/sensor/" + sensorId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update an Sensor's settings.
     * @param sensorId
     * @param sensor
     */
    SensorService.prototype.update = function (sensorId, sensor) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var credential, idx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (sensorId === null || sensorId === undefined)
                            throw new Error("Required parameter sensorId was null or undefined when calling sensorUpdate.");
                        if (sensor === null || sensor === undefined)
                            throw new Error("Required parameter sensor was null or undefined when calling sensorUpdate.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (sensorId === "me")
                                sensorId = credential.length > 0 ? credential[0]["origin"] : sensorId;
                            idx = Demo_1.Demo.Sensor.findIndex(function (x) { return x["id"] === sensorId; });
                            if (idx >= 0) {
                                Demo_1.Demo.Sensor[idx] = {
                                    "#type": "Sensor",
                                    "#parent": Demo_1.Demo.Sensor[idx]["#parent"],
                                    id: Demo_1.Demo.Sensor[idx]["id"],
                                    spec: Demo_1.Demo.Sensor[idx]["spec"],
                                    name: (_a = sensor.name) !== null && _a !== void 0 ? _a : Demo_1.Demo.Sensor[idx]["name"],
                                    settings: sensor.settings
                                };
                                return [2 /*return*/, Promise.resolve({})];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.put("/sensor/" + sensorId, sensor)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * Get a single sensor, by identifier.
     * @param sensorId
     */
    SensorService.prototype.view = function (sensorId, transform, ignore_binary) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, data, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sensorId === null || sensorId === undefined)
                            throw new Error("Required parameter sensorId was null or undefined when calling sensorView.");
                        if (ignore_binary === null || ignore_binary === undefined)
                            ignore_binary = false;
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (sensorId === "me")
                                sensorId = credential.length > 0 ? credential[0]["origin"] : sensorId;
                            data = Demo_1.Demo.Sensor.filter(function (x) { return x["id"] === sensorId; }).map(function (x) { return Object.assign(new Sensor_1.Sensor(), x); });
                            if (data.length > 0) {
                                output = data[0];
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/sensor/" + sensorId + "?ignore_binary=" + ignore_binary)];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new Sensor_1.Sensor(), x);
                        })[0]];
                }
            });
        });
    };
    return SensorService;
}());
exports.SensorService = SensorService;
