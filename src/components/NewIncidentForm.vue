<script>
import Codes from "../json/codes.json";
import Neighborhoods from "../json/neighborhoods.json";

export default {
  data() {
    return {
      Codes,
      Neighborhoods,
      formVisible: false,
      formData: {
        caseNumber: "",
        incidentDate: "",
        incidentTime: "",
        crimeCode: "",
        description: "",
        policeGrid: "",
        neighborhoodNum: "",
        blockAddress: "",
      },
      validationError: "",
    };
  },

  methods: {
    validateFormData() {
      const { caseNumber, incidentDate, incidentTime, crimeCode, description, policeGrid, neighborhoodNum, blockAddress } = this.formData;
      
      if (!caseNumber || !incidentDate || !incidentTime || !crimeCode || !description || !policeGrid || !neighborhoodNum || !blockAddress) {
        this.validationError = "Please fill out ALL fields.";
        return false;
      }
      
      this.validationError = "";
      return true;
    },

    resetFormData() {
      this.formData = {
        caseNumber: "",
        incidentDate: "",
        incidentTime: "",
        crimeCode: "",
        description: "",
        policeGrid: "",
        neighborhoodNum: "",
        blockAddress: "",
      };
    },

    async handleSubmit() {
      if (!this.validateFormData()) {
        return;
      }

      const incidentData = {
        case_number: this.formData.caseNumber,
        date: this.formData.incidentDate,
        time: this.formData.incidentTime,
        code: this.formData.crimeCode,
        incident: this.formData.description,
        police_grid: this.formData.policeGrid,
        neighborhood_number: this.formData.neighborhoodNum,
        block: this.formData.blockAddress,
      };

      try {
        const response = await fetch("http://localhost:8000/new-incident", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(incidentData),
        });

        if (!response.ok) {
          this.validationError = "Server error. Could not submit.";
          return;
        }

        alert("Incident added successfully!");
        this.resetFormData();
      } catch (error) {
        this.validationError = "Network error.";
      }
    },
  },
};
</script>

<template>
  <div>
    <button class="button" @click="formVisible = !formVisible">
      {{ formVisible ? "Hide Form" : "Add New Incident" }}
    </button>

    <transition name="slide">
      <div v-if="formVisible" class="callout" style="margin-top: 1rem">
        <h4>Add New Incident</h4>

        <div v-if="validationError" class="callout alert">
          {{ validationError }}
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="grid-x grid-margin-x">
            <div class="cell small-12 medium-6">
              <label>
                Case Number:
                <input v-model="formData.caseNumber" />
              </label>
            </div>

            <div class="cell small-12 medium-6">
              <label>
                Date (YYYY-MM-DD):
                <input v-model="formData.incidentDate" />
              </label>
            </div>
          </div>

          <div class="grid-x grid-margin-x">
            <div class="cell small-12 medium-6">
              <label>
                Time (HH:MM:SS):
                <input v-model="formData.incidentTime" />
              </label>
            </div>

            <div class="cell small-12 medium-6">
              <label>
                Code:
                <select v-model="formData.crimeCode">
                  <option v-for="codeItem in Codes" :key="codeItem.code" :value="codeItem.code">
                    {{ codeItem.code }}: {{ codeItem.description }}
                  </option>
                </select>
              </label>
            </div>
          </div>

          <div class="grid-x grid-margin-x">
            <div class="cell small-12">
              <label>
                Incident Description:
                <input v-model="formData.description" />
              </label>
            </div>
          </div>

          <div class="grid-x grid-margin-x">
            <div class="cell small-12 medium-6">
              <label>
                Police Grid:
                <input v-model="formData.policeGrid" />
              </label>
            </div>

            <div class="cell small-12 medium-6">
              <label>
                Neighborhood #:
                <select v-model="formData.neighborhoodNum">
                  <option v-for="neighborhood in Neighborhoods" :key="neighborhood.id" :value="neighborhood.id">
                    {{ neighborhood.name }}
                  </option>
                </select>
              </label>
            </div>
          </div>

          <div class="grid-x grid-margin-x">
            <div class="cell small-12">
              <label>
                Block:
                <input v-model="formData.blockAddress" />
              </label>
            </div>
          </div>

          <button type="submit" class="button primary expanded">
            Submit Incident
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.form-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 25px;
  width: 550px;
  background: white;
}

h2 {
  text-align: center;
  margin-bottom: 15px;
}

.error {
  color: red;
  margin-bottom: 10px;
  text-align: center;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 12px;
}

.form-row.full {
  flex-direction: column;
}

.form-field {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-field.full input {
  width: 100%;
}

label {
  margin-bottom: 4px;
  font-size: 14px;
}

input {
  padding: 7px;
  border: 1px solid #aaa;
  border-radius: 4px;
  width: 100%;
}

.submit-btn {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background: #4677f5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #325fd1;
}
</style>

