<template>
  <Header
    title="Stundentafel"
    :name="timeTableInfo.name"
    :currentClass="timeTableInfo.currentClass"
    :units="timeTableInfo.timeTable.length"
    :errorMessage="errorMess"
  ></Header>
  <Stundenplan
    v-if="loginstate == true"
    :timeTableParams="timeTableInfo"
    @addLesson="addLesson"
    @remLesson="removeLesson"
    @moveLessonDown="moveLessonDown"
    @moveLessonUp="moveLessonUp"
    @updateTimetable="updateTimetable"
    @deleteTimetable="deleteTimetable"
  />
  <Login
    v-else
    @loginDone="loginDone"
    serverURL="http://localhost:3000/passwd"
  />
</template>

<script>
import Stundenplan from './components/Stundenplan.vue';
import Header from './components/Header.vue';
import Login from './components/Login.vue';
import { ref, onMounted } from 'vue';

//const util = require('util');

const URI_PATH = 'http://localhost:3000/';

export default {
  name: 'ParentComponent',
  components: {
    Stundenplan,
    Header,
    Login,
  },
  setup() {
    let errorMess = ref('');
    let loginstate = ref(false);

    let timeTableInfo = ref({
      name: '',
      currentClass: '',
      currentDate: new Date().toLocaleDateString(),
      isAdmin: false,
      timeTable: [
        /*  { begin: '8:50', end: '9:35', title: 'SEW', teacher: 'HELT' },
        { begin: '9:40', end: '10:30', title: 'Reli', teacher: 'BARE' },
        { begin: '10:45', end: '11:35', title: 'ITP', teacher: 'GAMS' },
        { begin: '11:40', end: '12:30', title: 'English', teacher: 'KENN' },
        { begin: '12:35', end: '13:25', title: 'SYT', teacher: 'REFR' }, */
      ],
    });

    onMounted(() => {
      console.log('mounted .....');
    });

    function getTimetable(user, className, isAdmin) {
      let url = `${URI_PATH}timetable?class=${className}`;
      errorMess.value = '';
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          //console.log('Received: ' + JSON.stringify(data) + data.tableExist);
          if (data.tableExist) {
            timeTableInfo.value.timeTable = data.timeTable;
            timeTableInfo.value.currentClass = className;
            timeTableInfo.value.name = user;
            timeTableInfo.value.isAdmin = isAdmin;
          } else console.log('Data Table does not exist.');
        })
        .catch((e) => {
          errorMess.value = 'Error in server communication';
          console.log(' Error occuication with Server' + e);
        });
    }

    function loginDone(user, className, isAdmin) {
      timeTableInfo.value.name = user;
      //console.log('isADMIN: ' + isAdmin);
      //console.log(util.inspect(authorizeObject));
      getTimetable(user, className, isAdmin);
      loginstate.value = true;
    }

    function updateTimetable(timeTableStruct) {
      console.log('updateTime ' + timeTableStruct.currentClas + ', ');
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className: timeTableStruct.currentClass,
          timetable: timeTableStruct.timeTable,
        }),
      };
      let url = `${URI_PATH}timetable`;
      errorMess.value = '';
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //console.log('Received: ' + JSON.stringify(data) + data.tableExist);
          if (data.done) {
            errorMess.value = 'Timetable has been updated successfully.';
          } else {
            console.log('Data Table does not exist.');
            errorMess.value =
              'Timetable for class: ' +
              timeTableStruct.currentClass +
              ' does not exist.';
          }
        })
        .catch((e) => {
          errorMess.value = 'Error in server communication';
          console.log(' Error occuication with Server' + e);
        });
    }

    function deleteTimetable(className) {
      console.log('deleteTimetable ' + className);
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className: className,
        }),
      };
      let url = `${URI_PATH}timetable`;
      errorMess.value = '';
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //console.log('Received: ' + JSON.stringify(data) + data.tableExist);
          if (data.done) {
            timeTableInfo.value.timeTable = [];
            timeTableInfo.value.currentClass = '';
            errorMess.value = 'Timetable has been deleted successfully.';
          } else {
            console.log('Data Table does not exist.');
            errorMess.value =
              'Timetable for class: ' + className + ' does not exist.';
          }
        })
        .catch((e) => {
          errorMess.value = 'Error in server communication';
          console.log(' Error occuication with Server' + e);
        });
      timeTableInfo.value.timeTable = [];
      timeTableInfo.value.currentClass = '';
    }

    /*                     ERROR HANDLING          BEGIN         */

    // pattern: 13:20 || 7:13 ... hh.mm;
    /*
      field: text-field to check 
      eMessage: ErrorMessage if found input value does not correspond with time format hh::mm
      eMessageTimeDomain: found time is out of range (<7,>17, > 60)

    */
    function isTime(field, eMessage, eMessageTimeDomain) {
      let time = field.split(':');
      let number = parseInt(time[0], 10); // hours
      if (isNaN(number)) {
        errorMess.value = eMessage;
        return false;
      }
      if (number < 7 || number > 17) {
        errorMess.value = eMessageTimeDomain.replace('%d', number);
        return false;
      }
      number = parseInt(time[1], 10); // hours
      if (isNaN(number, 10)) {
        errorMess.value = eMessage;
        return false;
      }
      if (number < 0 || number > 60) {
        errorMess.value = eMessageTimeDomain.replace('%d', number);
        return false;
      }
      return true;
    }

    function isFieldEmpty(field, eMessage) {
      if (field == '') {
        errorMess.value = eMessage;
        return false;
      }
      return true;
    }

    function unitCheckForEmptyEntries(entry) {
      let validTimeErrMessage =
        'Die gewählte Zeit "%d" liegt ausserhalb des Gültigkeitsbereichs (7:00..17:59)';
      if (
        !isFieldEmpty(entry.begin, "Die 'Beginn-Zeit' muss festgelegt werden. ")
      )
        return false;
      if (
        !isTime(
          entry.begin,
          `Die Beginn-Zeit <${entry.begin}>  hat ein falsches Format (hh::mm)`,
          validTimeErrMessage
        )
      )
        return false;

      if (!isFieldEmpty(entry.end, "Die 'Ende-Zeit' muss festgelegt werden. "))
        return false;
      if (
        !isTime(
          entry.end,
          `Die Ende-Zeit <${entry.end}>  hat ein falsches Format (hh::mm)`,
          validTimeErrMessage
        )
      )
        return false;

      if (!isFieldEmpty(entry.title, "Das 'Fach' muss festgelegt werden. "))
        return false;
      return true;
    }

    /*                     ERROR HANDLING          END (addLesson)         */

    function addLesson(unit) {
      errorMess.value = '';
      if (!unitCheckForEmptyEntries(unit)) return;

      let overlapping = timeTableInfo.value.timeTable.filter((entry) => {
        let retV = entry.begin === unit.begin;
        return retV;
      });
      if (overlapping.length) {
        errorMess.value = 'Beginn-Zeit darf sich nicht überlappen';
        return;
      }
      //console.log('entry: ' + res);
      let clonedObj = { ...unit };
      unit.begin = '';
      unit.end = '';
      unit.title = '';
      timeTableInfo.value.timeTable.push(clonedObj);
      errorMess.value = '';
    }

    function removeLesson(index) {
      timeTableInfo.value.timeTable.splice(index, 1);
      // console.log(index + 'length: ' + timeTableInfo.value.timeTable.length);
    }
    function moveLessonDown(index) {
      //console.log('move lessons down ...');
      let len = timeTableInfo.value.timeTable.length;

      if (len <= 1 || index == len - 1) return;

      //console.log('len: ' + len + '' + index);
      let xChange = timeTableInfo.value.timeTable[index + 1];
      timeTableInfo.value.timeTable[index + 1] =
        timeTableInfo.value.timeTable[index];
      timeTableInfo.value.timeTable[index] = xChange;
    }

    function moveLessonUp(index) {
      let len = timeTableInfo.value.timeTable.length;

      if (len <= 1 || index == 0) return;
      let xChange = timeTableInfo.value.timeTable[index - 1];
      timeTableInfo.value.timeTable[index - 1] =
        timeTableInfo.value.timeTable[index];
      timeTableInfo.value.timeTable[index] = xChange;
    }

    return {
      timeTableInfo,
      errorMess,
      addLesson,
      removeLesson,
      moveLessonDown,
      moveLessonUp,
      loginDone,
      loginstate,
      updateTimetable,
      deleteTimetable,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
