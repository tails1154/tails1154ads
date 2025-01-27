var http = require('http');
var url = require('url');
const { v4: uuidv4 } = require('uuid');

var transfering = false;
var secondready = false;
var fileuploading = false;
var uuid1 = uuidv4();
var uuid2 = uuidv4();
var filename = "";
var filedata = "";
var uploading = false;


http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const q = parsedUrl.query;
    const path = parsedUrl.pathname;
    if (path === "/status")
    {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
    }
    else
    {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write("404 Not Found");
        console.warn("404 Not Found for: " + req.url);
        res.end();
    }
}).listen(6534);
console.log("Ready on port 6534");
