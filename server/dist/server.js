"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.use("/", function (req, res) {
    res.send("hello");
});
app.listen(4000, function () {
    console.log("server is runniung on port 4000");
});
//# sourceMappingURL=server.js.map