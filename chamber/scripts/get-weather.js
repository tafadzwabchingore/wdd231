const API_KEY = '8a79083123d8ef1d5ad73557ee563fc6';
const forecastDays = document.querySelectorAll('.forecast-day');

const lat = -17.8292;
const lon = 31.0522;
const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

async function apiFetch() {
    try {
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    const dailyForecasts = data.daily;
    // Adjusted the loop to iterate through the first 4 days
    for (let i = 0; i < 4; i++) {
        const forecast = dailyForecasts[i];
        const dayElement = forecastDays[i];
        const tempElement = dayElement.querySelector('.forecast-temp');
        const iconElement = dayElement.querySelector('.forecast-icon');
        const descElement = dayElement.querySelector('.forecast-description');
        const dateElement = dayElement.querySelector('.date');

        const date = new Date(forecast.dt * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1; 

        dateElement.textContent = `${month}/${day}`;

        if (i === 0) {
            dayElement.querySelector('h3').textContent = 'Today';
        } else if (i === 1) {
            dayElement.querySelector('h3').textContent = getWeekdayName(date.getDay() % 7);
        } else if (i === 2) { // Updated the condition to match the new iteration
            dayElement.querySelector('h3').textContent = getDayAfterTomorrowName(date.getDay());
        } else {
            // Here, you can define how you want to label the additional day, 
            // for example, you could simply use the weekday name.
            dayElement.querySelector('h3').textContent = getWeekdayName(date.getDay() % 7);
        }

        tempElement.textContent = `${forecast.temp.day.toFixed(0)}°C`;
        const iconSrc = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        iconElement.setAttribute('src', iconSrc);
        iconElement.setAttribute('alt', forecast.weather[0].description);
        descElement.textContent = forecast.weather[0].description;
    }
}

// Function to get the weekday name
function getWeekdayName(dayIndex) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[dayIndex];
}

// Function to get the day after tomorrow's weekday name
function getDayAfterTomorrowName(dayIndex) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[(dayIndex) % 7];
}

apiFetch();