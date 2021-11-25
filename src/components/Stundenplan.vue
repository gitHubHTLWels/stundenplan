<template>
  <div>
    <div id="optionBlock">
      <h2>Optionen:</h2>
      <div class="item">
        <input v-model="optionsShowTeacher" type="checkbox" id="showTeacher" />
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
            <td v-if="optionShowTeacher">Lehrer</td>
            <td>Modifikationen</td>
          </tr>
        </thead>
        <tbody>
          <tr
            @mouseover="handleMouseOver"
            v-for="(item, index) in timeTableParams.timeTable"
            :key="index"
          >
            <td>{{ item.begin }}</td>
            <td>{{ item.end }}</td>
            <td>{{ item.title }}</td>
            <td v-if="optionsShowTeacher">{{ item.teacher }}</td>
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
                name="lessonBegin"
                type="text"
                v-model="newTableEntry.begin"
                autofocus
                placeholder="Beginn (required)"
                @blur="checkValue"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="newTableEntry.end"
                placeholder="Ende (required)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="newTableEntry.title"
                placeholder="Fach (required)"
              />
            </td>
            <template v-if="optionsShowTeacher">
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
//import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'Stundenplan',
  props: {
    timeTableParams: {
      type: Object,
      required: true,
    },
  },
  components: {},
  setup(props, context) {
    let optionsShowTeacher = ref(false);
    let newTableEntry = {
      begin: '',
      end: '',
      title: 'fach',
      teacher: '',
    };
    /* VALIdation */

    function isTimeValid(value) {
      console.log('isTimeValid ..');
      if (!value) return 'Eingabe kann nicht leer sein';
    }
    function checkValue(e) {
      console.log('on BLur' + e.target.value);
    }

    function addUnit(e) {
      e.preventDefault();
      console.log('Stundenplan::addUnit()');
      context.emit('addLesson', newTableEntry);
    }
    function remLesson(index) {
      console.log('Stundenplan::remLesson(' + index + ')');
      context.emit('remLesson', index);
    }
    function moveLessonUp(index) {
      console.log('Stundenplan::moveLessonUp(' + index + ')');
      context.emit('moveLessonUp', index);
    }
    function moveLessonDown(index) {
      console.log('Stundenplan::moveLessonDown(' + index + ')');
      context.emit('moveLessonDown', index);
    }

    function handleMouseOver(index) {
      console.log('mous over ' + index);
    }

    return {
      optionsShowTeacher,
      newTableEntry,
      addUnit,
      remLesson,
      moveLessonUp,
      moveLessonDown,
      handleMouseOver,
      isTimeValid,
      checkValue,
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
#optionBlock {
  margin-top: 40px;
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
