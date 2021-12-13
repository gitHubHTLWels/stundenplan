

import * as http from "http"
import * as url from "url"
import * as util from "util"

import Storage from "./utils/Tools.js"
// cli.js





const PORT = 3000;
const HOSTNAME = '127.0.0.1';


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

           Structure of return object 
            userExist: true,
            allowed: true
            class: ''
        
        */

        let queryObject = url.parse(req.url, true).query;
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
            //console.log("Client post data : " + postData);
            let postDataObject = JSON.parse(postData);
            let jsonRet = Storage.checkPasswd(postDataObject.email, ostDataObject.password)
            //console.log(`User: ${postDataObject.email} is known? ${jsonRet.userExist} and allowed? ${jsonRet.allowed}`)
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

    // fs.readFile(PASSWDFILE, function (err, data) {
    //     if (err) {
    //         console.log('Cannot read password-file due to: ' + err)
    //     } else {
    //         passwordsAvailable = JSON.parse(data)
    //         //console.log("pass: " + passwordsAvailable)
    //         passwordsAvailable.map(item => console.log(item))
    //         //console.log(util.inspect(passwordsAvailable));

    //     }
    // })

    // console.log("PASSwords .." + JSON.stringify(this.passwordsAvailable))
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
