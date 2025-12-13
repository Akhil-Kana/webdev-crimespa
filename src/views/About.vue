<script setup>
import TeamMembers from "../json/team-members.json";
</script>

<template>
  <div class="about-container">
    <div class="header">
      <h1>About the St. Paul Crime Map Project</h1>
      <p>CISC 375 - Web Development</p>
    </div>

    <!-- Team Members Section -->
    <div class="section">
      <h2>Our Team</h2>
      <div class="team-grid">
        <div v-for="member in TeamMembers" :key="member.name" class="team-member">
          <img :src="member.imgUrl" :alt="member.name" class="portrait" />
          <div class="team-member-info">
            <h3>{{ member.name }}</h3>
            <p>{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tools Section -->
    <div class="section">
      <h2>Tools & Technologies Used</h2>
      <div class="tools-grid">
        <div class="tool-card">
          <h4>Vue.js</h4>
          <p>Progressive JavaScript framework for building the user interface and managing application state</p>
        </div>
        <div class="tool-card">
          <h4>Leaflet API</h4>
          <p>Interactive mapping library for displaying crime locations on the St. Paul map</p>
        </div>
        <div class="tool-card">
          <h4>Nominatim API</h4>
          <p>Geocoding service for converting between addresses and coordinates</p>
        </div>
        <div class="tool-card">
          <h4>Express.js & Node.js</h4>
          <p>Backend REST API server for managing crime data from SQLite database</p>
        </div>
        <div class="tool-card">
          <h4>SQLite3</h4>
          <p>Database storing St. Paul crime incident data</p>
        </div>
        <div class="tool-card">
          <h4>Foundation CSS</h4>
          <p>Responsive CSS framework for styling and layout</p>
        </div>
      </div>
    </div>

    <!-- Video Demo Section -->
    <div class="section">
      <h2>Video Demonstration</h2>
      <div class="video-container">
        <iframe
          src="https://www.youtube.com/embed/Ofv0dCpwCUQ"
          title="Project Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <p class="help-text">Replace the video URL with your actual demo video</p>
    </div>

    <!-- Findings Section -->
    <div class="section">
      <h2>Interesting Findings</h2>
      <div class="findings-grid">
        <div class="finding-card">
          <h4><span class="finding-number">1</span>Finding One</h4>
          <p>Description of interesting finding from crime data analysis.</p>
        </div>
        <div class="finding-card">
          <h4><span class="finding-number">2</span>Finding Two</h4>
          <p>Description of interesting finding from crime data analysis.</p>
        </div>
        <div class="finding-card">
          <h4><span class="finding-number">3</span>Finding Three</h4>
          <p>Description of interesting finding from crime data analysis.</p>
        </div>
        <div class="finding-card">
          <h4><span class="finding-number">4</span>Finding Four</h4>
          <p>Description of interesting finding from crime data analysis.</p>
        </div>
        <div class="finding-card">
          <h4><span class="finding-number">5</span>Finding Five</h4>
          <p>Description of interesting finding from crime data analysis.</p>
        </div>
        <div class="finding-card">
          <h4><span class="finding-number">6</span>Finding Six</h4>
          <p>Description of interesting finding from crime data analysis.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 50px;
  text-align: center;
  margin-bottom: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.header h1 {
  color: white;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.header p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
}

.section {
  background-color: white;
  padding: 40px;
  margin-bottom: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.section:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.section h2 {
  color: #667eea;
  border-bottom: 3px solid #667eea;
  padding-bottom: 15px;
  margin-bottom: 25px;
  font-size: 2rem;
}

.team-grid {
  display: grid;
  gap: 25px;
}

.team-member {
  display: flex;
  align-items: center;
  padding: 25px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  border-left: 5px solid #667eea;
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
}

.portrait {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
  border: 5px solid #667eea;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.portrait:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.team-member-info h3 {
  color: #667eea;
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.team-member-info p {
  color: #666;
  line-height: 1.6;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.tool-card {
  background: linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%);
  padding: 30px;
  border-radius: 16px;
  border-left: 5px solid #667eea;
  transition: all 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.25);
  border-left-width: 8px;
}

.tool-card h4 {
  color: #667eea;
  margin-bottom: 12px;
  font-size: 1.3rem;
}

.tool-card p {
  color: #555;
  line-height: 1.5;
  font-size: 0.95rem;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.findings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.finding-card {
  background: linear-gradient(135deg, #fff8e1 0%, #fffbeb 100%);
  padding: 30px;
  border-radius: 16px;
  border-left: 5px solid #ffa726;
  transition: all 0.3s ease;
}

.finding-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(255, 167, 38, 0.25);
  border-left-width: 8px;
}

.finding-card h4 {
  color: #856404;
  margin-bottom: 12px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.finding-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffa726 0%, #fb8c00 100%);
  color: white;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-weight: bold;
  margin-right: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(255, 167, 38, 0.3);
}

.finding-card p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.help-text {
  text-align: center;
  color: #999;
  font-style: italic;
  margin-top: 10px;
}

/* Dark Mode Styles for About */
body.dark-mode .about-container {
  color: #e0e0e0;
}

body.dark-mode .header {
  background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
}

body.dark-mode .section {
  background-color: #1e293b;
}

body.dark-mode .section h2 {
  color: #818cf8 !important;
  border-bottom-color: #818cf8;
}

body.dark-mode .team-member {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-left-color: #818cf8;
}

body.dark-mode .team-member-info h3 {
  color: #818cf8 !important;
}

body.dark-mode .team-member-info p {
  color: #cbd5e1;
}

body.dark-mode .tool-card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-left-color: #818cf8;
}

body.dark-mode .tool-card h4 {
  color: #818cf8 !important;
}

body.dark-mode .tool-card p {
  color: #cbd5e1;
}

body.dark-mode .finding-card {
  background: linear-gradient(135deg, #713f12 0%, #78350f 100%);
  border-left-color: #fbbf24;
}

body.dark-mode .finding-card h4 {
  color: #fde047 !important;
}

body.dark-mode .finding-card p {
  color: #fef3c7;
}

body.dark-mode .help-text {
  color: #94a3b8;
}
</style>
