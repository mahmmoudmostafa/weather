const cityNameInput = document.querySelector("#cityNameInput");
const findBtn = document.querySelector("#findBtn");
const weatherDetails = document.querySelector(".weather-table");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

async function search(a) {
    let API = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`);
    if (API.status >= 200 && API.status < 300) {
        let a = await API.json();
        displayFirstDay(a.location, a.current);
        displayOtherDays(a.forecast.forecastday);  
    };
};
search("cairo");

cityNameInput.addEventListener("input", (a) => {
    search(a.target.value);
});

findBtn.addEventListener("click", function clearInput() {
    cityNameInput.value = "";
});

// Display Weather
function displayFirstDay(a, API) { 
    let cartona = "";
    const date = new Date(a.localtime.slice(0, 10));
    if (API !== null) {
        cartona = `
        <div class="day-1 flex-lg-fill">
            <div class="head px-2 py-1 d-flex justify-content-between">
                <span class="day">${days[date.getDay()]}</span>
                <span>${date.getDate() + " " + months[date.getMonth()]}</span>
            </div>
            <div class="body p-5">
                <p class="location mb-3"><i class="fa-solid fa-location-dot me-1"></i>${a.name}</p>
                <div class="degree mb-3 d-flex flex-wrap align-items-center gap-5">
                    <h1 class="mb-0">${API.temp_c}<sup>o</sup> C</h1>
                    <img src="https:${API.condition.icon}" alt="Weather Image">
                </div>
                <span class="status">${API.condition.text}</span>
            </div>
            <div class="footer d-flex gap-4 px-5 py-1">
                <p><img class="icons" src="./Images/humidity.png" alt="Humidity logo">${API.humidity}</p>
                <p><img class="icons" src="./Images/wind.png" alt="Wind Speed logo">${API.wind_kph} KPH</p>
                <p><img class="icons" src="./Images/compass.png" alt="Compass logo">${API.wind_dir}</p>
            </div>
        </div>
        `;
    };
    weatherDetails.innerHTML = cartona;
};

function displayOtherDays(a) {
    let cartona2 = "";
    for (let i = 1; i < a.length; i++) {
        const date = new Date(a[i].date.slice(0, 10));
        cartona2 += `
            <div class="day-2 flex-lg-fill">
                <div class="head py-1">
                    <span class="d-block text-center">${days[date.getDay()]}</span>
                </div>
                <div class="body p-5 text-center">
                    <img class="d-block mx-auto mb-3" src="https:${a[i].day.condition.icon}" alt="Weather Image">
                    <h2 class="title mb-1">${a[i].day.maxtemp_c}</h2>
                    <h3 class="sub-title h5 mb-3">${a[i].day.mintemp_c}</h3>
                    <span class="status">${a[i].day.condition.text}</span>
                </div>
            </div>
            `;
    };
    weatherDetails.innerHTML += cartona2;
};
