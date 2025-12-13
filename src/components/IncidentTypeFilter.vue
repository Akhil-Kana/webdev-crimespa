<script setup>
const props = defineProps({
  incidentTypes: {
    type: Array,
  },
});

const selectedFilters = defineModel("selectedFilters");
</script>

<template>
  <div>
    <h5>Incident Type:</h5>
    <div class="grid-x grid-margin-x">
      <div v-for="inc in incidentTypes" class="cell small-12 medium-4">
        <label
          ><input type="checkbox" :value="inc" v-model="selectedFilters" />{{
            inc.label
          }}</label
        >
      </div>
    </div>
  </div>
</template>
