"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var common_1 = __importDefault(require("../utils/common"));
var router = express_1.default.Router();
router.post('/createUser', function (req, res, next) {
    var _a = req.body, psw = _a.psw, phone = _a.phone, code = _a.code, userInfo = _a.userInfo;
    if (code && code.length != 32 && (!psw || !phone)) {
        console.log(123);
        return res.json(common_1.default.httpFail({ data: null }));
    }
    if (psw === 'admin' && phone === 'admin') {
        var userList = JSON.parse(fs_1.default.readFileSync('user.json').toString());
        userList.forEach(function (item) {
            if (item.psw === psw && phone === item.psw) {
                res.json(common_1.default.httpSuccess({
                    data: { token: item.id, userInfo: item.userInfo.userInfo },
                }));
            }
        });
        return;
    }
    fs_1.default.readFile('user.json', function (err, data) {
        if (err) {
            console.log('user.json读取失败');
        }
        if (data) {
            var id_1 = '';
            var userList = JSON.parse(data.toString());
            var flag = false;
            for (var index = 0; index < userList.length; index++) {
                var element = userList[index];
                if (element.code == code) {
                    flag = true;
                    id_1 = element.code;
                }
            }
            if (!flag) {
                id_1 = common_1.default.createUUID();
                var obj = { psw: psw, phone: phone, code: code, id: id_1, userInfo: userInfo };
                userList.push(obj);
            }
            fs_1.default.writeFile('user.json', JSON.stringify(userList), function () {
                res.json(common_1.default.httpSuccess({
                    data: { token: id_1, userInfo: userInfo.userInfo },
                }));
            });
        }
    });
});
exports.default = router;
