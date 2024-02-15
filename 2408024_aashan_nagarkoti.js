// const apiKey = "a14c349af7dd17e17e3df917be489902";

// // Fetching data from openweathermap API endpoint.
// async function fetchWeatherApi(city) {
//     try {
//         let weatherData = null;
//         const localStorageData = localStorage.getItem(city.toLowerCase());
//         if (localStorageData) {
//             weatherData = JSON.parse(localStorageData);
//             displayWeatherFromLocalStorage(weatherData);
//             displayAlert("Weather data fetched from local storage", "#000000e0");
//         } else {
//             if (navigator.onLine) {
//                 const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
//                 const weatherResponse = await fetch(weatherUrl);
//                 weatherData = await weatherResponse.json();

//                 if (weatherData.cod === "404") {
//                     displayAlert("City not found", "#000000e0");
//                 } else {
//                     getWeather(weatherData);
//                     // Save data to local storage
//                     localStorage.setItem(city.toLowerCase(), JSON.stringify(weatherData));
//                 }
//             } else {
//                 displayAlert("You are offline", "#000000e0");
//             }
//         }
//     } catch (error) {
//         displayAlert(`${error}`, " #000000e0");
//     }
// }

// // Function to display weather from local storage
// function displayWeatherFromLocalStorage(weatherData) {
//     const { name } = weatherData;
//     const { icon, description, main } = weatherData.weather[0];
//     const { temp: temperature, humidity, pressure } = weatherData.main;
//     const { speed: windSpeed } = weatherData.wind;
//     const { dt } = weatherData;
//     let currentDate = getCurrentDate(dt);
//     let updatedTemperature = Math.floor(temperature);

//     displayWeather(
//         name,
//         icon,
//         description,
//         updatedTemperature,
//         humidity,
//         windSpeed,
//         pressure,
//         currentDate
//     );
// }

// // Function to get the current date. Using Unix timestamp format to fetch the date.
// function getCurrentDate(weatherData) {
//     let unixtime = weatherData;
//     let date = new Date(unixtime * 1000); // Convert Unix timestamp to milliseconds

//     // Extract the month, day, and year from the date object
//     let month = date.getMonth() + 1; // Add 1 because months are zero-indexed
//     let day = date.getDate();
//     let year = date.getFullYear();

//     // Create a new Date object with the extracted components
//     let formattedDate = new Date(year, month - 1, day);

//     const options = { weekday: "long", month: "long", day: "numeric" };
//     return formattedDate.toLocaleDateString(undefined, options);
// }

// // Data from the API are stored in the following variables in this function.
// function getWeather(weatherData) {
//     const { name } = weatherData;
//     const { icon, description, main } = weatherData.weather[0];
//     const { temp: temperature, humidity, pressure } = weatherData.main;
//     const { speed: windSpeed } = weatherData.wind;
//     const { dt } = weatherData;
//     let currentDate = getCurrentDate(dt);
//     let updatedTemperature = Math.floor(temperature);

//     displayWeather(
//         name,
//         icon,
//         description,
//         updatedTemperature,
//         humidity,
//         windSpeed,
//         pressure,
//         currentDate
//     );

//     // Split the string by the comma
//     let dateComponent = currentDate.split(', ');

//     let day_of_week = dateComponent[0];
//     let date = dateComponent[1];

//     let weatherDatas = {
//         temperature: updatedTemperature,
//         description: main,
//         city: name,
//         day_of_week,
//         date,
//         icon
//     };

//     console.log("Sending data:", weatherDatas);

//     fetch('weatherhistory.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(weatherDatas),
//     })
//         .then(response => response.text())
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// // Displaying weather information in frontend.
// function displayWeather(
//     name,
//     icon,
//     description,
//     temperature,
//     humidity,
//     windSpeed,
//     pressure,
//     currentDate,
// ) {
//     // Displaying weather information in frontend.
//     fetch('getweatherdata.php')
//         .then(response => response.json())
//         .then(data => {
//             const weatherHistoryDiv = document.getElementById('weatherHistory');

//             const weatherCardsHTML = data.map(entry => `
// <div class="weather-card">
//  <div>${entry.date}</div>
//  <div>${entry.day_of_week}</div>
//  <img src="https://openweathermap.org/img/wn/${entry.icon}.png" alt="${entry.description}">
//  <div>${entry.temperature}°C</div>
//  <div>${entry.description}</div>
// </div>
// `).join('');

//             weatherHistoryDiv.innerHTML = weatherCardsHTML;
//         })
//         .catch(error => console.error('Error fetching weather data:', error));


//     document.querySelector(".city").innerText = name;
//     document.querySelector(".temp").innerText = Math.floor(temperature) + "°C";
//     document.querySelector(".description").innerText = description;
//     document.querySelector(
//         ".icon"
//     ).src = `https://openweathermap.org/img/wn/${icon}.png`;
//     document.querySelector(".humidity").innerText = `Humidity: ${humidity}% `;
//     document.querySelector(".wind").innerHTML = `<h2>Wind Speed</h2>${windSpeed} km/hr  💨`;
//     document.querySelector(".pressure").innerHTML = `<h2>Pressure</h2> ${pressure} pa   🌪️`;
//     document.querySelector(".date").innerText = currentDate;
// }

// // Taking search input and passing it to the fetchWeatherApi() function.
// function search() {
//     const city = document.querySelector(".search-input").value;
//     fetchWeatherApi(city);
// }

// // Displaying Alert Messages for invalid data.
// function displayAlert(message, color) {
//     const alertBox = document.createElement("div");
//     alertBox.textContent = message;
//     alertBox.classList.add("alert");
//     alertBox.style.backgroundColor = color;
//     document.body.insertBefore(alertBox, document.body.firstChild);

//     // Remove the
//     setTimeout(function () {
//         alertBox.remove();
//     }, 4000);
// }

// // Waits for the HTML document to be fully loaded before executing the enclosed code.
// document.addEventListener("DOMContentLoaded", function () {
//     // When the icon is clicked, it calls the search() function
//     document.getElementById("buttonClick").addEventListener("click", function () {
//         search();
//     });

//     // When the "Enter" key is released, it calls the search() function
//     document.querySelector(".search-input").addEventListener("keyup", function (event) {
//         if (event.key === "Enter") {
//             search();
//         }
//     });

//     // Fetch weather data for a default city (e.g., Ulhasnagar) when the page loads
//     fetchWeatherApi("Ulhasnagar");
// });


const apiKey = "a14c349af7dd17e17e3df917be489902";

async function fetchWeatherApi(city) {
    try {
        let weatherData = null;
        const localStorageData = localStorage.getItem(city.toLowerCase());
        if (localStorageData) {
            const { timestamp, data } = JSON.parse(localStorageData);
            // Check if data is fresh (less than 1 hour old)
            if (Date.now() - timestamp < 60 * 60 * 1000) {
                weatherData = data;
                displayWeatherFromLocalStorage(weatherData);
                if (!navigator.onLine) {
                    displayAlert("Weather data fetched from local storage", "#000000e0");
                }
            }
        }
        
        if (!weatherData && navigator.onLine) {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const weatherResponse = await fetch(weatherUrl);
            weatherData = await weatherResponse.json();

            if (weatherData.cod === "404") {
                displayAlert("City not found", "#000000e0");
            } else {
                getWeather(weatherData);
                // Save data to local storage with timestamp
                localStorage.setItem(city.toLowerCase(), JSON.stringify({ timestamp: Date.now(), data: weatherData }));
            }
        } else if (!weatherData && !navigator.onLine) {
            displayAlert("You are offline and no data available", "#000000e0");
        }
    } catch (error) {
        displayAlert(`${error}`, " #000000e0");
    }
}

// Function to display weather from local storage
function displayWeatherFromLocalStorage(weatherData) {
    const { name } = weatherData;
    const { icon, description, main } = weatherData.weather[0];
    const { temp: temperature, humidity, pressure } = weatherData.main;
    const { speed: windSpeed } = weatherData.wind;
    const { dt } = weatherData;
    let currentDate = getCurrentDate(dt);
    let updatedTemperature = Math.floor(temperature);

    displayWeather(
        name,
        icon,
        description,
        updatedTemperature,
        humidity,
        windSpeed,
        pressure,
        currentDate
    );
}

// Function to get the current date. Using Unix timestamp format to fetch the date.
function getCurrentDate(weatherData) {
    let unixtime = weatherData;
    let date = new Date(unixtime * 1000); // Convert Unix timestamp to milliseconds

    // Extract the month, day, and year from the date object
    let month = date.getMonth() + 1; // Add 1 because months are zero-indexed
    let day = date.getDate();
    let year = date.getFullYear();

    // Create a new Date object with the extracted components
    let formattedDate = new Date(year, month - 1, day);

    const options = { weekday: "long", month: "long", day: "numeric" };
    return formattedDate.toLocaleDateString(undefined, options);
}

// Data from the API are stored in the following variables in this function.
function getWeather(weatherData) {
    const { name } = weatherData;
    const { icon, description, main } = weatherData.weather[0];
    const { temp: temperature, humidity, pressure } = weatherData.main;
    const { speed: windSpeed } = weatherData.wind;
    const { dt } = weatherData;
    let currentDate = getCurrentDate(dt);
    let updatedTemperature = Math.floor(temperature);

    displayWeather(
        name,
        icon,
        description,
        updatedTemperature,
        humidity,
        windSpeed,
        pressure,
        currentDate
    );

    // Split the string by the comma
    let dateComponent = currentDate.split(', ');

    let day_of_week = dateComponent[0];
    let date = dateComponent[1];

    let weatherDatas = {
        temperature: updatedTemperature,
        description: main,
        city: name,
        day_of_week,
        date,
        icon
    };

    console.log("Sending data:", weatherDatas);

    fetch('weatherhistory.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(weatherDatas),
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Displaying weather information in frontend.
function displayWeather(
    name,
    icon,
    description,
    temperature,
    humidity,
    windSpeed,
    pressure,
    currentDate,
) {
    // Displaying weather information in frontend.
    fetch('getweatherdata.php')
        .then(response => response.json())
        .then(data => {
            const weatherHistoryDiv = document.getElementById('weatherHistory');

            const weatherCardsHTML = data.map(entry => `
<div class="weather-card">
 <div>${entry.date}</div>
 <div>${entry.day_of_week}</div>
 <img src="https://openweathermap.org/img/wn/${entry.icon}.png" alt="${entry.description}">
 <div>${entry.temperature}°C</div>
 <div>${entry.description}</div>
</div>
`).join('');

            weatherHistoryDiv.innerHTML = weatherCardsHTML;
        })
        .catch(error => console.error('Error fetching weather data:', error));


    document.querySelector(".city").innerText = name;
    document.querySelector(".temp").innerText = Math.floor(temperature) + "°C";
    document.querySelector(".description").innerText = description;
    document.querySelector(
        ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}% `;
    document.querySelector(".wind").innerHTML = `<h2>Wind Speed</h2>${windSpeed} km/hr  💨`;
    document.querySelector(".pressure").innerHTML = `<h2>Pressure</h2> ${pressure} pa   🌪️`;
    document.querySelector(".date").innerText = currentDate;
}

// Taking search input and passing it to the fetchWeatherApi() function.
function search() {
    const city = document.querySelector(".search-input").value;
    fetchWeatherApi(city);
}

// Displaying Alert Messages for invalid data.
function displayAlert(message, color) {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.classList.add("alert");
    alertBox.style.backgroundColor = color;
    document.body.insertBefore(alertBox, document.body.firstChild);

    // Remove the
    setTimeout(function () {
        alertBox.remove();
    }, 4000);
}

// Waits for the HTML document to be fully loaded before executing the enclosed code.
document.addEventListener("DOMContentLoaded", function () {
    // When the icon is clicked, it calls the search() function
    document.getElementById("buttonClick").addEventListener("click", function () {
        search();
    });

    // When the "Enter" key is released, it calls the search() function
    document.querySelector(".search-input").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            search();
        }
    });

    // Fetch weather data for a default city (e.g., Ulhasnagar) when the page loads
    fetchWeatherApi("Ulhasnagar");
});


