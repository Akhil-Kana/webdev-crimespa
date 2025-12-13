<script setup>
const start = defineModel("start");
const end = defineModel("end");
</script>

<template>
  <div>
    <h5>Date:</h5>
    <label>Start: </label>
    <input type="date" v-model="start" />
    <label>End:</label>
    <input type="date" v-model="end" />
  </div>
</template>
