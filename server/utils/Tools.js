import { LowSync, JSONFileSync } from 'lowdb'
import * as path from "path"



const __dirname = path.resolve();
const adapter = new JSONFileSync(__dirname + '/secret/db.json')
const db = new LowSync(adapter)

class DBWrapper {
    constructor() {
        db.read()
        if (!db.data) {
            const timet = {
                "class": {
                    "name": "5ahit",
                    "table":
                        [
                            { "begin": '8:50', "end": '9:35', "title": 'SEW', "teacher": 'HELT' },
                            { begin: '9:40', end: '10:30', title: 'Reli', teacher: 'BARE' },
                            { begin: '10:45', end: '11:35', title: 'ITP', teacher: 'GAMS' },
                            { begin: '11:40', end: '12:30', title: 'English', teacher: 'KENN' },
                            { begin: '12:35', end: '13:25', title: 'SYT', teacher: 'REFR' },
                        ],
                },


            }

            const time2 = {
                "class": {
                    "name": "5bhit",
                    "table":
                        [
                            { "begin": '8:50', "end": '9:35', "title": 'SEW', "teacher": 'HELT' },
                            { begin: '9:40', end: '10:30', title: 'Reli', teacher: 'BARE' },
                            { begin: '10:45', end: '11:35', title: 'ITP', teacher: 'GAMS' },
                            { begin: '11:40', end: '12:30', title: 'English', teacher: 'KENN' },
                            { begin: '12:35', end: '13:25', title: 'SYT', teacher: 'REFR' },
                        ],
                }
            }

            const auth = {
                "user": "maier@gmail.com",
                "password": "sonne",
            }
            const auth1 = {
                "user": "hilde@gmail.com",
                "password": "mond",
            }


            db.data = { timetables: [], passwd: [] }

            db.data.timetables.push(timet)
            db.data.timetables.push(time2)
            db.data.passwd.push(auth)
            db.data.passwd.push(auth1)
            db.write()
        }
    }

    getAllTimeTables() {
        //console.log("getAllTimeTables")
        return db.data.timetables
    }
    writeTimeTableObject(data) {
        console.log("writeTimeTable")


    }

    getOneTimeTableObject(idName) {
        console.log("getOneTimeTableObject: " + idName)
        let result = db.data.timetables.find(item => {
            return (item.class.name == idName)
        })
        if (result)
            return result.class.table
        else
            return []
    }

    getAvailableClasses() {
        let result = db.data.timetables.map(item => {
            return { "classname": item.class.name }
        })

        //console.log(JSON.stringify(result))
        return result
    }

}







export default new DBWrapper()