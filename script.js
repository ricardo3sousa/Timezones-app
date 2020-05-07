const apiCoor = {
    base: "https://api.openweathermap.org/data/2.5/weather?",
    key: "&appid=aacac1e09efba2b9bf221c5586219a30"
}

const apiTime = 'https://api.ipgeolocation.io/timezone?apiKey=6ff8d0cece734b10b1f57a7a906abf93&';


let box = document.getElementById('searchBox');
let text = document.querySelector('.text');

let timer;
window.onload = initial;


function setDoisDigitos(tempo) {
    if (tempo < 10) {
        return "0" + tempo;
    } else {
        return tempo;
    }
}


function initial() {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        let title = document.createElement('p');
        title.className = 'title';
        text.appendChild(title);

        let hours = document.createElement('p');
        hours.className = 'hours';
        text.appendChild(hours);

        timer = setInterval(function () {
            fetch(`${apiCoor.base}lat=${lat}&lon=${long}${apiCoor.key}`)
                .then(data => data.json())
                .then((result) => {
                    let data = new Date();

                    title.innerHTML = result.name;

                    let hh = setDoisDigitos(data.getHours());
                    let mm = setDoisDigitos(data.getMinutes());
                    let ss = setDoisDigitos(data.getSeconds());

                    hours.innerHTML = `${hh}:${mm}:${ss}`;
                })
        }, 1000)
    })
}

box.addEventListener('keypress', function (event) {
    clearInterval(timer);

    let city = box.value;

    if (event.keyCode == 13) {
        text.innerHTML = ' ';
        box.value = ' ';

        let title = document.createElement('p');
        title.className = 'title';
        text.appendChild(title);

        let hours = document.createElement('p');
        hours.className = 'hours';
        text.appendChild(hours);

        setInterval(function () {
            fetch(`${apiCoor.base}q=${city}${apiCoor.key}`)
                .then(data => data.json())
                .then(result => {
                    let l = result.coord.lat;
                    let lo = result.coord.lon;
                    let time = new Date();

                    fetch(`${apiTime}lat=${l}&long=${lo}`)
                        .then(data2 => data2.json())
                        .then(result2 => {
                            title.innerHTML = result.name;

                            time.setHours(time.getHours() + result2.timezone_offset);

                            let hh = setDoisDigitos(time.getHours());
                            let mm = setDoisDigitos(time.getMinutes());
                            let ss = setDoisDigitos(time.getSeconds());

                            hours.innerHTML = `${hh}:${mm}:${ss}`;
                        })
                })
        }, 1000)
    }
})