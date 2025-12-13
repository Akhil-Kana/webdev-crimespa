<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Case #</th>
          <th>Incident</th>
          <th>Neighborhood</th>
          <th>Date</th>
          <th>Time</th>
          <th>Locate</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="incident in incidents" :key="incident.case_number" :class="getCategoryClass(incident.code)">
          <td>{{ incident.case_number }}</td>
          <td>{{ incident.incident }}</td>
          <td>{{ neighborhoodToString(incident.neighborhood_number) }}</td>
          <td>{{ formatDateString(incident.date) }}</td>
          <td>{{ formatTimeString(incident.time) }}</td>
          <td>
            <button class="button secondary crime-btn" @click="locateIncident(incident)">
              📍 Find
            </button>
          </td>
          <td>
            <button class="button alert delete-btn" @click="removeIncident(incident.case_number)">
              🗑️ Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div style="margin-top: 20px;">
      <h5>Legend:</h5>
      <div style="width: fit-content">
        <ul>
          <li class="violent-crimes">Violent crimes</li>
          <li class="property-crimes">Property crimes</li>
          <li class="other-crimes">Other crimes</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { neighborhoodToString } from "../scripts/neighborhood.js";

const emit = defineEmits(["delete-row", "add-location"]);

const props = defineProps({
  incidents: {
    type: Array,
    required: true,
  },
  crimeUrl: {
    type: String,
  },
});

// Crime category definitions
const VIOLENT_CRIMES = [
  [100, 120],
  [210, 220],
  [300, 374],
  [400, 453],
  [810, 863],
  [2619, 2619],
];

const PROPERTY_CRIMES = [
  [500, 566],
  [600, 693],
  [700, 732],
  [900, 982],
  [1400, 1436],
];

// Helper functions
function formatDateString(dateStr) {
  return dateStr;
}

function formatTimeString(timeStr) {
  return timeStr;
}

function replaceAddressXs(address) {
  const addressParts = address.split(" ");
  addressParts[0] = addressParts[0].replaceAll("X", "0");
  return addressParts.join(" ");
}

// Category determination
function getCategoryClass(crimeCode) {
  if (isViolentCrime(crimeCode)) return "violent-crimes";
  if (isPropertyCrime(crimeCode)) return "property-crimes";
  return "other-crimes";
}

function isViolentCrime(code) {
  return VIOLENT_CRIMES.some(([min, max]) => code >= min && code <= max);
}

function isPropertyCrime(code) {
  return PROPERTY_CRIMES.some(([min, max]) => code >= min && code <= max);
}

function getIncidentColor(crimeCode) {
  if (isViolentCrime(crimeCode)) return "#ff6b6b";
  if (isPropertyCrime(crimeCode)) return "#4ecdc4";
  return "#ffe66d";
}

// Actions
function removeIncident(caseNum) {
  if (!confirm(`Are you sure you want to delete case ${caseNum}?`)) {
    return;
  }
  
  console.log(`Deleting case: ${caseNum}`);
  
  fetch(`${props.crimeUrl}/remove-incident?case_number=${caseNum}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ case_number: caseNum }),
  })
    .then((response) => response.text())
    .then(() => {
      emit("delete-row", caseNum);
    });
}

function locateIncident(incident) {
  console.log(incident);
  
  const cleanAddress = replaceAddressXs(incident.block);
  console.log(cleanAddress);
  
  const fullAddr = `${cleanAddress}, St. Paul, MN`;
  const markerColor = getIncidentColor(incident.code);
  
  fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddr)}&format=jsonv2`)
    .then((response) => response.json())
    .then((results) => {
      console.log(results);
      const firstResult = results[0];
      
      if (!firstResult) {
        console.log("Location not found");
        alert(`Could not find location for: ${cleanAddress}`);
        return;
      }
      
      const coordinates = [firstResult.lat, firstResult.lon];
      emit("add-location", coordinates, incident, markerColor);
    })
    .catch((err) => {
      console.error("Error locating incident:", err);
      alert("Error finding location. Please try again.");
    });
}
</script>

<style>
.violent-crimes {
  background-color: rgba(255, 107, 107, 0.4) !important;
}

.property-crimes {
  background-color: rgba(78, 205, 196, 0.4) !important;
}

.other-crimes {
  background-color: rgba(255, 230, 109, 0.4) !important;
}

.crime-btn,
.delete-btn {
  font-size: 0.85rem !important;
  padding: 8px 16px !important;
  white-space: nowrap;
}

.crime-btn:hover {
  background: linear-gradient(135deg, #2980b9 0%, #1f5f8b 100%) !important;
}

.delete-btn:hover {
  background: linear-gradient(135deg, #c0392b 0%, #922b21 100%) !important;
}

table tbody td {
  padding: 14px !important;
  vertical-align: middle;
}
</style>
