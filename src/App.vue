<template>
  <Header
    title="Stundentafel"
    :name="stundenPlanPar.name"
    :units="stundenPlanPar.timeTable.length"
    :errorMessage="errorMess"
  ></Header>
  <Stundenplan
    v-if="loginStatus == true"
    :timeTableParams="stundenPlanPar"
    @addLesson="addLesson"
    @remLesson="removeLesson"
    @moveLessonDown="moveLessonDown"
    @moveLessonUp="moveLessonUp"
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
import { ref } from 'vue';
const util = require('util');

export default {
  name: 'ParentComponent',
  components: {
    Stundenplan,
    Header,
    Login,
  },
  setup() {
    let errorMess = ref('');
    let loginStatus = ref(false);
    let stundenPlanPar = ref({
      name: '',
      klasse: '5 AHIT',
      datum: new Date().toLocaleDateString(),
      stunden:
        'EH 1: SEW, EH 2: REL, EH 3: ITP, EH 4: Englisch, EH 5: Pause, EH 6: SYT',
      timeTable: [
        { begin: '8:50', end: '9:35', title: 'SEW', teacher: 'HELT' },
        { begin: '9:40', end: '10:30', title: 'Reli', teacher: 'BARE' },
        { begin: '10:45', end: '11:35', title: 'ITP', teacher: 'GAMS' },
        { begin: '11:40', end: '12:30', title: 'English', teacher: 'KENN' },
        { begin: '12:35', end: '13:25', title: 'SYT', teacher: 'REFR' },
      ],
    });

    function loginDone(authorizeObject) {
      stundenPlanPar.value.name = authorizeObject.email;

      console.log(util.inspect(authorizeObject));

      console.log('Authorized obj: ' + authorizeObject.password);
      loginStatus.value = true;

      /*
    REturn json object:
       userExist:true,
			 allowed:true

*/
      //const headers = { 'Content-Type': 'application/json' };

      console.log('loginDone ---' + loginStatus.value);
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

      let overlapping = stundenPlanPar.value.timeTable.filter((entry) => {
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
      stundenPlanPar.value.timeTable.push(clonedObj);
      errorMess.value = '';
    }

    function removeLesson(index) {
      stundenPlanPar.value.timeTable.splice(index, 1);
      // console.log(index + 'length: ' + stundenPlanPar.value.timeTable.length);
    }
    function moveLessonDown(index) {
      //console.log('move lessons down ...');
      let len = stundenPlanPar.value.timeTable.length;

      if (len <= 1 || index == len - 1) return;

      //console.log('len: ' + len + '' + index);
      let xChange = stundenPlanPar.value.timeTable[index + 1];
      stundenPlanPar.value.timeTable[index + 1] =
        stundenPlanPar.value.timeTable[index];
      stundenPlanPar.value.timeTable[index] = xChange;
    }

    function moveLessonUp(index) {
      let len = stundenPlanPar.value.timeTable.length;

      if (len <= 1 || index == 0) return;
      let xChange = stundenPlanPar.value.timeTable[index - 1];
      stundenPlanPar.value.timeTable[index - 1] =
        stundenPlanPar.value.timeTable[index];
      stundenPlanPar.value.timeTable[index] = xChange;
    }

    return {
      stundenPlanPar,
      errorMess,
      addLesson,
      removeLesson,
      moveLessonDown,
      moveLessonUp,
      loginDone,
      loginStatus,
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
