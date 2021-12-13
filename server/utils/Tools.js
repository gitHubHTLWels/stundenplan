import { LowSync, JSONFileSync } from 'lowdb'
import path from 'path'


const __dirname = path.resolve()
const DBFILE = __dirname + "/secret/jsonDB.json"
const db = new LowSync(new JSONFileSync(DBFILE))

constructor() {
    db.read()
    if (!db.data) {
        const user1 = {
            "name": "seppMaier@gmail.com",
            "password": "fcBayern",
            "class": "5ahit"
        }
        const user2 = {
            "name": "marco.reus@info.de",
            "password": "dortmund",
            "class": "5bhit"
        }
        const timeTable5ahit = {
            "class": "5ahit",
            "timetable": [
                { beginn: '7:50', ende: '8:40', titel: 'MAT', teacher: 'SPRI' },
                { beginn: '8:45', ende: '9:35', titel: 'ENG', teacher: "SCHN" },
                { beginn: '9:40', ende: '10:30', titel: 'ITP', teacher: "GAMS" },
                { beginn: '10:45', ende: '11:35', titel: 'Esot', teacher: "XYZM" },
            ]
        }
        const timeTable5bhit = {
            "class": "5bhit",
            "timetable": [
                { beginn: '7:50', ende: '8:40', titel: 'SEW', teacher: 'HELT' },
                { beginn: '8:45', ende: '9:35', titel: 'Rel', teacher: "POIH" },
                { beginn: '9:40', ende: '10:30', titel: 'ITP', teacher: "GAMS" },
                { beginn: '10:45', ende: '11:35', titel: 'Deutsch', teacher: "SPOD" },
            ]
        }


        db.data = { passwd: [], timetables: [] }
        db.data.passwd.push(user1)
        db.data.passwd.push(user2)
        db.data.timetables.push(timeTable5ahit)
        db.data.timetables.push(timeTable5bhit)
        db.write()
    }

    getAllTimeTables() {
        //console.log("getAllTimeTables")
        return db.data.timetables
    }
    writeTimeTableObject(data) {
        console.log("writeTimeTable")
    }

    checkPasswd(login_user, login_passwd) {
        let jsonRet = {
            userExist: true,
            allowed: true
            class: ''
        }

        //console.log("this.passwd: " + login_user + ", " + login_passwd)

        let result = db.data.passwd.find(item => {
            //console.log("item.name")
            return item.user == login_user
        })

        if (result) {
            jsonRet.class = result.class
            if (result.password != login_passwd)
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

    getAvailableClasses() {


        //console.log(JSON.stringify(result))
        // return result
    }

}







export default new DBWrapper()