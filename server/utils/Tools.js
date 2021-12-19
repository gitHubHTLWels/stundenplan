import { LowSync, JSONFileSync } from 'lowdb'
import path from 'path'


const __dirname = path.resolve()
const DBFILE = __dirname + "/secret/jsonDB.json"
const db = new LowSync(new JSONFileSync(DBFILE))


class DBWrapper {
    constructor() {
        db.read()
        if (!db.data) {
            const user1 = {
                "name": "seppMaier@gmail.com",
                "password": "fcBayern",
                "class": "5ahit",
                "isAdmin": false
            }
            const user2 = {
                "name": "marco.reus@info.de",
                "password": "dortmund",
                "class": "5bhit",
                "isAdmin": true
            }
            const timeTable5ahit = {
                "class": "5ahit",
                "timetable": [
                    { begin: '7:50', end: '8:40', title: 'MAT', teacher: 'SPRI' },
                    { begin: '8:45', end: '9:35', title: 'ENG', teacher: "SCHN" },
                    { begin: '9:40', end: '10:30', title: 'ITP', teacher: "GAMS" },
                    { begin: '10:45', end: '11:35', title: 'Esot', teacher: "XYZM" },
                ]
            }
            const timeTable5bhit = {
                "class": "5bhit",
                "timetable": [
                    { begin: '7:50', end: '8:40', title: 'SEW', teacher: 'HELT' },
                    { begin: '8:45', end: '9:35', title: 'Rel', teacher: "POIH" },
                    { begin: '9:40', end: '10:30', title: 'ITP', teacher: "GAMS" },
                    { begin: '10:45', end: '11:35', title: 'Deutsch', teacher: "SPOD" },
                ]
            }


            db.data = { passwd: [], timetables: [] }
            db.data.passwd.push(user1)
            db.data.passwd.push(user2)
            db.data.timetables.push(timeTable5ahit)
            db.data.timetables.push(timeTable5bhit)
            db.write()
        }
    }


    writeTimeTableObject(data) {
        console.log("writeTimeTable" + data)
    }

    timeTable_remove(className) {
        let inde = db.data.timetables.findIndex(item => {
            //console.log("item.name " + item.name)
            return item.class == className
        })
        //console.log("Found index: " + inde)
        if (inde > -1) {
            db.data.timetables.splice(inde, 1)
            db.write()
            return {
                done: true
            }
        }


        return {
            done: false
        }

    }


    timeTable_update(timetable) {
        //console.log("timeTAble update for " + timetable.className)
        let result = db.data.timetables.find(item => {
            //console.log("item.name " + item.name)
            return item.class == timetable.className
        })

        //console.log("timeTable_update...." + result)
        if (result) {
            result.timetable = timetable.timetable
            db.write()
            return {
                done: true
            }
        } else {
            return {
                done: false
            }
        }

    }


    checkPasswd(loginUser, loginPasswd) {
        let jsonRet = {
            userExist: true,
            allowed: true,
            class: '',
            isAdmin: false
        }

        console.log("this.passwd: " + loginUser + ", " + loginPasswd)

        let result = db.data.passwd.find(item => {
            console.log("item.name " + item.name)
            return item.name == loginUser
        })

        console.log("DB:: User found" + result)
        if (result) {
            jsonRet.class = result.class
            jsonRet.isAdmin = result.isAdmin
            if (result.password != loginPasswd)
                jsonRet.allowed = false
        } else {
            jsonRet.userExist = false
            jsonRet.allowed = false
        }
        return jsonRet
    }



    getTimetable(className) {
        let result = db.data.timetables.find(item => {
            return (item.class == className.toLowerCase())
        })
        let jsonRet = {
            tableExist: false,
            timeTable: []
        }
        if (result) {
            jsonRet.timeTable = result.timetable
            jsonRet.tableExist = true
        }
        return jsonRet
    }

}






export default new DBWrapper()