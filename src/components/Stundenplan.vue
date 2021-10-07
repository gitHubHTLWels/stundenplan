<template>
  <div>
    <div id="block">
      <h2>Klasse: {{ timeTableParams.klasse }}</h2>
      <h2>am {{ timeTableParams.datum }}</h2>

      <ul id="array-rendering">
        <li v-for="(item, index) in timeTableParams.timeTable" :key="index">
          {{ item.begin }} {{ item.end }} {{ item.title }}
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
    timeTableParams: {
      type: Object,
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
#header,
#block {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  margin: 0 10px;
}
#header h3,
h1 {
  margin-left: 30px;
}
#block h2 {
  margin-left: 20px;
}
#block {
  margin-left: 100px;
  margin-top: 30px;
}

ul {
  list-style: none;
}
</style>
