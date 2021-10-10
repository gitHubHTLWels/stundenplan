<template>
  <Stundenplan :timeTableParams="stundenPlanPar" />
</template>

<script>
import Stundenplan from './components/Stundenplan.vue';

export default {
  name: 'App',
  components: {
    Stundenplan,
  },
  data() {
    return {
      stundenPlanPar: {
        name: 'Karl Renner',
        klasse: '5 AHIT',
        datum: new Date().toLocaleDateString(),
        stunden:
          'EH 1: SEW, EH 2: REL, EH 3: ITP, EH 4: Englisch, EH 5: Pause, EH 6: SYT',
        timeTable: [
          'EH 1: SEW',
          'EH 2: REL',
          'EH 3: ITP',
          'EH 4: Englisch',
          'EH 5: SYT',
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
