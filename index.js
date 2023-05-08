const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '12137e39d3833f74c60e8e8f7b62ac43';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
            
            //------------------------------------------------------------
            
            var temp2 = document.querySelector('.consequences .heat');
            var temp3 = document.querySelector('.consequences .heat2');
            //temp2.innerHTML = `${parseInt(json.main.temp)}°C`;
            let x = parseInt(json.main.temp);
            if(x < 0 ) {
                temp2.innerHTML = "Try to stay at home. ";
                temp3.innerHTML = "Else you can play with a snowman :)";
            }
            else if(x < 10) {
                temp2.innerHTML = "It's chilly outside.";
                temp3.innerHTML = "Can use a heater :')";
            }
            else if(x < 15) {
                temp2.innerHTML = "It's chilly outside";
                temp3.innerHTML = "Hoodie time!";
            }
            else if(x < 20) {
                temp2.innerHTML = "It's a nice day.";
                temp3.innerHTML = "Hear out for bird songs";
            }
            else if(x < 30) {
                temp2.innerHTML = "It's warm.";
                temp3.innerHTML = "Time for Mangoes!!";
            }
            else if(x < 40) {
                temp2.innerHTML = "It's hot outside.";
                temp3.innerHTML = "Stay hydrated";
            }
            else {
                temp2.innerHTML = "Red alert for heat";
                temp3.innerHTML = "Too hot to handle!";
            }


    });
});