<script setup>
import { reactive, ref, onMounted } from 'vue'

let crime_url = ref('');
let dialog_err = ref(false);
let map = reactive(
    {
        leaflet: null,
        center: {
            lat: 44.955139,
            lng: -93.102222,
            address: ''
        },
        zoom: 12,
        bounds: {
            nw: {lat: 45.008206, lng: -93.217977},
            se: {lat: 44.883658, lng: -92.993787}
        },
        neighborhood_markers: [
            {location: [44.942068, -93.020521], marker: null},
            {location: [44.977413, -93.025156], marker: null},
            {location: [44.931244, -93.079578], marker: null},
            {location: [44.956192, -93.060189], marker: null},
            {location: [44.978883, -93.068163], marker: null},
            {location: [44.975766, -93.113887], marker: null},
            {location: [44.959639, -93.121271], marker: null},
            {location: [44.947700, -93.128505], marker: null},
            {location: [44.930276, -93.119911], marker: null},
            {location: [44.982752, -93.147910], marker: null},
            {location: [44.963631, -93.167548], marker: null},
            {location: [44.973971, -93.197965], marker: null},
            {location: [44.949043, -93.178261], marker: null},
            {location: [44.934848, -93.176736], marker: null},
            {location: [44.913106, -93.170779], marker: null},
            {location: [44.937705, -93.136997], marker: null},
            {location: [44.949203, -93.093739], marker: null}
        ]
    }
);
let show_new_incident_form = ref(false);
let form_error = ref('');
let form_success = ref('');
let codes = ref([]);
let neighborhoods = ref([]);
let new_incident = reactive({
    case_number: '',
    date: '',
    time: '',
    code: '',
    incident: '',
    police_grid: '',
    neighborhood_number: '',
    block: ''
});

// Vue callback for once <template> HTML has been added to web page
onMounted(() => {
    // Create Leaflet map (set bounds and valied zoom levels)
    map.leaflet = L.map('leafletmap').setView([map.center.lat, map.center.lng], map.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 11,
        maxZoom: 18
    }).addTo(map.leaflet);
    map.leaflet.setMaxBounds([[44.883658, -93.217977], [45.008206, -92.993787]]);

    // Get boundaries for St. Paul neighborhoods
    let district_boundary = new L.geoJson();
    district_boundary.addTo(map.leaflet);
    fetch('data/StPaulDistrictCouncil.geojson')
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        result.features.forEach((value) => {
            district_boundary.addData(value);
        });
    })
    .catch((error) => {
        console.log('Error:', error);
    });
});


// FUNCTIONS
// Function called once user has entered REST API URL
function initializeCrimes() {
    fetch(crime_url.value + '/codes')
        .then(response => response.json())
        .then(data => {
            codes.value = data;
        })
        .catch(error => {
            console.log('Error fetching codes:', error);
        });

    fetch(crime_url.value + '/neighborhoods')
        .then(response => response.json())
        .then(data => {
            neighborhoods.value = data;
        })
        .catch(error => {
            console.log('Error fetching neighborhoods:', error);
        });
        //TODO: get initial 1000 crimes
}

function closeDialog() {
    let dialog = document.getElementById('rest-dialog');
    let url_input = document.getElementById('dialog-url');
    if (crime_url.value !== '' && url_input.checkValidity()) {
        dialog_err.value = false;
        dialog.close();
        initializeCrimes();
    }
    else {
        dialog_err.value = true;
    }
}

function toggleNewIncidientForm() {
    show_new_incident_form.value = !show_new_incident_form.value;
    form_error.value = '';
    form_success.value = '';

    if (!show_new_incident_form) {
        resetForm();
    }
}

function resetForm() {
    new_incident.case_number = '';
    new_incident.date = '';
    new_incident.time = '';
    new_incident.code = '';
    new_incident.incident = '';
    new_incident.police_grid = '';
    new_incident.neighborhood_number = '';
    new_incident.block = '';
}

function submitNewIncident() {
    form_error.value = '';
    form_success.value = '';

    if (!new_incident.case_number || !new_incident.date || !new_incident.time || 
        !new_incident.code || !new_incident.incident || !new_incident.police_grid || 
        !new_incident.neighborhood_number || !new_incident.block) {
        form_error.value = 'Error: All fields must be filled out';
        return;
    }

    fetch(crime_url.value + '/new-incident', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            case_number: new_incident.case_number,
            date: new_incident.date,
            time: new_incident.time,
            code: parseInt(new_incident.code),
            incident: new_incident.incident,
            police_grid: parseInt(new_incident.police_grid),
            neighborhood_number: parseInt(new_incident.neighborhood_number),
            block: new_incident.block
        })
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
    })
    .then(data => {
        form_success.value = 'Incident added successfully!';
        resetForm();
        // TODO: Refresh the crime data/table here
    })
    .catch(error => {
        form_error.value = 'Error: ' + error.message;
    });
}

</script>

<template>
    <dialog id="rest-dialog" open>
        <h1 class="dialog-header">St. Paul Crime REST API</h1>
        <label class="dialog-label">URL: </label>
        <input id="dialog-url" class="dialog-input" type="url" v-model="crime_url" placeholder="http://localhost:8000" />
        <p class="dialog-error" v-if="dialog_err">Error: must enter valid URL</p>
        <br/>
        <button class="button" type="button" @click="closeDialog">OK</button>
    </dialog>
    <div class="grid-container">
    <div class="grid-x grid-padding-x">
        <div class="cell small-12">
            <button class="button" type="button" @click="toggleNewIncidentForm">
                {{ show_new_incident_form ? 'Close' : 'Add New Incident' }}
            </button>
        </div>
    </div>

    <!-- New Incident Form -->
    <div v-if="show_new_incident_form" class="grid-x grid-padding-x" id="new-incident-form">
        <div class="cell small-12">
            <div class="callout">
                <h3>Add New Crime Incident</h3>
                
                <div class="grid-x grid-padding-x">
                    <div class="cell small-12 medium-6">
                        <label>Case Number:
                            <input type="text" v-model="new_incident.case_number" placeholder="e.g., 24-123456" required>
                        </label>
                    </div>
                    
                    <div class="cell small-12 medium-6">
                        <label>Date:
                            <input type="date" v-model="new_incident.date" required>
                        </label>
                    </div>

                    <div class="cell small-12 medium-6">
                        <label>Time:
                            <input type="time" v-model="new_incident.time" step="1" required>
                        </label>
                    </div>

                    <div class="cell small-12 medium-6">
                        <label>Incident Code:
                            <select v-model="new_incident.code" required>
                                <option value="">Select a code</option>
                                <option v-for="code in codes" :key="code.code" :value="code.code">
                                    {{ code.code }} - {{ code.type }}
                                </option>
                            </select>
                        </label>
                    </div>

                    <div class="cell small-12 medium-6">
                        <label>Incident Description:
                            <input type="text" v-model="new_incident.incident" placeholder="e.g., Theft" required>
                        </label>
                    </div>

                    <div class="cell small-12 medium-6">
                        <label>Police Grid:
                            <input type="number" v-model="new_incident.police_grid" placeholder="e.g., 123" required>
                        </label>
                    </div>

                    <div class="cell small-12 medium-6">
                        <label>Neighborhood:
                            <select v-model="new_incident.neighborhood_number" required>
                                <option value="">Select a neighborhood</option>
                                <option v-for="neighborhood in neighborhoods" :key="neighborhood.id" :value="neighborhood.id">
                                    {{ neighborhood.id }} - {{ neighborhood.name }}
                                </option>
                            </select>
                        </label>
                    </div>

                    <div class="cell small-12 medium-6">
                        <label>Block/Address:
                            <input type="text" v-model="new_incident.block" placeholder="e.g., 100 BLOCK OF MAIN ST" required>
                        </label>
                    </div>

                    <div class="cell small-12">
                        <button class="button success" type="button" @click="submitNewIncident">
                            Submit Incident
                        </button>
                        <button class="button alert" type="button" @click="toggleNewIncidentForm">
                            Cancel
                        </button>
                    </div>

                    <div class="cell small-12" v-if="form_error">
                        <div class="callout alert">
                            {{ form_error }}
                        </div>
                    </div>

                    <div class="cell small-12" v-if="form_success">
                        <div class="callout success">
                            {{ form_success }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <div class="grid-container ">
        <div class="grid-x grid-padding-x">
            <div id="leafletmap" class="cell auto"></div>
        </div>
    </div>
</template>

<style scoped>
#rest-dialog {
    width: 20rem;
    margin-top: 1rem;
    z-index: 1000;
}

#leafletmap {
    height: 500px;
}

.dialog-header {
    font-size: 1.2rem;
    font-weight: bold;
}

.dialog-label {
    font-size: 1rem;
}

.dialog-input {
    font-size: 1rem;
    width: 100%;
}

.dialog-error {
    font-size: 1rem;
    color: #D32323;
}

#new-incident-form {
    margin-bottom: 1rem;
}

#new-incident-form .callout {
    background-color: #e6f2ff;
}

#new-incident-form h3 {
    margin-bottom: 1rem;
    color: #b477ffff;
}
</style>
