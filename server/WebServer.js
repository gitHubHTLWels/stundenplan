

import * as http from "http"
import * as url from "url"
import * as util from "util"

import Storage from "./utils/Tools.js"
// cli.js





const PORT = 3000;
const HOSTNAME = '127.0.0.1';


http.createServer((req, res) => {   //create web server

    // CORS -- allow communication 
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    let parsedUrl = req.url

    if (req.method == "GET") {
        let index = parsedUrl.indexOf("?")
        if (index > 0)
            parsedUrl = req.url.substring(0, index)
    }
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (parsedUrl == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>First Page</p></body></html>');
        res.end();

    }
    else if (parsedUrl == "/admin") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>ADMIN-Page.</p></body></html>');
        res.end();

    } // Pattern: http://HOST/passwd@email=NN&password=123 
    else if (parsedUrl == "/passwd" && req.method == "GET") {
        /* 
           Structure of return object 
            userExist: true,
            allowed: true
            class: ''
        
        */

        let queryObject = url.parse(req.url, true).query;
        console.log("User: " + queryObject.email)
        let jsonRet = Storage.checkPasswd(queryObject.email, queryObject.password)
        //console.log(`User: ${queryObject.email} is known? ${jsonRet.userExist} and allowed? ${jsonRet.allowed}`)
        res.end(JSON.stringify(jsonRet));
    }

    else if (parsedUrl == "/passwd" && req.method == "POST") {
        /* Structure of body-object:
            email: '',
           password: '',
    
          Structure of return object 
            userExist: true,
            allowed: true
            class: ''
    
        */
        let postData = ''

        req.on('data', chunk => {
            postData += chunk;
        });
        req.on('end', () => {
            let postDataObject = JSON.parse(postData);
            let jsonRet = Storage.checkPasswd(postDataObject.email, ostDataObject.password)
            //console.log(`User: ${postDataObject.email} is known? ${jsonRet.userExist} and allowed? ${jsonRet.allowed}`)
            res.end(JSON.stringify(jsonRet))

        })


    }
    // Pattern: GET http://HOST/getTimeTable?timetable=nnn
    else if (parsedUrl == "/timetable" && req.method == "GET") {
        let queryObject = url.parse(req.url, true).query;
        let d = Storage.getTimetable(queryObject.class)
        res.end(JSON.stringify(d))
    }
    else if (parsedUrl == "/timetable" && req.method == "DELETE") {
        /* 
           Structure of return object 
            done: true|false
           
            Structure of body  
            className 
        
        */
        let postData = ''

        req.on('data', chunk => {
            postData += chunk;
        });
        req.on('end', () => {
            let postDataObject = JSON.parse(postData);
            let jsonRet = Storage.timeTable_remove(postDataObject.className)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(jsonRet))

        })

    }
    else if (parsedUrl == "/timetable" && req.method == "PUT") {
        /* 
           Structure of return object 
            done: true|false
        
        Structure of body
            className
             timetable

        */


        let postData = ''

        req.on('data', chunk => {
            postData += chunk;
        });
        req.on('end', () => {
            let postDataObject = JSON.parse(postData);
            let jsonRet = Storage.timeTable_update(postDataObject)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(jsonRet))

        })

    }


    else {
        console.log(`Request ${req.url} is unknown - no route is available.`)
        res.writeHead(501, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Request cannot be processed.</p></body></html>');
        res.end();

    }


}).listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
