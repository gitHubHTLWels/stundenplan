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
      <h2>am {{ timeTableParams.currentDate }}</h2>
      <h2>Klasse {{ timeTableParams.currentClass }}</h2>

      <table>
        <thead>
          <tr>
            <td>Beginn</td>
            <td>Ende</td>
            <td>Fach</td>
            <td v-if="optionShowTeacher">Lehrer</td>
            <td v-if="timeTableParams.isAdmin == true">Modifikationen</td>
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
            <th v-if="timeTableParams.isAdmin == true" class="actions">
              <button v-on:click="moveLessonUp(index)">&#8593;</button>
              <button v-on:click="moveLessonDown(index)">&#8595;</button>
              <button v-on:click="remLesson(index)">&times;</button>
            </th>
          </tr>
        </tbody>
        <tfoot v-if="timeTableParams.isAdmin == true">
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
      <div v-if="timeTableParams.isAdmin == true" id="adminContainer">
        <span class="adminElem">
          <button v-on:click="updateTimetable">
            <font-awesome-icon
              :icon="['fas', 'edit']"
              class="fa-2x cent"
              color="gray"
            />
            Update
          </button>
        </span>
        <span class="adminElem">
          <button v-on:click="deleteTimetable">
            <font-awesome-icon
              :icon="['fas', 'trash']"
              class="fa-2x cent"
              color="gray"
            />
            Delete
          </button>
        </span>
      </div>
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

    let availableClasses = ref(['5ahit', '5bhit']);

    /* VALIdation */

    function isTimeValid(value) {
      //console.log('isTimeValid ..');
      if (!value) return 'Eingabe kann nicht leer sein';
    }
    function checkValue(e) {
      console.log('on BLur' + e.target.value);
    }

    function addUnit(e) {
      e.preventDefault();
      context.emit('addLesson', newTableEntry);
    }
    function remLesson(index) {
      context.emit('remLesson', index);
    }
    function moveLessonUp(index) {
      context.emit('moveLessonUp', index);
    }

    function moveLessonDown(index) {
      console.log('Stundenplan::moveLessonDown(' + index + ')');
      context.emit('moveLessonDown', index);
    }

    function deleteTimetable() {
      console.log('delete timetable ' + props.timeTableParams.currentClass);
      context.emit('deleteTimetable', props.timeTableParams.currentClass);
    }
    function updateTimetable() {
      console.log('update timetable ' + props.timeTableParams.currentClass);
      context.emit('updateTimetable', props.timeTableParams);
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
      availableClasses,
      deleteTimetable,
      updateTimetable,
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
  margin-top: 20px;
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
  margin-top: 20px;
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
#adminContainer {
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
}
.adminElem {
  margin-right: 10px;
}
</style>
