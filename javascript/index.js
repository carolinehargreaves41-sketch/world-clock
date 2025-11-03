let updateInterval;

//Function to update the time, date, and timezone offsets for all city elements
function updateTime() {
  let cityElements = document.querySelectorAll(".city");

  cityElements.forEach((cityElement) => {
    let timezone = cityElement.dataset.timezone;

    if (!timezone) return;

    let dateElement = cityElement.querySelector(".date");
    let timeElement = cityElement.querySelector(".time");
    let offsetElement = cityElement.querySelector(".timezone-offset");

    let cityTime = moment.tz(timezone);
    dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
    timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");

    if (offsetElement) {
      let offset = cityTime.format("Z");
      offsetElement.innerHTML = `UTC ${offset}`;
    }
  });
}

//Function to handle user selecting a city from the dropdown menu
function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return;

  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  let cityName = cityTimeZone.replace(/_/g, " ").split("/")[1];
  let citiesElement = document.querySelector("#cities-container");
  citiesElement.innerHTML = `
    <div class="city" data-timezone="${cityTimeZone}">
    <div>
    <h2>${cityName}</h2>
    <div class="date"></div>
    <div class="timezone-offset"></div>
    </div>
    <div class="time"></div>
    </div>
    <a href="#" id="home-link">⬅ Back to All Cities</a>
    `;

  document.getElementById("home-link").addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });

  updateTime();
}

updateTime();

updateInterval = setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
