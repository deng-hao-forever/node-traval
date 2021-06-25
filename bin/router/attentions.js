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
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var common_1 = __importDefault(require("../utils/common"));
var router = express_1.default.Router();
router.get('/get', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pageSize, pageNo, city, list, arrCityAttentionList;
    return __generator(this, function (_b) {
        _a = req.query, pageSize = _a.pageSize, pageNo = _a.pageNo, city = _a.city;
        if (!pageSize) {
            return [2 /*return*/, res.json(common_1.default.httpFail({ data: [], msg: 'pageSize 不存在' }))];
        }
        if (!pageNo) {
            return [2 /*return*/, res.json(common_1.default.httpFail({ data: [], msg: 'pageNo 不存在' }))];
        }
        if (!city) {
            return [2 /*return*/, res.json(common_1.default.httpFail({ data: [], msg: 'city 不存在' }))];
        }
        arrCityAttentionList = [];
        selectAttention({
            pageSize: pageSize,
            pageNo: pageNo,
            city: city,
            callback: function (res1) {
                arrCityAttentionList = res1.arrCityAttentionList;
                list = res1.list;
                res.json(common_1.default.httpSuccess({
                    data: {
                        pageNo: pageNo,
                        pageSize: pageSize,
                        city: city,
                        list: list,
                        totalPage: Math.ceil(arrCityAttentionList.length / pageSize),
                    },
                }));
            },
        });
        return [2 /*return*/];
    });
}); });
router.get('/banner', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, city, _b, count, arrCityAttentionList;
    return __generator(this, function (_c) {
        _a = req.query, city = _a.city, _b = _a.count, count = _b === void 0 ? 4 : _b;
        if (!city) {
            return [2 /*return*/, res.json(common_1.default.httpFail({ data: [], msg: 'city 不存在' }))];
        }
        arrCityAttentionList = [];
        selectAttention({
            city: city,
            callback: function (res1) {
                arrCityAttentionList = res1.arrCityAttentionList;
                var list = [];
                var indexArr = [];
                list = getListByAttentionsList(count, arrCityAttentionList, indexArr);
                res.json(common_1.default.httpSuccess({
                    data: { list: list },
                }));
            },
        });
        return [2 /*return*/];
    });
}); });
router.get('/detail', function (req, res, next) {
    var id = req.query.id;
    if (!id) {
        return res.json(common_1.default.httpFail({ data: [], msg: 'id 不存在' }));
    }
    fs_1.default.readFile('attention_introduction.json', function (err, data) {
        if (err) {
            return;
        }
        if (data) {
            var list = JSON.parse(data.toString());
            var arr = list.filter(function (item) { return item.id == id; });
            if (!arr.length) {
                return res.json(common_1.default.httpFail({ data: [], msg: 'id有误' }));
            }
            res.json(common_1.default.httpSuccess({
                data: arr[0],
            }));
        }
    });
});
router.get('/intro', function (req, res, next) {
    var city = req.query.city;
    var resp = {};
    var file = fs_1.default.readFileSync('attentions.json');
    if (file) {
        var list = JSON.parse(file.toString());
        list.forEach(function (item) {
            if (item.city === city) {
                resp = item;
            }
        });
    }
    if (resp.city) {
        res.json(common_1.default.httpSuccess({
            data: resp,
        }));
    }
    else {
        res.json(common_1.default.httpFail({
            data: false,
            msg: 'city 不存在',
        }));
    }
});
router.post('/post', function (req, res, next) {
    var _a = req.body, id = _a.id, content = _a.content;
    var userId = req.get('token') || '';
    if (!userId) {
        return res.json(common_1.default.httpFail({
            code: 403,
            data: false,
            msg: 'token无效',
        }));
    }
    if (!content) {
        return res.json(common_1.default.httpFail({
            data: false,
            msg: '评论内容不能为空',
        }));
    }
    if (!id) {
        return res.json(common_1.default.httpFail({
            data: false,
            msg: '找不到对应景点',
        }));
    }
    fs_1.default.readFile('user.json', function (err, data) {
        if (err) {
            return res.json(common_1.default.httpFail({
                data: false,
            }));
        }
        if (data) {
            var userList = JSON.parse(data.toString());
            var arr_1 = userList.filter(function (item) { return item.id === userId; });
            if (!arr_1.length) {
                return res.json(common_1.default.httpFail({
                    code: 403,
                    data: [],
                    msg: 'token无效',
                }));
            }
            fs_1.default.readFile('attention_introduction.json', function (err1, data1) {
                if (err1) {
                    return res.json(common_1.default.httpFail({
                        data: false,
                    }));
                }
                if (data1) {
                    var attentions_list = JSON.parse(data1.toString());
                    attentions_list.forEach(function (item) {
                        if (item.id === id) {
                            item.comments = (item.comments && item.comments) || [];
                            item.comments.push({
                                value: content,
                                id: common_1.default.createUUID(),
                                user: arr_1[0],
                            });
                            item.comment_count = item.comments.length;
                        }
                    });
                    fs_1.default.writeFile('attention_introduction.json', JSON.stringify(attentions_list), function () {
                        return res.json(common_1.default.httpSuccess({
                            data: true,
                            msg: '评论成功',
                        }));
                    });
                }
            });
        }
    });
});
router.post('/liked', function (req, res, next) {
    var _a = req.body, liked = _a.liked, id = _a.id;
    fs_1.default.readFile('attention_introduction.json', function (err, data) {
        if (err) {
            console.log(err);
        }
        if (data) {
            var flag_1 = false;
            var list = JSON.parse(data.toString());
            list.forEach(function (item) {
                if (item.id === id) {
                    flag_1 = true;
                    item.liked = liked;
                    if (liked) {
                        item.count++;
                    }
                    else {
                        item.count--;
                    }
                }
            });
            if (flag_1) {
                res.json(common_1.default.httpSuccess({
                    data: true,
                }));
            }
            else {
                res.json(common_1.default.httpFail({
                    data: false,
                    msg: 'id 错误',
                }));
            }
            fs_1.default.writeFile('attention_introduction.json', JSON.stringify(list), function () { });
        }
    });
});
router.get('/way', function (req, res, next) {
    var city = req.query.city;
    fs_1.default.readFile('way.json', function (err, data) {
        if (err) {
            console.log(err);
        }
        if (data) {
            var list = JSON.parse(data.toString());
            res.json(common_1.default.httpSuccess({
                data: list,
            }));
        }
    });
});
function selectAttention(_a) {
    var _b = _a.pageNo, pageNo = _b === void 0 ? '' : _b, _c = _a.pageSize, pageSize = _c === void 0 ? '' : _c, city = _a.city, callback = _a.callback;
    var arrCityAttentionList = [];
    var list = [];
    fs_1.default.readFile('attention_introduction.json', function (err, data) {
        if (err) {
            return callback({ list: list, arrCityAttentionList: arrCityAttentionList });
        }
        if (data) {
            var arr = JSON.parse(data.toString());
            arr.forEach(function (item) {
                if (item.city === city) {
                    arrCityAttentionList.push(item);
                }
            });
            if (!pageNo || !pageSize)
                return callback({
                    list: list,
                    arrCityAttentionList: arrCityAttentionList,
                });
            //pn: 1  pageS 5
            if (pageNo * pageSize > arrCityAttentionList.length) {
                list = arrCityAttentionList.slice((pageNo - 1) * pageSize, arrCityAttentionList.length);
            }
            else {
                list = arrCityAttentionList.slice((pageNo - 1) * pageSize, pageNo * pageSize);
            }
            return callback({
                list: list,
                arrCityAttentionList: arrCityAttentionList,
            });
        }
    });
}
function randomNum(_a) {
    var min = _a.min, max = _a.max;
    return ~~(Math.random() * max + min);
}
var getListByAttentionsList = function (count, arrCityAttentionList, indexArr) {
    var list = [];
    if (indexArr.length < count) {
        var index = randomNum({
            min: 0,
            max: arrCityAttentionList.length - 1,
        });
        if (!~indexArr.indexOf(index)) {
            indexArr.push(index);
        }
        list = getListByAttentionsList(count, arrCityAttentionList, indexArr);
        return list;
    }
    else {
        indexArr.forEach(function (flag) {
            list.push(arrCityAttentionList[flag]);
        });
        return list;
    }
};
exports.default = router;
