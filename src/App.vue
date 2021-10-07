<template>
  <Stundenplan
    name="vor Zuname"
    klasse="5 AHIT"
    stunden="EH 1: SEW, EH 2: REL, EH 3: ITP, EH 4: Englisch, EH 5: Pause, EH 6: SYT"
    datum="6.10.2021"
    :timeTable="timeTable"
  />
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
      timeTable: [
        'EH 1: SEW',
        'EH 2: REL',
        'EH 3: ITP',
        'EH 4: Englisch',
        'EH 5: SYT',
      ],
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
