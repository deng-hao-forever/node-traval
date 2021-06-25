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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('selenium-webdriver'), Builder = _a.Builder, By = _a.By, Key = _a.Key, until = _a.until;
var fs = require('fs');
var Spider = /** @class */ (function () {
    function Spider() {
        // selenium webdriver
        this.driver = {};
        // 获取的数据数组
        this.list = [];
        this.currentPage = 0;
    }
    //获取driver 对象
    Spider.prototype.getDriver = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, new Builder().forBrowser('chrome').build()];
                    case 1:
                        _a.driver = _b.sent();
                        return [2 /*return*/, this.driver];
                }
            });
        });
    };
    // 获取HTMl
    Spider.prototype.getHtml = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.get(url)];
            });
        });
    };
    // 查找元素
    Spider.prototype.findElement = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.findElement(callback)];
            });
        });
    };
    // 等待
    Spider.prototype.wait = function (fun) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.wait(fun())];
            });
        });
    };
    Spider.prototype.waitTime = function (n) {
        return new Promise(function (resolve) {
            return setTimeout(function () {
                resolve();
            }, n);
        });
    };
    Spider.prototype.getIntro = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDriver()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getHtml('http://www.sunzhongshanguli.com/')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.waitTime(3000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.findElement(By.id('formTabButton1332'))];
                    case 4:
                        tab = _a.sent();
                        tab.click();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Spider;
}());
exports.default = Spider;
var spider = new Spider();
spider.getIntro();
