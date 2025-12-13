<script setup>
const props = defineProps({
  neighborhoods: {
    type: Array,
  },
});

const selectedNeighborhoods = defineModel("selectedNeighborhoods");
</script>

<template>
  <div>
    <h5>Neighborhoods:</h5>
    <div class="grid-x grid-margin-x">
      <div v-for="n in neighborhoods" class="cell small-12 medium-4">
        <label
          ><input
            type="checkbox"
            :value="n"
            v-model="selectedNeighborhoods"
          />{{ n.name }}</label
        >
      </div>
    </div>
  </div>
</template>
