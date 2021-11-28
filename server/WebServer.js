
'use strict'
const http = require('http'); // Import Node.js core module
const fs = require('fs')

const HOSTNAME = '127.0.0.1';
const PORT = 3000;
const PASSWDFILE = './secret/passwords.asc'
const url = require('url');
const util = require('util');

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
        /* Structure of queryObject:
            email: '',
           password: '',
        */
        let requestData = JSON.stringify(queryObject)
        let jsonRet = {
            userExist: true,
            allowed: true
        }
        /*         if (queryObject.email != "mainName@gmail.com")
                    jsonRet.userExist = false;
                if (queryObject.password != 'dortmund')
                    jsonRet.allowed = false
         */

        let result = this.passwordsAvailable.find(item => {
            console.log('item:' + item.name)
            return item.name == queryObject.email
        })
        //console.log("Result " + result)
        if (result) {
            if (result.password != queryObject.password)
                jsonRet.allowed = false
        } else {
            jsonRet.userExist = false
            jsonRet.allowed = false
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
            this.passwordsAvailable = JSON.parse(data)
            //console.log("pass: " + passwordsAvailable)
            this.passwordsAvailable.map(item => console.log(item))

            //console.log(util.inspect(passwordsAvailable));

        }
    })
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
