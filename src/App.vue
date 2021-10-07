<template>
  <Header title="Stundentafel" :name="stundenPlanPar.name"></Header>
  <Stundenplan :timeTableParams="stundenPlanPar" />
</template>

<script>
import Stundenplan from './components/Stundenplan.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Stundenplan,
    Header,
  },
  data() {
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
