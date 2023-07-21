const apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";
let map;
let marker;
let cachedData; // Store the cached response

function initMap(latitude, longitude) {
  // Initialize the map only if it's not already initialized
  if (!map) {
    map = L.map("map").setView([latitude, longitude], 4);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Create the marker for the first time
    let myIcon = L.icon({
      iconUrl: './images/ISS.svg',
      iconSize: [90, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });
    marker = L.marker([latitude, longitude], { icon: myIcon }).addTo(map).openPopup();
  }
}

async function updateMarker() {
  try {
    let data;
    if (cachedData && Date.now() - cachedData.timestamp < 5000) {
      // Use the cached data if it's available and not expired (5 seconds cache)
      data = cachedData.data;
    } else {
      const response = await fetch(apiUrl);
      data = await response.json();
      // Cache the response along with the current timestamp
      cachedData = { data, timestamp: Date.now() };
    }
    marker.setLatLng([data.latitude, data.longitude]);
  } catch (error) {
    console.error("Error fetching ISS coordinates:", error);
  }
}

// Initial setup
async function setup() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    initMap(data.latitude, data.longitude);
    setInterval(updateMarker, 1000); // Update the marker every second
  } catch (error) {
    console.error("Error fetching ISS coordinates:", error);
  }
}

setup();

// getting the date for the copyright

const dateElement = document.querySelector('.copyright_date');
const date = new Date();
dateElement.textContent += `${date.getFullYear()}`
