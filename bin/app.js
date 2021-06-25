"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var login_1 = __importDefault(require("./router/login"));
var attentions_1 = __importDefault(require("./router/attentions"));
var user_1 = __importDefault(require("./router/user"));
var comments_1 = __importDefault(require("./router/comments"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/login', login_1.default);
app.use('/attentions', attentions_1.default);
app.use('/user', user_1.default);
app.use('/comments', comments_1.default);
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.listen(3099, function () { });
