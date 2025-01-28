var http = require('http');
var url = require('url');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

var transfering = false;
var secondready = false;
var fileuploading = false;
var uuid1 = uuidv4();
var uuid2 = uuidv4();
var filename = "";
var filedata = "";
var uploading = false;

const adsFolder = path.join(__dirname, 'ads');

http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const q = parsedUrl.query;
    const requestPath = parsedUrl.pathname;

    if (requestPath === "/status") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
    } else if (requestPath === "/getad") {
        fs.readdir(adsFolder, (err, files) => {
            if (err) {
                console.error("Error reading ads folder:", err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write("Internal Server Error");
                res.end();
                return;
            }

            // Filter .mp4 files
            const mp4Files = files.filter(file => path.extname(file).toLowerCase() === '.mp4');
            if (mp4Files.length === 0) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("No ads available");
                res.end();
                return;
            }

            // Select a random .mp4 file
            const randomFile = mp4Files[Math.floor(Math.random() * mp4Files.length)];
            const filePath = path.join(adsFolder, randomFile);

            // Read and send the file
            fs.readFile(filePath, (readErr, data) => {
                if (readErr) {
                    console.error("Error reading file:", readErr);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.write("Error reading ad file");
                    res.end();
                    return;
                }

                res.writeHead(200, {
                    'Content-Type': 'video/mp4',
                    'Content-Disposition': `inline; filename="${randomFile}"`,
                });
                res.end(data);
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write("404 Not Found");
        console.warn("404 Not Found for: " + req.url);
        res.end();
    }
}).listen(6534);
console.log("Tails1154Ads Server");
console.log("Ready on port 6534");
