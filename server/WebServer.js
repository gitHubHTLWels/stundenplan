
'use strict'
import * as http from "http"
import * as fs from 'fs'
import * as path from "path"
import * as url from "url"
import * as urtil from "util"
// cli.js
import { LowSync, JSONFileSync } from 'lowdb'

//import { LowSync, JSONFileSync } from 'lowdb'


const __dirname = path.resolve();

const PORT = 3000;
const PASSWDFILE = __dirname + '/secret/passwords.asc'
const HOSTNAME = '127.0.0.1';

var passwordsAvailable = [{}]

const adapter = new JSONFileSync(__dirname + '/secret/db.json')
const db = new LowSync(adapter)


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
            let result = this.passwordsAvailable.find(item => {
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
    else
        res.end(`Invalid Request: ${req.url} `);

}).listen(PORT, HOSTNAME, () => {

    db.read()
    if (!db.data) {
        const timet = {
            "timet":
                [
                    { "begin": '8:50', "end": '9:35', "title": 'SEW', "teacher": 'HELT' },
                    { begin: '9:40', end: '10:30', title: 'Reli', teacher: 'BARE' },
                    { begin: '10:45', end: '11:35', title: 'ITP', teacher: 'GAMS' },
                    { begin: '11:40', end: '12:30', title: 'English', teacher: 'KENN' },
                    { begin: '12:35', end: '13:25', title: 'SYT', teacher: 'REFR' },
                ],
        }
        db.data = { timetables: [], posts: [] }
        db.data.posts.push({ title: 'lowdb' })
        db.data.timetables.push(timet)
    }


    //db.data.posts.push({ title })

    db.write()

    //console.log("curr dir: " + __dirname)
    fs.readFile(PASSWDFILE, (err, data) => {
        if (err) {
            console.log('Cannot read password-file due to: ' + err)
        } else {
            passwordsAvailable = JSON.parse(data)
            //console.log("pass: " + passwordsAvailable)
            passwordsAvailable.map(item => console.log(item))

            //console.log(util.inspect(passwordsAvailable));

        }
    })
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
