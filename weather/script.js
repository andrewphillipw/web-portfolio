
const wrapper = document.querySelector('.wrapper'),
    inputPart = document.querySelector('.input-part'),
    infoTxt = inputPart.querySelector('.info-txt'),
    inputField = inputPart.querySelector('input'),
    locationBtn = inputPart.querySelector('button'),
    weatherPart = wrapper.querySelector('.weather-part'),
    wIcon = weatherPart.querySelector('img'),
    arrowBack = wrapper.querySelector('header i');

let api;

//event listener for the city text field
inputField.addEventListener('keyup', e => {
    if (e.key == 'Enter' && inputField.value != '') {
        requestApi(inputField.value);
    }
});

//event listener for find by location option
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert('Your browser does not support the geolocation api');
    }
});

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6782fcc1832418a348702e72475de34d`;
    fetchData();
}

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6782fcc1832418a348702e72475de34d`;
    fetchData();
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add('error');
}

//function using AJAX to return JSON data
function fetchData() {
    infoTxt.innerText = 'Getting weather details...';
    infoTxt.classList.add('pending');
    fetch(api)
        .then(res => res.json())
        .then(result => weatherDetails(result))
        .catch(() => {
            infoTxt.innerText = 'Something went wrong';
            infoTxt.classList.replace('pending', 'error');
        });
}

function weatherDetails(info) {
    if (info.cod == '404') {
        infoTxt.classList.replace('pending', 'error');
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { temp, feels_like, humidity } = info.main;

        if (id == 800) {
            wIcon.src = 'icons/sun-solid.png';
        } else if (id >= 600 && id <= 622) {
            wIcon.src = 'icons/snowflake-solid.png';
        } else if (id >= 701 && id <= 781) {
            wIcon.src = 'icons/cloud-sun-solid.png';
        } else if (id >= 801 && id <= 804) {
            wIcon.src = 'icons/cloud-solid.png';
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            wIcon.src = 'icons/cloud-rain-solid.png';
        }

        weatherPart.querySelector('.temp .numb').innerText = Math.floor(temp);
        weatherPart.querySelector('.weather').innerText = description;
        weatherPart.querySelector(
            '.location span'
        ).innerText = `${city}, ${country}`;
        weatherPart.querySelector('.temp .numb-2').innerText =
            Math.floor(feels_like);
        weatherPart.querySelector('.humidity span').innerText = `${humidity}%`;
        infoTxt.classList.remove('pending', 'error');
        infoTxt.innerText = '';
        inputField.value = '';
        wrapper.classList.add('active');
    }
}

arrowBack.addEventListener('click', () => {
    wrapper.classList.remove('active');
});





