<template>
  <div>
    <div id="optionBlock">
      <h2>Optionen:</h2>
      <div class="item">
        <input v-model="optionShowTeaher" type="checkbox" id="showTeacher" />
        <label for="showTeacher">Anzeige Lehrer</label>
      </div>
    </div>

    <div class="block">
      <h2>Klasse: {{ timeTableParams.klasse }}</h2>
      <h2>am {{ timeTableParams.datum }}</h2>

      <table>
        <thead>
          <tr>
            <td>Beginn</td>
            <td>Ende</td>
            <td>Fach</td>
            <td v-if="optionShowTeaher">Lehrer</td>
            <td>Modifikationen</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in timeTableParams.timeTable" :key="index">
            <th>{{ item.begin }}</th>
            <th>{{ item.end }}</th>
            <th>{{ item.title }}</th>
            <th v-if="optionShowTeaher">{{ item.lehrer }}</th>
            <th class="actions">
              <button v-on:click="moveLessonUp(index)">&#8593;</button>
              <button v-on:click="moveLessonDown(index)">&#8595;</button>
              <button v-on:click="remLesson(index)">&times;</button>
            </th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <input
                type="text"
                v-model="newTableEntry.beginn"
                autofocus
                placeholder="Beginn (required)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="newTableEntry.ende"
                placeholder="Ende (required)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="newTableEntry.fach"
                placeholder="Fach (required)"
              />
            </td>
            <template v-if="optionShowTeaher">
              <td>
                <input
                  type="text"
                  v-model="newTableEntry.teacher"
                  placeholder="Lehrer (required)"
                />
              </td>
            </template>
            <td class="actions">
              <button v-on:click="addUnit">&#43;</button>
            </td>
          </tr>
        </tfoot>
      </table>
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
  setup(props, { emit }) {
    let optionShowTeaher = ref(false);
    let newTableEntry = {
      beginn: '',
      ende: '',
      fach: 'fach',
      teacher: '',
    };

    function addUnit(e) {
      // alert('add me');
      e.preventDefault();
      if (newTableEntry.beginn == '') return;
      emit('addLesson', newTableEntry);
      // specs.push({
      //     einheit: this.newSpec.title,
      //     fach: this.newSpec.value,
      //   });
      newTableEntry.fach = '';
      //title.focus();
    }
    function remLesson(index) {
      //props.timeTableParams.timeTable.splice(index, 1);
      console.log(index);
      emit('remLesson', index);
    }
    function moveLessonUp(index) {
      //his.specs.splice(index - 1, 0, this.specs.splice(index, 1)[0]);
      emit('moveLessonUp', index);
      console.log(index);
    }
    function moveLessonDown(index) {
      //this.specs.splice(index + 1, 0, this.specs.splice(index, 1)[0]);
      emit('moveLessonDown', index);
      console.log(index);
    }

    return {
      optionShowTeaher,
      newTableEntry,
      addUnit,
      remLesson,
      moveLessonUp,
      moveLessonDown,
    };
  },
};
</script>

<style scoped>
#header,
#optionBlock,
.block {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: baseline;
  margin: 0 10px;
}
#header h3,
h1 {
  margin-left: 30px;
}
.block h2 {
  margin-left: 20px;
}
.block {
  margin-left: 100px;
  margin-top: 30px;
}
#optionBlock .item {
  margin-left: 10px;
}

ul {
  list-style: none;
}

table {
  border-top: 1px solid #ddd;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
thead td {
  background-color: #e1e7ee;
}
table th,
td {
  border-bottom: 1px solid blue;
  line-height: 1.2;
  text-align: left;
  padding: 0.5rem;
}

table th {
  background: #f5f7fb;
  font-size: 0.8em;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
