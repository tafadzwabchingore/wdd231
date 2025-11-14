// Function to fetch current weather data
function getCurrentWeather(latitude, longitude, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch current weather data');
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
            // Fetch the 7-day forecast
            fetchSevenDayForecast(latitude, longitude, apiKey);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch current weather data. Please try again later.');
        });
}

// Function to display current weather
function displayCurrentWeather(data) {
    const cityElement = document.getElementById('city');
    const currentTempElement = document.getElementById('current-temp');
    const weatherDescriptionElement = document.getElementById('weather-description');

    if (cityElement && currentTempElement && weatherDescriptionElement) {
        cityElement.textContent = `${data.name}`;
        currentTempElement.textContent = `${data.main.temp}°C`;

        const weatherDescription = data.weather[0].description.toLowerCase();
        if (weatherDescription.includes('rain')) {
            weatherDescriptionElement.textContent = 'Rainy';
        } else if (weatherDescription.includes('cloud')) {
            weatherDescriptionElement.textContent = 'Cloudy';
        } else if (weatherDescription.includes('clear')) {
            weatherDescriptionElement.textContent = 'Clear';
        } else {
            weatherDescriptionElement.textContent = data.weather[0].description;
        }
    } else {
        console.error('DOM elements not found for current weather display.');
    }
}

// Function to fetch 7-day forecast
function fetchSevenDayForecast(latitude, longitude, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch forecast data');
            }
            return response.json();
        })
        .then(data => {
            displaySevenDayForecast(data.daily);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch forecast data. Please try again later.');
        });
}

// Function to display 7-day forecast
function displaySevenDayForecast(dailyData) {
    const forecastContainer = document.getElementById('forecast-container');
    if (forecastContainer) {
        forecastContainer.innerHTML = ''; // Clear previous forecast data

        // Display forecast for the next 7 days
        dailyData.slice(0, 7).forEach(day => {
            const date = new Date(day.dt * 1000); // Convert timestamp to date
            const temp = day.temp.day;
            const weatherDescription = day.weather[0].description;

            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
                <div>${date.toLocaleDateString()}</div>
                <div>${temp}°C</div>
                <div>${weatherDescription}</div>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    } else {
        console.error('Forecast container not found.');
    }
}

// Function to get user's location and fetch weather data
function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiKey = '8c69e35966006ee4625d59e5f1bed11f';
            getCurrentWeather(latitude, longitude, apiKey);
        }, error => {
            console.error('Error getting location:', error);
            alert('Failed to get your location. Please allow location access.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Call getLocationAndWeather() when the page loads to fetch weather for the user's location
window.onload = getLocationAndWeather;