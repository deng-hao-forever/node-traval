"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UUID = require('uuid');
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.createUUID = function () {
        return UUID.v1();
    };
    Utils.prototype.httpSuccess = function (_a) {
        var _b = _a.code, code = _b === void 0 ? 200 : _b, data = _a.data, _c = _a.msg, msg = _c === void 0 ? '请求成功' : _c;
        return {
            code: code,
            data: data,
            msg: msg,
        };
    };
    Utils.prototype.httpFail = function (_a) {
        var _b = _a.code, code = _b === void 0 ? 500 : _b, data = _a.data, _c = _a.msg, msg = _c === void 0 ? '请求失败' : _c;
        return {
            code: code,
            data: data,
            msg: msg,
        };
    };
    return Utils;
}());
exports.default = new Utils();
