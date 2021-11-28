
'use strict'
const http = require('http'); // Import Node.js core module
const fs = require('fs')

const HOSTNAME = '127.0.0.1';
const PORT = 3000;
const PASSWDFILE = './secret/passwords.asc'
const url = require('url');

let passwordsAvailable = [{}]


http.createServer((req, res) => {   //create web server
    const queryObject = url.parse(req.url, true).query;
		  res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Request-Method', '*');
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.url == '/') { //check the URL of the current request

        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // set response content    
        res.write('<html><body><p>HOME-PAGE</p></body></html>');
        res.end();

    }
    else if (req.url == "/admin") {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>ADMIN-Page.</p></body></html>');
        res.end();

    } else if (req.url = "passwd") {

        console.log("passwd: " + req.query + ", queryObj: " + JSON.stringify(queryObject));
       res.writeHead(200, {"Content-Type": "application/json"}); 
				let jsonRet = {
						  allowed:true
				}
				res.end(JSON.stringify(jsonRet));

    }
    else
        res.end('Invalid Request!');

}).listen(PORT, HOSTNAME, () => {
    const HOSTNAME = '127.0.0.1';
    fs.readFile(PASSWDFILE, (err, data) => {
        if (err) {
            console.log('Cannot read password-file due to: ' + err)
        } else {
            passwordsAvailable = data
            console.log("pass: " + passwordsAvailable)

        }
    })
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
