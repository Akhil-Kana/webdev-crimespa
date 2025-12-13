<script setup>
const model = defineModel();
</script>

<template>
  <div>
    <h5>Limit:</h5>
    <input type="number" v-model="model" />
  </div>
</template>
