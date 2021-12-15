

<template>
  <div>
    <div id="header">
      <img src="../assets/htlwels.png" />
      <h1>{{ title }}</h1>
      <h2>{{ name }} {{ currentClass }}</h2>
    </div>
    <!-- <div id="info">
      <h3>Anzahl der Einheiten: {{ units }}</h3>
    </div> -->
    <div id="error" v-if="errorMessage.length">
      <h3>Fehlermeldung:</h3>
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    currentClass: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    errorMessage: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style scoped>
#error {
  color: red;
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 40px;
}
#error h3 {
  margin: 0;
  color: black;
}
#header {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  margin-bottom: 10px;
}
#header h2 {
  margin-left: 30px;
}
#info {
  float: right;
  margin-right: 100px;
}
</style>