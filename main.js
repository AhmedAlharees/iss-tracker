
const apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";
let map; // Declare the map variable outside the functions

async function getIssCoords() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    updateMap(data.latitude, data.longitude); // Call the function to update the marker
  } catch (error) {
    console.error("Error fetching ISS coordinates:", error);
  }
}

function updateMap(latitude, longitude) {
  if (!map) {
    // Initialize the map only if it's not already initialized
    map = L.map("map").setView([latitude, longitude], 4);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  } else {
    // If the map is already initialized, just update the marker's position
    map.setView([latitude, longitude]);
  }

  // Update or create the marker
  let myIcon = L.icon({
    iconUrl: './images/ISS.svg',
    iconSize: [90, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
  if (!map.marker) {
    map.marker = L.marker([latitude, longitude], {icon: myIcon})
      .addTo(map)
      .openPopup()
  } else {
    map.marker.setLatLng([latitude, longitude]);
  }
}

// Call the getIssCoords initially
getIssCoords();

// Update the ISS coordinates every second
setInterval(getIssCoords, 1000);

// getting the date for the copyright

const dateElement = document.querySelector('.copyright_date');
const date = new Date();
dateElement.textContent += `${date.getFullYear()}`
