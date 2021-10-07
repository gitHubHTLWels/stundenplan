<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h3>
      You have <b> {{ todosCount }} </b> ToDos!!
    </h3>
  </div>

  <div>
    <input
      placeholder="Add a ToDo"
      type="text"
      v-model="newName"
      v-on:keyup.enter="addToDo"
    />
  </div>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <span>{{ todo.name }} </span>
      <button @click="deleteTodo(index)">X</button>
    </li>
  </ul>
</template>

<script>

import { ref, computed, watch } from 'vue';

export default {
  setup() {
    const swearwords = ['Hausübung', 'lernen', 'Schule'];

    let todosCount = computed(() => {
      return todos.value.length;
    });
    let newName = ref('');
    let todos = ref([
      {
        name: 'Deutsch Aufsatz schreiben',
      },
      {
        name: 'Fussball spielen',
      },
      {
        name: 'Online-Meeting',
      },
    ]);

    function addToDo() {
      console.log('Enter addToDo() ...');
      if (newName.value.length > 0) {
        let aNewTodDo = {
          name: newName.value,
        };
        todos.value.push(aNewTodDo);
        newName.value = '';
      }
    }

    function deleteTodo(index) {
      todos.value.splice(index, 1);
    }

    watch(newName, (newVal) => {
      console.log('New Val ' + newVal.value);
      if (swearwords.includes(newVal)) {
        newName.value = '';
      }
    });

    return {
      newName,
      todos,
      addToDo,
      deleteTodo,
      todosCount,
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  width: 300px;
  margin: 20px auto 0;
}
li {
  border: 1px solid;
  display: flex;
  margin-bottom: 10px;
}
li span {
  flex-grow: 1;
}
input {
  width: 300px;
}
.home {
  margin-top: 100px;
}
</style>
