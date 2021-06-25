"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __importDefault(require("../utils/common"));
var fs = require('fs');
fs.readFile('way.json', function (err, data) {
    if (data) {
        var list = JSON.parse(data.toString());
        list.forEach(function (item) {
            item.id = common_1.default.createUUID();
            if (item.main) {
                item.main.forEach(function (item1) {
                    item1.id = common_1.default.createUUID();
                });
            }
        });
        fs.writeFile('way.json', JSON.stringify(list), function () { });
    }
});
