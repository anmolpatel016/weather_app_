const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');


const weatherInfoSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const serachCitySection = document.querySelector('.search-city');

const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');
const forecastItemsContainer = document.querySelector('.forecast-items-container');

const apiKey = '6051e208b004321e4b6b5dcb716d39b8';
const Option = {weekday: 'short', month:'short', day:'numeric',hour:'numeric', minute:'numeric', hour12: true};
const date = new Date().toLocaleDateString('en-Us', Option);

// Handle button click
searchBtn.addEventListener('click', () => {
    const inputValue = cityInput.value.trim();
    
    if (inputValue !== '') {
        console.log(inputValue);
        updateWeatherInfo(inputValue);
        cityInput.value = '';
        cityInput.blur();
    }
});

// Handle "Enter" key in input
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const inputValue = cityInput.value.trim();
        
        if (inputValue !== '') {
            console.log(inputValue);
            updateWeatherInfo(inputValue);
            cityInput.value = '';
            cityInput.blur();
        }
    }
});

// Placeholder fetch function
async function getFetchData(endPoint, city) {
    try{
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("City not found");
    }
    return await response.json();
} catch(error) {
    alert(error.message);
    return;
}
}
function getWeatherIcon(id) {
    if(id <= 232) return 'thunderstorm.svg'
    if(id <= 321) return 'drizzle.svg'
    if(id <= 531) return 'rain.svg'
    if(id <= 622) return 'snow.svg'
    if(id <= 781) return 'tornado.svg'
    if(id <= 800) return 'clear-sky.svg'
    if(id <= 804) return 'clouds.svg'
    else return 'sun.svg'

} 
 function updateDateTime(){
    const now = new Date();
    const dateTimeElement = document.getElementById('datetime');
    const options ={
        weekday:'short',
        month:'short',
        day:'numeric',
        hour:'numeric',
        hour12:true,
        timeZone:'Asia/Kolkata',
    };
    dateTimeElement.textContent = now.toLocaleDateString('en-In',options);
 }
 setInterval(updateDateTime,1000);
 updateDateTime();



// Function to update weather
async function updateWeatherInfo(city) {
    const weatherData =await getFetchData('weather',city);
    if (weatherData.cod !=200) {
        showDisplaySection(notFoundSection);
        return;
    }
    

    const{
        name: country,
        main: {temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData

    countryTxt.textContent = country
    tempTxt.textContent = Math.round(temp) + '°C'
    conditionTxt.textContent = main
    humidityValueTxt.textContent = humidity + '%'
    
    currentDateTxt.textContent = date
    
    document.addEventListener("DOMContentLoaded", () => {
        updateWeatherInfo();
    });
    if (windValueTxt) {
        windValueTxt.textContent = `${speed}m/s`
    }else{
        console.warn("Element 'windValueTxt' not found!'");
    }

    await updateForecastsInfo(city)
    if(weatherSummaryImg){
    weatherSummaryImg.src = `weather/${getWeatherIcon(id)}`;
    }
    showDisplaySection(weatherInfoSection)
}
async function updateForecastsInfo(city) {
    const forecastsData = await getFetchData('forecast',city)

    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]
    
    forecastItemsContainer.innerHTML = ''
    forecastsData.list.forEach(forecastWeather => {
        if(forecastWeather.dt_txt.includes(timeTaken)&& 
           !forecastWeather.dt_txt.includes(todayDate))
        updateForecastsItems(forecastWeather)

    })
}

function updateForecastsItems(weatherData){
    console.log(weatherData)
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = weatherData

    const dateTaken = new Date(date)
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }

    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption)

    const forecastItem = 
    `<div class="forecast-item">
        <h5 class="forecast-item-date">${dateResult}</h5>
        <img src="weather/${getWeatherIcon(id)}" class="forecast-item-img"></img>
        <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
    </div>`
    forecastItemsContainer.insertAdjacentHTML('beforeend',forecastItem)
}
function showDisplaySection(section) {
    [weatherInfoSection, serachCitySection,notFoundSection]
        .forEach(section => section.style.display ='none')
    section.style.display = 'flex'
    

}