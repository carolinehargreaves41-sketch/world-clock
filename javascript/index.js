//Function for both San Fransisco and Zurich
function updateTime() {
  //San Francisco
  let sanFranciscoElement = document.querySelector("#san-francisco");
  if (sanFranciscoElement) {
    let sanFranciscoDateElement = sanFranciscoElement.querySelector(".date");
    let sanFranciscoTimeElement = sanFranciscoElement.querySelector(".time");
    let sanFranciscoTime = moment.tz("America/Los_Angeles");

    sanFranciscoDateElement.innerHTML = moment().format("MMMM Do YYYY");
    sanFranciscoTimeElement.innerHTML = sanFranciscoTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
  //Zurich
  let zurichElement = document.querySelector("#zurich");
  if (zurichElement) {
    let zurichDateElement = zurichElement.querySelector(".date");
    let zurichTimeElement = zurichElement.querySelector(".time");
    let zurichTime = moment.tz("Europe/Zurich");

    zurichDateElement.innerHTML = moment().format("MMMM Do YYYY");
    zurichTimeElement.innerHTML = zurichTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities-container");
  citiesElement.innerHTML = `
    <div class="city">
    <div>
    <h2>${cityName}</h2>
    <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format(
    "A"
  )}</small>
    </div>
    </div>
    `;
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
