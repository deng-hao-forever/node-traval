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
    var token = req.get('token') || '';
    if (!token) {
        return res.json(common_1.default.httpFail({
            data: false,
            msg: 'token 无效',
        }));
    }
    var stream = fs_1.default.readFileSync('user.json');
    if (stream) {
        var list = JSON.parse(stream.toString());
        var arr = list.filter(function (item) { return item.id === token; });
        if (arr.length) {
            res.json(common_1.default.httpSuccess({
                data: arr[0],
            }));
        }
        else {
            res.json(common_1.default.httpFail({
                data: false,
                msg: '用户无效',
            }));
        }
    }
});
exports.default = router;
