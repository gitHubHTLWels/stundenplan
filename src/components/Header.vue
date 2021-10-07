

<template>
  <div id="header">
    <img src="../assets/htlwels.png" />
    <h1>{{ title }}</h1>
    <h1>für {{ name }}</h1>
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
#header h1 {
  margin-left: 30px;
}
</style>