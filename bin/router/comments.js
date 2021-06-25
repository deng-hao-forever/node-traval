"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var common_1 = __importDefault(require("../utils/common"));
var router = express_1.default.Router();
router.get('/get', function (req, res, next) {
    var _a = req.query, pageNo = _a.pageNo, pageSize = _a.pageSize;
    var stream = fs_1.default.readFileSync('attention_introduction.json');
    if (stream) {
        var list = JSON.parse(stream.toString());
        var arr_1 = [];
        var apiList = [];
        list.forEach(function (item) {
            arr_1.push.apply(arr_1, item.comments);
        });
        if (pageNo * pageSize > arr_1.length) {
            apiList = arr_1.slice((pageNo - 1) * pageSize, arr_1.length);
        }
        else {
            apiList = arr_1.slice((pageNo - 1) * pageSize, pageNo * pageSize);
        }
        res.json(common_1.default.httpSuccess({
            data: {
                totalPage: Math.ceil(arr_1.length / pageSize),
                list: apiList,
                pageNo: pageNo,
            },
        }));
    }
});
router.delete('/delete', function (req, res, next) {
    var id = req.body.id;
    var stream = fs_1.default.readFileSync('attention_introduction.json');
    var shouldDeleteIndex = '';
    var parent = '';
    if (!id) {
        res.json(common_1.default.httpFail({
            data: null,
            msg: 'id不存在',
        }));
    }
    if (stream) {
        var list = JSON.parse(stream.toString());
        list.forEach(function (item, index1) {
            parent = index1;
            if (item.comments) {
                item.comments.splice(item.comments.findIndex(function (item) { return item.id === id; }), 1);
                item.comment_count--;
            }
        });
        fs_1.default.writeFileSync('attention_introduction.json', JSON.stringify(list));
        res.json(common_1.default.httpSuccess({
            data: true,
        }));
    }
});
exports.default = router;
