var http = require("http");
var createError = require('http-errors');
var express = require('express');
var exp = require("../controllers/API");
var settings = require("../config.js");
var httpMsgs = require("./httpMsgs");
http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/flows") {
                exp.getFlows(req, res)
            }

            break;
        case "POST":
            if (req.url === "/register") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;

                    if (req.Body > 1e7) {
                        httpMsgs.show413(req, res);
                    }

                });
                req.on("end", function () {
                    exp.Registers(req, res, reqBody);
                });
            }
            else if (req.url === "/login") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;

                    if (req.Body > 1e7) {
                        httpMsgs.show413(req, res);
                    }
                });
                req.on("end", function () {
                    exp.Login(req, res, reqBody);
                });
            }

            break;
        case "PUT":
            break;
        case "DELETE":
            break;
        default:
            httpMsgs.show405(req, res, err);
            break;
    }
}).listen(settings.webPort, function () {
    console.log("started listening at: 9000");
});