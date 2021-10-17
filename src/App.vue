<template>
  <Header title="Stundentafel" :name="stundenPlanPar.name"></Header>
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
    let stundenPlanPar = ref({
      name: 'Sepp Reischl',
      klasse: '5 AHIT',
      datum: new Date().toLocaleDateString(),
      stunden:
        'EH 1: SEW, EH 2: REL, EH 3: ITP, EH 4: Englisch, EH 5: Pause, EH 6: SYT',
      timeTable: [
        { begin: '8:50', end: '9:35', title: 'SEW', lehrer: 'HELT' },
        { begin: '9:40', end: '10:30', title: 'Reli', lehrer: 'BARE' },
        { begin: '10:45', end: '11:35', title: 'ITP', lehrer: 'GAMS' },
        { begin: '11:40', end: '12:30', title: 'English', lehrer: 'KENN' },
        { begin: '12:35', end: '13:25', title: 'SYT', lehrer: 'REFR' },
      ],
    });
    function addLesson(unit) {
      console.log(' unit recieved:', unit.fach);
      stundenPlanPar.value.timeTable.push({
        begin: unit.beginn,
        end: unit.ende,
        title: unit.fach,
      });
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
