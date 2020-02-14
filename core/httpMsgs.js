var settings = require("../config");
exports.show500 = function (req, res, err) {
    if (settings.httpMsgsFormat === "HTML") {
        res.writeHead(500, "Error ouccured", { "Content-Type": "text/html" });
        res.write("<html><head><title>500</title></head><body>Eror</body></html>");
    }
    else {
        res.writeHead(500, "Error ouccured", { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Error Occured: " + err }));
    }
}
exports.sendJson = function (req, res, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    if (data) 
    {
        res.write("" + JSON.stringify(data));
    }
};
exports.show405 = function (req, res, err) {
    if (settings.httpMsgsFormat === "HTML") {
        res.writeHead(405, "Error ouccured", { "Content-Type": "text/html" });
        res.write("<html><head><title>405</title></head><body>Method not supported</body></html>");
    }
    else {
        res.writeHead(500, "Error ouccured", { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Error Occured: Method not available " + err }));
    }
}

exports.show404 = function (req, res, err) {
    if (settings.httpMsgsFormat === "HTML") {
        res.writeHead(404, "Error ouccured", { "Content-Type": "text/html" });
        res.write("<html><head><title>405</title></head><body>Resource not found</body></html>");
    }
    else {
        res.writeHead(500, "Error ouccured", { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Resource not found " + err }));
    }
}

exports.show413 = function (req, res, err) {
    if (settings.httpMsgsFormat === "HTML") {
        res.writeHead(413, "Error ouccured", { "Content-Type": "text/html" });
        res.write("<html><head><title>405</title></head><body>Request entity too large</body></html>");
    }
    else {
        res.writeHead(500, "Error ouccured", { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Request entity too large " + err }));
    }
}
exports.send200 = function (req, res) {

    res.writeHead(200, "Working", { "Content-Type": "application/json" });


}