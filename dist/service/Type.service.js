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
var Demo_1 = require("./Demo");
var index_1 = __importDefault(require("../index"));
var jsonata_1 = __importDefault(require("jsonata"));
var TypeService = /** @class */ (function () {
    function TypeService() {
    }
    /**
     *
     * @param typeId
     * @param attachmentKey
     */
    TypeService.prototype.getAttachment = function (typeId, attachmentKey) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, exists_1, ancestors_1, tagSelf_1, tagParent_1, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (attachmentKey === null || attachmentKey === undefined)
                            throw new Error("Required parameter attachmentKey was null or undefined when calling typeGetAttachment.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (typeId === "me")
                                typeId = credential.length > 0 ? credential[0]["origin"] : typeId;
                            exists_1 = [].concat(Demo_1.Demo.Researcher.filter(function (x) { return x["id"] === typeId; }), Demo_1.Demo.Study.filter(function (x) { return x["id"] === typeId; }), Demo_1.Demo.Participant.filter(function (x) { return x["id"] === typeId; }), Demo_1.Demo.Activity.filter(function (x) { return x["id"] === typeId; }) // ???
                            );
                            if (exists_1.length > 0) {
                                ancestors_1 = function (obj) {
                                    return obj["#type"] === "Researcher"
                                        ? []
                                        : obj["#type"] === "Study"
                                            ? [obj["#parent"]]
                                            : obj["#type"] === "Participant"
                                                ? [obj["#parent"], Demo_1.Demo.Study.filter(function (x) { return x["id"] === obj["#parent"]; }).map(function (x) { return x["#parent"]; })[0]]
                                                : obj["#type"] === "Activity"
                                                    ? [obj["#parent"], Demo_1.Demo.Study.filter(function (x) { return x["id"] === obj["#parent"]; }).map(function (x) { return x["#parent"]; })[0]]
                                                    : [];
                                };
                                tagSelf_1 = function (tag) { return [typeId].includes(tag["#parent"]) && [typeId, "me"].includes(tag["target"]); } // implicit & explicit
                                ;
                                tagParent_1 = function (tag) {
                                    return ancestors_1(exists_1[0]).includes(tag["#parent"]) && [typeId, exists_1[0]["#type"]].includes(tag["target"]);
                                } // implicit & explicit
                                ;
                                data = Demo_1.Demo.Tags.filter(function (x) { return (tagSelf_1(x) || tagParent_1(x)) && x["key"] === attachmentKey; });
                                return [2 /*return*/, Promise.resolve(data.length > 0 ? { data: data[0]["value"] } : { error: "404.not-found" })];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/type/" + typeId + "/attachment/" + attachmentKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param typeId
     * @param attachmentKey
     * @param invokeAlways
     * @param includeLogs
     * @param ignoreOutput
     */
    TypeService.prototype.getDynamicAttachment = function (typeId, attachmentKey, invokeAlways, includeLogs, ignoreOutput) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (attachmentKey === null || attachmentKey === undefined)
                            throw new Error("Required parameter attachmentKey was null or undefined when calling typeGetDynamicAttachment.");
                        if (invokeAlways === null || invokeAlways === undefined)
                            throw new Error("Required parameter invokeAlways was null or undefined when calling typeGetDynamicAttachment.");
                        if (includeLogs === null || includeLogs === undefined)
                            throw new Error("Required parameter includeLogs was null or undefined when calling typeGetDynamicAttachment.");
                        if (ignoreOutput === null || ignoreOutput === undefined)
                            throw new Error("Required parameter ignoreOutput was null or undefined when calling typeGetDynamicAttachment.");
                        queryParameters = new URLSearchParams();
                        if (invokeAlways !== undefined && invokeAlways !== null)
                            queryParameters.set("invoke_always", invokeAlways);
                        if (includeLogs !== undefined && includeLogs !== null)
                            queryParameters.set("include_logs", includeLogs);
                        if (ignoreOutput !== undefined && ignoreOutput !== null)
                            queryParameters.set("ignore_output", ignoreOutput);
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            // DEMO
                            return [2 /*return*/, Promise.resolve({ error: "500.demo-restriction" })];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/type/" + typeId + "/attachment/dynamic/" + attachmentKey + "?" + queryParameters.toString())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param typeId
     */
    TypeService.prototype.listAttachments = function (typeId) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, exists_2, ancestors_2, tagSelf_2, tagParent_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (typeId === "me")
                                typeId = credential.length > 0 ? credential[0]["origin"] : typeId;
                            exists_2 = [].concat(Demo_1.Demo.Researcher.filter(function (x) { return x["id"] === typeId; }), Demo_1.Demo.Study.filter(function (x) { return x["id"] === typeId; }), Demo_1.Demo.Participant.filter(function (x) { return x["id"] === typeId; }), Demo_1.Demo.Activity.filter(function (x) { return x["id"] === typeId; }) // ???
                            );
                            if (exists_2.length > 0) {
                                ancestors_2 = function (obj) {
                                    return obj["#type"] === "Researcher"
                                        ? []
                                        : obj["#type"] === "Study"
                                            ? [obj["#parent"]]
                                            : obj["#type"] === "Participant"
                                                ? [obj["#parent"], Demo_1.Demo.Study.filter(function (x) { return x["id"] === obj["#parent"]; }).map(function (x) { return x["#parent"]; })[0]]
                                                : obj["#type"] === "Activity"
                                                    ? [obj["#parent"], Demo_1.Demo.Study.filter(function (x) { return x["id"] === obj["#parent"]; }).map(function (x) { return x["#parent"]; })[0]]
                                                    : [];
                                };
                                tagSelf_2 = function (tag) { return [typeId].includes(tag["#parent"]) && [typeId, "me"].includes(tag["target"]); } // implicit & explicit
                                ;
                                tagParent_2 = function (tag) {
                                    return ancestors_2(exists_2[0]).includes(tag["#parent"]) && [typeId, exists_2[0]["#type"]].includes(tag["target"]);
                                } // implicit & explicit
                                ;
                                return [2 /*return*/, Promise.resolve({ data: Demo_1.Demo.Tags.filter(function (x) { return tagSelf_2(x) || tagParent_2(x); }).map(function (x) { return x.key; }) })];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/type/" + typeId + "/attachment")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the parent type identifier of the data structure referenced by the identifier.
     * @param typeId
     */
    TypeService.prototype.parent = function (typeId, transform) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, possible_1, output, output, output, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (typeId === "me")
                                typeId = credential.length > 0 ? credential[0]["origin"] : typeId;
                            possible_1 = [];
                            possible_1 = Demo_1.Demo.Researcher.filter(function (x) { return x["id"] === typeId; });
                            if (possible_1.length > 0) {
                                output = { data: {} };
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            possible_1 = Demo_1.Demo.Study.filter(function (x) { return x["id"] === typeId; });
                            if (possible_1.length > 0) {
                                output = { data: { Researcher: possible_1[0]["#parent"] } };
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            possible_1 = Demo_1.Demo.Participant.filter(function (x) { return x["id"] === typeId; });
                            if (possible_1.length > 0) {
                                output = {
                                    data: {
                                        Researcher: Demo_1.Demo.Study.filter(function (x) { return x["id"] === possible_1[0]["#parent"]; })[0],
                                        Study: possible_1[0]["#parent"]
                                    }
                                };
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            possible_1 = Demo_1.Demo.Activity.filter(function (x) { return x["id"] === typeId; });
                            if (possible_1.length > 0) {
                                output = {
                                    data: {
                                        Researcher: Demo_1.Demo.Study.filter(function (x) { return x["id"] === possible_1[0]["#parent"]; })[0],
                                        Study: possible_1[0]["#parent"]
                                    }
                                };
                                output = typeof transform === "string" ? jsonata_1.default(transform).evaluate(output) : output;
                                return [2 /*return*/, Promise.resolve(output)];
                            }
                            return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.get("/type/" + typeId + "/parent")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param typeId
     * @param target
     * @param attachmentKey
     * @param attachmentValue
     */
    TypeService.prototype.setAttachment = function (typeId, target, attachmentKey, attachmentValue) {
        return __awaiter(this, void 0, void 0, function () {
            var credential, exists, idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (target === null || target === undefined)
                            throw new Error("Required parameter target was null or undefined when calling typeSetAttachment.");
                        if (attachmentKey === null || attachmentKey === undefined)
                            throw new Error("Required parameter attachmentKey was null or undefined when calling typeSetAttachment.");
                        if (attachmentValue === undefined)
                            throw new Error("Required parameter attachmentValue was null or undefined when calling typeSetAttachment.");
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            credential = Demo_1.Demo.Credential.filter(function (x) { return x["access_key"] === index_1.default.Auth._auth.id && x["secret_key"] === index_1.default.Auth._auth.password; });
                            if (credential.length === 0)
                                return [2 /*return*/, Promise.resolve({ error: "403.invalid-credentials" })];
                            if (typeId === "me")
                                typeId = credential.length > 0 ? credential[0]["origin"] : typeId;
                            exists = [].concat(Demo_1.Demo.Researcher.filter(function (x) { return x["id"] === typeId; }), Demo_1.Demo.Study.filter(function (x) { return x["id"] === typeId; }), Demo_1.Demo.Participant.filter(function (x) { return x["id"] === typeId; }), Demo_1.Demo.Activity.filter(function (x) { return x["id"] === typeId; }) // ???
                            );
                            if (exists.length > 0) {
                                // FIXME: Sibling Tags? (Participant, Activity, Sensor)
                                if (attachmentValue === null) {
                                    // DELETE
                                    Demo_1.Demo.Tags = Demo_1.Demo.Tags.filter(function (x) { return !(x["#parent"] === typeId && x["target"] === target && x["key"] === attachmentKey); });
                                }
                                else {
                                    idx = Demo_1.Demo.Tags.findIndex(function (x) { return x["#parent"] === typeId && x["target"] === target && x["key"] === attachmentKey; });
                                    if (idx >= 0) {
                                        // UPDATE
                                        console.dir("update");
                                        Demo_1.Demo.Tags[idx]["value"] = attachmentValue;
                                    }
                                    else {
                                        // INSERT
                                        console.dir("insert");
                                        Demo_1.Demo.Tags.push({
                                            "#type": "Tag",
                                            "#parent": typeId,
                                            target: target,
                                            key: attachmentKey,
                                            value: attachmentValue
                                        });
                                    }
                                }
                                return [2 /*return*/, Promise.resolve({})];
                            }
                            else {
                                return [2 /*return*/, Promise.resolve({ error: "404.not-found" })];
                            }
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.put("/type/" + typeId + "/attachment/" + attachmentKey + "/" + target, attachmentValue)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param invokeOnce
     * @param typeId
     * @param target
     * @param attachmentKey
     * @param attachmentValue
     */
    TypeService.prototype.setDynamicAttachment = function (invokeOnce, typeId, target, attachmentKey, attachmentValue) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (invokeOnce === null || invokeOnce === undefined)
                            throw new Error("Required parameter invokeOnce was null or undefined when calling typeSetDynamicAttachment.");
                        if (target === null || target === undefined)
                            throw new Error("Required parameter target was null or undefined when calling typeSetDynamicAttachment.");
                        if (attachmentKey === null || attachmentKey === undefined)
                            throw new Error("Required parameter attachmentKey was null or undefined when calling typeSetDynamicAttachment.");
                        if (attachmentValue === null || attachmentValue === undefined)
                            throw new Error("Required parameter attachmentValue was null or undefined when calling typeSetDynamicAttachment.");
                        queryParameters = new URLSearchParams();
                        if (invokeOnce !== undefined && invokeOnce !== null)
                            queryParameters.set("invoke_once", invokeOnce);
                        if (index_1.default.Auth._auth.serverAddress === "https://demo.lamp.digital") {
                            // DEMO
                            return [2 /*return*/, Promise.resolve({ error: "500.demo-restriction" })];
                        }
                        return [4 /*yield*/, Fetch_1.Fetch.put("/type/" + typeId + "/attachment/dynamic/" + attachmentKey + "/" + target + "?" + queryParameters.toString(), attachmentValue)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return TypeService;
}());
exports.TypeService = TypeService;
