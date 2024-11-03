"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.status(200).json({ "home": "ts 1st try" });
});
app.listen(9090, function () {
    console.log("server is running on port 9090");
});
