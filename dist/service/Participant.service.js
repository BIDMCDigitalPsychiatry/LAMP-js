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
exports.ParticipantService = void 0;
var Fetch_1 = require("./Fetch");
var Participant_1 = require("../model/Participant");
var Demo_1 = require("./Demo");
var index_1 = __importDefault(require("../index"));
var jsonata_1 = __importDefault(require("jsonata"));
var ParticipantService = /** @class */ (function () {
    function ParticipantService() {
    }
    /**
     * Get the set of all participants.
     */
    ParticipantService.prototype.all = function (transform) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            output = Demo_1.Demo.Participant.map(function (x) { return Object.assign(new Participant_1.Participant(), x); });
                            output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                            return [2 /*return*/, Promise.resolve(output)];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/participant")];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new Participant_1.Participant(), x);
                        })];
                }
            });
        });
    };
    /**
     * Get the set of all participants under a single researcher.
     * @param researcherId
     */
    ParticipantService.prototype.allByResearcher = function (researcherId, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (researcherId === null || researcherId === undefined)
                            throw new Error("Required parameter researcherId was null or undefined when calling participantAllByResearcher.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (researcherId === "me")
                                researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId;
                            if (Demo_1.Demo.Researcher.filter(function (x) { return x["id"] === researcherId; }).length > 0) {
                                output = Demo_1.Demo.Participant.filter(function (x) {
                                    return Demo_1.Demo.Study.filter(function (y) { return y["#parent"] === researcherId; })
                                        .map(function (y) { return y["id"]; })
                                        .includes(x["#parent"]);
                                }).map(function (x) { return Object.assign(new Participant_1.Participant(), x); });
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/researcher/" + researcherId + "/participant")];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) { return Object.assign(new Participant_1.Participant(), x); })];
                }
            });
        });
    };
    /**
     * Get the set of all participants in a single study.
     * @param studyId
     */
    ParticipantService.prototype.allByStudy = function (studyId, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (studyId === null || studyId === undefined)
                            throw new Error("Required parameter studyId was null or undefined when calling participantAllByStudy.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (studyId === "me")
                                studyId = credential.length > 0 ? credential[0]["origin"] : studyId;
                            if (Demo_1.Demo.Study.filter(function (x) { return x["id"] === studyId; }).length > 0) {
                                output = Demo_1.Demo.Participant.filter(function (x) { return x["#parent"] === studyId; }).map(function (x) {
                                    return Object.assign(new Participant_1.Participant(), x);
                                });
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/study/" + studyId + "/participant")];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new Participant_1.Participant(), x);
                        })];
                }
            });
        });
    };
    /**
     * Create a new Participant for the given Study.
     * @param studyId
     * @param participant
     */
    ParticipantService.prototype.create = function (studyId, participant) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (studyId === null || studyId === undefined)
                            throw new Error("Required parameter studyId was null or undefined when calling participantCreate.");
                        if (participant === null || participant === undefined)
                            throw new Error("Required parameter participant was null or undefined when calling participantCreate.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (studyId === "me")
                                studyId = credential.length > 0 ? credential[0]["origin"] : studyId;
                            if (Demo_1.Demo.Study.filter(function (x) { return x["id"] === studyId; }).length > 0) {
                                data = {
                                    "#type": "Participant",
                                    "#parent": studyId,
                                    id: "U" +
                                        Math.random()
                                            .toString()
                                            .substring(2, 11),
                                    language: "en",
                                    theme: "#359FFE",
                                    emergency_contact: null,
                                    helpline: null
                                };
                                Demo_1.Demo.Participant.push(data);
                                return [2 /*return*/, Promise.resolve({ data: data["id"] })];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.post("/study/" + studyId + "/participant", participant)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete a participant AND all owned data or event streams.
     * @param participantId
     */
    ParticipantService.prototype.delete = function (participantId) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (participantId === null || participantId === undefined)
                            throw new Error("Required parameter participantId was null or undefined when calling participantDelete.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (participantId === "me")
                                participantId = credential.length > 0 ? credential[0]["origin"] : participantId;
                            idx = Demo_1.Demo.Participant.findIndex(function (x) { return x["id"] === participantId; });
                            if (idx >= 0) {
                                Demo_1.Demo.Participant.splice(idx, 1);
                                Demo_1.Demo.ActivityEvent = Demo_1.Demo.ActivityEvent.filter(function (x) { return x["#parent"] !== participantId; });
                                Demo_1.Demo.SensorEvent = Demo_1.Demo.SensorEvent.filter(function (x) { return x["#parent"] !== participantId; });
                                Demo_1.Demo.Credential = Demo_1.Demo.Credential.filter(function (x) { return x["#parent"] !== participantId; });
                                Demo_1.Demo.Tags = Demo_1.Demo.Tags.filter(function (x) { return x["#parent"] !== participantId && x["target"] !== participantId; });
                                return [2 /*return*/, Promise.resolve({})];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.delete("/participant/" + participantId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update a Participant's settings.
     * @param participantId
     * @param participant
     */
    ParticipantService.prototype.update = function (participantId, participant) {
        return __awaiter(this, void 0, void 0, function () {
            var credential;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (participantId === null || participantId === undefined)
                            throw new Error("Required parameter participantId was null or undefined when calling participantUpdate.");
                        if (participant === null || participant === undefined)
                            throw new Error("Required parameter participant was null or undefined when calling participantUpdate.");
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
                        return [4 /*yield*/, Fetch_1.Fetch.put("/participant/" + participantId, participant)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get a single participant, by identifier.
     * @param participantId
     */
    ParticipantService.prototype.view = function (participantId, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, data, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (participantId === null || participantId === undefined)
                            throw new Error("Required parameter participantId was null or undefined when calling participantView.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (participantId === "me")
                                participantId = credential.length > 0 ? credential[0]["origin"] : participantId;
                            data = Demo_1.Demo.Participant.filter(function (x) { return x["id"] === participantId; }).map(function (x) { return Object.assign(new Participant_1.Participant(), x); });
                            if (data.length > 0) {
                                output = data[0];
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/participant/" + participantId)];
                    case 1: return [2 /*return*/, (_a.sent()).data.map(function (x) {
                            return Object.assign(new Participant_1.Participant(), x);
                        })[0]];
                }
            });
        });
    };
    return ParticipantService;
}());
exports.ParticipantService = ParticipantService;
