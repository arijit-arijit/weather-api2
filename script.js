const apiKey = "e5a5cbdbb0ae7f764932d3368da7a67c"; // <-- Replace this with your actual API key

const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const errorMessage = document.getElementById("error");

weatherForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form reload
    
    const city = cityInput.value.trim();
    if (!city) return;
    
    // Clear previous data and error
    errorMessage.textContent = "";
    weatherResult.classList.add("hidden");
    
    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            showWeather(data);
        })
        .catch((error) => {
            errorMessage.textContent = error.message;
        });
}

function showWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = data.weather[0].description;
    temperature.textContent = Math.round(data.main.temp);
    humidity.textContent = data.main.humidity;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherResult.classList.remove("hidden");
}
