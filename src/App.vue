<template>
  <Header
    title="Stundentafel"
    :name="stundenPlanPar.name"
    :units="stundenPlanPar.timeTable.length"
    :errorMessage="errorMess"
  ></Header>
  <Stundenplan
    :timeTableParams="stundenPlanPar"
    @addLesson="addLesson"
    @remLesson="removeLesson"
    @moveLessonDown="moveLessonDown"
    @moveLessonUp="moveLessonUp"
  />
</template>

<script>
import Stundenplan from './components/Stundenplan.vue';
import Header from './components/Header.vue';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    Stundenplan,
    Header,
  },
  setup() {
    let errorMess = ref('');
    let stundenPlanPar = ref({
      name: 'Sepp Reischl',
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

    function isTime(field, eMessage) {
      let time = field.split(':');

      console.log('isTime:: ' + time[0] + ', ' + time[1]);
      console.log(Number.isInteger(time[0]));

      if (isNaN(parseInt(time[0], 10))) {
        errorMess.value = eMessage;
        return false;
      }
      if (isNaN(parseInt(time[1], 10))) {
        errorMess.value = eMessage;
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
      if (
        !isFieldEmpty(entry.begin, "Die 'Beginn-Zeit' muss festgelegt werden. ")
      )
        return false;
      if (
        !isTime(
          entry.begin,
          'Die Beginn-Zeit <' +
            entry.begin +
            '>  hat ein falsches Format (hh::mm)'
        )
      )
        return false;

      if (!isFieldEmpty(entry.end, "Die 'Ende-Zeit' muss festgelegt werden. "))
        return false;
      if (
        !isTime(
          entry.end,
          'Die Ende-Zeit <' + entry.end + '>  hat ein falsches Format (hh::mm)'
        )
      )
        return false;

      if (!isFieldEmpty(entry.title, "Das 'Fach' muss festgelegt werden. "))
        return false;
      return true;
    }

    function addLesson(unit) {
      errorMess.value = '';
      if (!unitCheckForEmptyEntries(unit)) return;

      let res = stundenPlanPar.value.timeTable.filter((entry) => {
        let retV = unit.begin === '' || entry.begin === unit.begin;
        return retV;
      });
      if (res.length) {
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
      console.log(index + 'length: ' + stundenPlanPar.value.timeTable.length);
    }
    function moveLessonDown(index) {
      console.log('move lessons down ...');
      let len = stundenPlanPar.value.timeTable.length;

      if (len <= 1 || index == len - 1) return;

      console.log('len: ' + len + '' + index);
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
    };
  },
  /*   data() {
    return {
      stundenPlanPar: {
        name: 'Sepp Reischl',
        klasse: '5 AHIT',
        datum: new Date().toLocaleDateString(),
        stunden:
          'EH 1: SEW, EH 2: REL, EH 3: ITP, EH 4: Englisch, EH 5: Pause, EH 6: SYT',
        timeTable: [
          { begin: '8:50', end: '9:35', title: 'SEW' },
          { begin: '9:40', end: '10:30', title: 'Reli' },
          { begin: '10:45', end: '11:35', title: 'ITP' },
          { begin: '11:40', end: '12:30', title: 'English' },
          { begin: '12:35', end: '13:25', title: 'SYT' },
        ],
      },
    };
  }, */
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
