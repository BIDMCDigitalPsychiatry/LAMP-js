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
var Fetch_1 = require("./Fetch");
var ActivityEvent_1 = require("../model/ActivityEvent");
var Demo_1 = require("./Demo");
var index_1 = __importDefault(require("../index"));
var jsonata_1 = __importDefault(require("jsonata"));
var ActivityEventService = /** @class */ (function () {
    function ActivityEventService() {
    }
    /**
     * Get the set of all activity events produced by a  given participant, by identifier.
     * @param participantId
     * @param origin
     * @param from
     * @param to
     */
    ActivityEventService.prototype.allByParticipant = function (participantId, origin, from, to, limit, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, credential, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (participantId === null || participantId === undefined)
                            throw new Error("Required parameter participantId was null or undefined when calling activityEventAllByParticipant.");
                        queryParameters = new URLSearchParams();
                        if (origin !== undefined && origin !== null)
                            queryParameters.set("origin", origin);
                        if (from !== undefined && from !== null)
                            queryParameters.set("from", from);
                        if (to !== undefined && to !== null)
                            queryParameters.set("to", to);
                        if (limit !== undefined && limit !== null)
                            queryParameters.set("limit", limit);
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (participantId === "me")
                                participantId = credential.length > 0 ? credential[0]["origin"] : participantId;
                            if (Demo_1.Demo.Participant.filter(function (x) { return x["id"] === participantId; }).length > 0) {
                                output = Demo_1.Demo.ActivityEvent.filter(function (x) { return x["#parent"] === participantId && (!!origin ? x["activity"] === origin : true); }).map(function (x) { return Object.assign(new ActivityEvent_1.ActivityEvent(), x); });
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/participant/" + participantId + "/activity_event?" + queryParameters.toString())];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) { return Object.assign(new ActivityEvent_1.ActivityEvent(), x); })];
                }
            });
        });
    };
    /**
     * Get the set of all activity events produced by participants  of any study conducted by a researcher, by researcher identifier.
     * @param researcherId
     * @param origin
     * @param from
     * @param to
     */
    ActivityEventService.prototype.allByResearcher = function (researcherId, origin, from, to, limit, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, credential, participants, fn_1, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (researcherId === null || researcherId === undefined)
                            throw new Error("Required parameter researcherId was null or undefined when calling activityEventAllByResearcher.");
                        queryParameters = new URLSearchParams();
                        if (origin !== undefined && origin !== null)
                            queryParameters.set("origin", origin);
                        if (from !== undefined && from !== null)
                            queryParameters.set("from", from);
                        if (to !== undefined && to !== null)
                            queryParameters.set("to", to);
                        if (limit !== undefined && limit !== null)
                            queryParameters.set("limit", limit);
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (researcherId === "me")
                                researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId;
                            if (Demo_1.Demo.Researcher.filter(function (x) { return x["id"] === researcherId; }).length > 0) {
                                participants = Demo_1.Demo.Study.filter(function (x) { return x["#parent"] === researcherId; })
                                    .map(function (x) { return Demo_1.Demo.Participant.filter(function (y) { return y["#parent"] === x["id"]; }); })
                                    .flat(1);
                                fn_1 = function (id) {
                                    return Demo_1.Demo.ActivityEvent.filter(function (x) { return x["#parent"] === id && (!!origin ? x["activity"] === origin : true); }).map(function (x) {
                                        return Object.assign(new ActivityEvent_1.ActivityEvent(), x);
                                    });
                                };
                                output = participants.reduce(function (all, participant) {
                                    var _a;
                                    return (__assign(__assign({}, all), (_a = {}, _a[participant["id"]] = fn_1(participant["id"]), _a)));
                                }, {});
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/researcher/" + researcherId + "/activity_event?" + queryParameters.toString())];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) { return Object.assign(new ActivityEvent_1.ActivityEvent(), x); })];
                }
            });
        });
    };
    /**
     * Get the set of all activity events produced by participants of a single study, by study identifier.
     * @param studyId
     * @param origin
     * @param from
     * @param to
     */
    ActivityEventService.prototype.allByStudy = function (studyId, origin, from, to, limit, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, credential, participants, fn_2, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (studyId === null || studyId === undefined)
                            throw new Error("Required parameter studyId was null or undefined when calling activityEventAllByStudy.");
                        queryParameters = new URLSearchParams();
                        if (origin !== undefined && origin !== null)
                            queryParameters.set("origin", origin);
                        if (from !== undefined && from !== null)
                            queryParameters.set("from", from);
                        if (to !== undefined && to !== null)
                            queryParameters.set("to", to);
                        if (limit !== undefined && limit !== null)
                            queryParameters.set("limit", limit);
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (studyId === "me")
                                studyId = credential.length > 0 ? credential[0]["origin"] : studyId;
                            if (Demo_1.Demo.Study.filter(function (x) { return x["id"] === studyId; }).length > 0) {
                                participants = Demo_1.Demo.Participant.filter(function (x) { return x["#parent"] === studyId; });
                                fn_2 = function (id) {
                                    return Demo_1.Demo.ActivityEvent.filter(function (x) { return x["#parent"] === id && (!!origin ? x["activity"] === origin : true); }).map(function (x) {
                                        return Object.assign(new ActivityEvent_1.ActivityEvent(), x);
                                    });
                                };
                                output = participants.reduce(function (all, participant) {
                                    var _a;
                                    return (__assign(__assign({}, all), (_a = {}, _a[participant["id"]] = fn_2(participant["id"]), _a)));
                                }, {});
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/study/" + studyId + "/activity_event?" + queryParameters.toString())];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) { return Object.assign(new ActivityEvent_1.ActivityEvent(), x); })];
                }
            });
        });
    };
    /**
     * Create a new ActivityEvent for the given Participant.
     * @param participantId
     * @param activityEvent
     */
    ActivityEventService.prototype.create = function (participantId, activityEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var credential;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (participantId === null || participantId === undefined)
                            throw new Error("Required parameter participantId was null or undefined when calling activityEventCreate.");
                        if (activityEvent === null || activityEvent === undefined)
                            throw new Error("Required parameter activityEvent was null or undefined when calling activityEventCreate.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (participantId === "me")
                                participantId = credential.length > 0 ? credential[0]["origin"] : participantId;
                            if (Demo_1.Demo.Participant.filter(function (x) { return x["id"] === participantId; }).length > 0) {
                                Demo_1.Demo.ActivityEvent.push(__assign({ "#type": "ActivityEvent", "#parent": participantId }, activityEvent));
                                return [2 /*return*/, Promise.resolve({})];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.post("/participant/" + participantId + "/activity_event", activityEvent)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete a ActivityEvent.
     * @param participantId
     * @param origin
     * @param from
     * @param to
     */
    ActivityEventService.prototype.delete = function (participantId, origin, from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, credential;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (participantId === null || participantId === undefined)
                            throw new Error("Required parameter participantId was null or undefined when calling activityEventDelete.");
                        queryParameters = new URLSearchParams();
                        if (origin !== undefined && origin !== null)
                            queryParameters.set("origin", origin);
                        if (from !== undefined && from !== null)
                            queryParameters.set("from", from);
                        if (to !== undefined && to !== null)
                            queryParameters.set("to", to);
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (participantId === "me")
                                participantId = credential.length > 0 ? credential[0]["origin"] : participantId;
                            if (Demo_1.Demo.Participant.filter(function (x) { return x["id"] === participantId; }).length > 0) {
                                return [2 /*return*/, Promise.resolve({ error: "500.demo-restriction" })];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.delete("/participant/" + participantId + "/activity_event?" + queryParameters.toString())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ActivityEventService;
}());
exports.ActivityEventService = ActivityEventService;
