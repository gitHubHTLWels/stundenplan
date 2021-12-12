

import * as http from "http"
import * as fs from 'fs'
import * as path from "path"
import * as url from "url"
import * as urtil from "util"

import Storage from "./utils/Tools.js"
// cli.js



const __dirname = path.resolve();

const PORT = 3000;
const PASSWDFILE = __dirname + '/secret/passwords.asc'
const HOSTNAME = '127.0.0.1';

var passwordsAvailable = [{}]

function fillePasswordsAvailable(item) {
    passwordsAvailable = item

}
const bindedFunction = fillePasswordsAvailable.bind(this)


http.createServer((req, res) => {   //create web server

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');

    let parsedUrl = req.url

    if (req.method == "GET") {
        let index = parsedUrl.indexOf("?")
        if (index > 0)
            parsedUrl = req.url.substring(0, index)
    }


    if (parsedUrl == '/') { //check the URL of the current reques let queryObject = JSON.stringify(url.parse(req.url, true).query)t

        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>HOME-PAGE</p></body></html>');
        res.end();

    }
    else if (parsedUrl == "/admin") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>ADMIN-Page.</p></body></html>');
        res.end();

    } else if (parsedUrl == "/passwd" && req.method == "GET") {
        /* Structure of queryObject:
            email: '',
           password: '',
        */

        let queryObject = url.parse(req.url, true).query;
        let jsonRet = {
            userExist: true,
            allowed: true
        }

        //console.logs("this.passwd: " + this.passwordsAvailable + ", " + passwordsAvailable)

        let result = this.passwordsAvailable.find(item => {
            return item.name == queryObject.email
        })

        if (result) {
            if (result.password != queryObject.password)
                jsonRet.allowed = false
        } else {
            jsonRet.userExist = false
            jsonRet.allowed = false
        }
        console.log(`User: ${queryObject.email} is known? ${jsonRet.userExist} and allowed? ${jsonRet.allowed}`)
        res.end(JSON.stringify(jsonRet));
    }
    else if (parsedUrl == "/passwd" && req.method == "POST") {
        /* Structure of queryObject:
            email: '',
           password: '',
        */

        let jsonRet = {
            userExist: true,
            allowed: true
        }
        let postData = ''

        req.on('data', chunk => {
            postData += chunk;
        });
        req.on('end', () => {
            console.log("Client post data : " + postData);
            let postDataObject = JSON.parse(postData);
            let result = base.passwordsAvailable.find(item => {
                return item.name == postDataObject.email
            })

            if (result) {
                if (result.password != postDataObject.password)
                    jsonRet.allowed = false
            } else {
                jsonRet.userExist = false
                jsonRet.allowed = false
            }
            console.log(`User: ${postDataObject.email} is known? ${jsonRet.userExist} and allowed? ${jsonRet.allowed}`)
            res.end(JSON.stringify(jsonRet))

        })


    }
    else if (parsedUrl == "/getAllTimeTables") {

        let d = Storage.getAllTimeTables()
        res.end(JSON.stringify(d))
    } else if (parsedUrl == "/getAvailableClasses") {
        res.end(JSON.stringify(Storage.getAvailableClasses()))
    }
    // GET http://localhost/getTimeTable?timetable=nnn
    else if (parsedUrl == "/getTimeTable") {
        let queryObject = url.parse(req.url, true).query;
        console.log("Query object: " + JSON.stringify(queryObject))

        let d = Storage.getOneTimeTableObject(queryObject.timetable)
        console.log("result " + d)
        res.end(JSON.stringify(d))
    }

    else
        res.end(`Invalid Request: ${req.url} `);

}).listen(PORT, HOSTNAME, () => {

    fs.readFile(PASSWDFILE, function (err, data) {
        if (err) {
            console.log('Cannot read password-file due to: ' + err)
        } else {
            passwordsAvailable = JSON.parse(data)
            //console.log("pass: " + passwordsAvailable)
            passwordsAvailable.map(item => console.log(item))
            //bindedFunction(passwordsAvailable)

            //console.log(util.inspect(passwordsAvailable));

        }
    })

    // console.log("PASSwords .." + JSON.stringify(this.passwordsAvailable))
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
