<template>
  <div>
    <div id="header">
      <h1>Stundenplan für:</h1>
      <h3>{{ name }}</h3>
    </div>
    <div id="block">
      <h2>Klasse: {{ klasse }}</h2>
      <h2>Datum: {{ datum }}</h2>

      <ul id="array-rendering">
        <li v-for="(item, index) in timeTable" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
import { ref } from 'vue';

export default {
  name: 'Stundenplan',
  props: {
    name: {
      type: String,
      required: true,
    },
    klasse: {
      type: String,
      required: true,
    },
    timeTable: {
      type: Array,
      required: true,
    },
    datum: {
      type: String,
      required: true,
    },
  },
  setup() {
    let myArr = ref(['eins', 'zwei']);

    /*

function doSplitTimeTable() {
      let cell = props.stunden.split(',');
      return cell;
    }
    */
    return {
      myArr,
    };
  },
};
</script>

<style scoped>
#header {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}
#header h3,
h1 {
  margin-left: 30px;
}
#block {
  margin-left: 100px;
  margin-top: 30px;
}

ul {
  list-style: none;
}
</style>
