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
exports.sanitizeMetaStrings = exports.getParsedNftAccountsByOwner = void 0;
var web3_js_1 = require("@solana/web3.js");
var lodash_chunk_1 = __importDefault(require("lodash.chunk"));
var lodash_orderby_1 = __importDefault(require("lodash.orderby"));
var utils_1 = require("./utils");
var solana_1 = require("./config/solana");
var sortKeys;
(function (sortKeys) {
    sortKeys["updateAuthority"] = "updateAuthority";
})(sortKeys || (sortKeys = {}));
var getParsedNftAccountsByOwner = function (_a) {
    var publicAddress = _a.publicAddress, _b = _a.connection, connection = _b === void 0 ? (0, utils_1.createConnectionConfig)() : _b, _c = _a.sanitize, sanitize = _c === void 0 ? true : _c, _d = _a.strictNftStandard, strictNftStandard = _d === void 0 ? false : _d, _e = _a.stringifyPubKeys, stringifyPubKeys = _e === void 0 ? true : _e, _f = _a.sort, sort = _f === void 0 ? true : _f;
    return __awaiter(void 0, void 0, void 0, function () {
        var isValidAddress, splAccounts, nftAccounts, acountsMetaAddressPromises, acountsMetaAddress, accountsRawMetaResponse, accountsRawMeta, accountsDecodedMeta, accountsFiltered, accountsSorted;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    isValidAddress = (0, utils_1.isValidSolanaAddress)(publicAddress);
                    if (!isValidAddress) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, connection.getParsedTokenAccountsByOwner(new web3_js_1.PublicKey(publicAddress), {
                            programId: new web3_js_1.PublicKey(solana_1.TOKEN_PROGRAM),
                        })];
                case 1:
                    splAccounts = (_g.sent()).value;
                    nftAccounts = splAccounts.filter(function (_a) {
                        var _b, _c, _d, _e, _f, _g, _h, _j;
                        var account = _a.account;
                        var amount = (_e = (_d = (_c = (_b = account === null || account === void 0 ? void 0 : account.data) === null || _b === void 0 ? void 0 : _b.parsed) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.tokenAmount) === null || _e === void 0 ? void 0 : _e.uiAmount;
                        var decimals = (_j = (_h = (_g = (_f = account === null || account === void 0 ? void 0 : account.data) === null || _f === void 0 ? void 0 : _f.parsed) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.tokenAmount) === null || _j === void 0 ? void 0 : _j.decimals;
                        if (strictNftStandard) {
                            // Here is correct way to do it. it is described by Solana
                            // faster way, will filter out most unrelivant SPL-tokens
                            return decimals === 0 && amount >= 1;
                        }
                        // Weak method to find NFT tokens
                        // some older NFTs can be found only this way, like Solarians e.g.
                        return amount > 0;
                    });
                    return [4 /*yield*/, Promise.allSettled(nftAccounts.map(function (_a) {
                            var _b, _c, _d;
                            var account = _a.account;
                            var address = (_d = (_c = (_b = account === null || account === void 0 ? void 0 : account.data) === null || _b === void 0 ? void 0 : _b.parsed) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.mint;
                            return address ? (0, utils_1.getSolanaMetadataAddress)(new web3_js_1.PublicKey(address)) : null;
                        }))];
                case 2:
                    acountsMetaAddressPromises = _g.sent();
                    acountsMetaAddress = acountsMetaAddressPromises
                        .filter(onlySuccessfullPromises)
                        .map(function (p) { return p.value; });
                    return [4 /*yield*/, Promise.allSettled((0, lodash_chunk_1.default)(acountsMetaAddress, 99).map(function (chunk) { return __awaiter(void 0, void 0, void 0, function () {
                            var err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, connection.getMultipleAccountsInfo(chunk)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                    case 2:
                                        err_1 = _a.sent();
                                        console.log(err_1); // eslint-disable-line
                                        return [2 /*return*/, false];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 3:
                    accountsRawMetaResponse = _g.sent();
                    accountsRawMeta = accountsRawMetaResponse
                        .filter(function (_a) {
                        var status = _a.status;
                        return status === "fulfilled";
                    })
                        .flatMap(function (p) { return p.value; });
                    return [4 /*yield*/, Promise.allSettled(accountsRawMeta.map(function (accountInfo) { var _a; return (0, utils_1.decodeTokenMetadata)((_a = accountInfo) === null || _a === void 0 ? void 0 : _a.data); }))];
                case 4:
                    accountsDecodedMeta = _g.sent();
                    accountsFiltered = accountsDecodedMeta
                        .filter(onlySuccessfullPromises)
                        .filter(onlyNftsWithMetadata)
                        .map(function (p) {
                        var value = p.value;
                        return sanitize ? sanitizeTokenMeta(value) : value;
                    })
                        .map(function (token) { return (stringifyPubKeys ? publicKeyToString(token) : token); });
                    // sort accounts if sort is true & updateAuthority stringified
                    if (stringifyPubKeys && sort) {
                        accountsSorted = (0, lodash_orderby_1.default)(accountsFiltered, [sortKeys.updateAuthority], ["asc"]);
                        return [2 /*return*/, accountsSorted];
                    }
                    // otherwise return unsorted
                    return [2 /*return*/, accountsFiltered];
            }
        });
    });
};
exports.getParsedNftAccountsByOwner = getParsedNftAccountsByOwner;
var sanitizeTokenMeta = function (tokenData) {
    var _a, _b, _c;
    return (__assign(__assign({}, tokenData), { data: __assign(__assign({}, tokenData === null || tokenData === void 0 ? void 0 : tokenData.data), { name: (0, exports.sanitizeMetaStrings)((_a = tokenData === null || tokenData === void 0 ? void 0 : tokenData.data) === null || _a === void 0 ? void 0 : _a.name), symbol: (0, exports.sanitizeMetaStrings)((_b = tokenData === null || tokenData === void 0 ? void 0 : tokenData.data) === null || _b === void 0 ? void 0 : _b.symbol), uri: (0, exports.sanitizeMetaStrings)((_c = tokenData === null || tokenData === void 0 ? void 0 : tokenData.data) === null || _c === void 0 ? void 0 : _c.uri) }) }));
};
var publicKeyToString = function (tokenData) {
    var _a, _b, _c, _d, _e, _f;
    return (__assign(__assign({}, tokenData), { mint: (_b = (_a = tokenData === null || tokenData === void 0 ? void 0 : tokenData.mint) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a), updateAuthority: (_d = (_c = tokenData === null || tokenData === void 0 ? void 0 : tokenData.updateAuthority) === null || _c === void 0 ? void 0 : _c.toString) === null || _d === void 0 ? void 0 : _d.call(_c), data: __assign(__assign({}, tokenData === null || tokenData === void 0 ? void 0 : tokenData.data), { creators: (_f = (_e = tokenData === null || tokenData === void 0 ? void 0 : tokenData.data) === null || _e === void 0 ? void 0 : _e.creators) === null || _f === void 0 ? void 0 : _f.map(function (c) {
                var _a, _b;
                return (__assign(__assign({}, c), { address: (_b = (_a = new web3_js_1.PublicKey(c === null || c === void 0 ? void 0 : c.address)) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a) }));
            }) }) }));
};
var sanitizeMetaStrings = function (metaString) {
    return metaString.replace(/\0/g, "");
};
exports.sanitizeMetaStrings = sanitizeMetaStrings;
var onlySuccessfullPromises = function (result) { return result && result.status === "fulfilled"; };
var onlyNftsWithMetadata = function (t) {
    var _a, _b, _c;
    var uri = (_c = (_b = (_a = t.value.data) === null || _a === void 0 ? void 0 : _a.uri) === null || _b === void 0 ? void 0 : _b.replace) === null || _c === void 0 ? void 0 : _c.call(_b, /\0/g, "");
    return uri !== "" && uri !== undefined;
};
//# sourceMappingURL=getParsedNftAccountsByOwner.js.map