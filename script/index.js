const form = document.querySelector("form");
const input = document.querySelector("#inp");
const output = document.querySelector(".output");
const weather_info = document.querySelector(".weather_info");

const API = "https://api.openweathermap.org/data/2.5/weather?q=";
const key = "&appid=271dc5c23ab9ad08fa115d5f37057937";

const getCityWeather = async () => {
  if (!input.value.trim().length) return;
  const req = await fetch(API + input.value + key);
  const res = await req.json();
  renderWeather(res);
  renderMap(res.coord);
};
const renderWeather = (data) => {
  console.log(data);
  output.innerHTML = "";
  weather_info.innerHTML = "";
  if (data?.cod && data?.code == "404") {
    const message = document.createElement("h2");
    message.textContent = data?.message;
    output.append(message);
    return;
  }

  const { name, sys, main } = data;
  const cityName = document.createElement("h1");
  cityName.textContent = name;

  const countryName = document.createElement("h2");
  countryName.textContent = `Country: ${sys.country}`;

  const tempC = document.createElement("h3");
  tempC.innerHTML = `Temp C &#176; : ${Math.floor(main.temp - 273.15)}`;

  const tempF = document.createElement("h3");
  tempF.innerHTML = `Temp F &#176; : ${Math.floor(
    (main.temp - 273.15) * 1.8 + 32
  )}`;

  const sunrise = document.createElement("h4");
  sunrise.textContent = `sunrise : ${new Date(
    sys.sunrise * 1000
  ).getHours()} : ${new Date(sys.sunrise * 1000).getMinutes()}`;

  const sunset = document.createElement("h4");
  sunset.textContent = `sunset : ${new Date(
    sys.sunset * 1000
  ).getHours()} : ${new Date(sys.sunset * 1000).getMinutes()}`;

  weather_info.append(cityName, countryName, tempC, tempF, sunrise, sunset);
  output.append(weather_info);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getCityWeather();
});

const renderMap = ({ lat, lon }) => {
  let map = document.createElement("div");
  map.id = "map";

  DG.then(function () {
    map = DG.map("map", {
      center: [lat, lon],
      zoom: 13,
    });

    DG.marker([lat, lon]).addTo(map).bindPopup("Вы кликнули по мне!");
  });

  output.append(map);
};
