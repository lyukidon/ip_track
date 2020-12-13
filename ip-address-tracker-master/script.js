let latitude = 37.26389; 
let longitude = 127.02861;

let map = L.map('mapid').setView([latitude, longitude], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


async function getLocation() {
    try {
        var ip = searchBox.value;
        var api_key = 'at_Rm4kWxveRDb2wG1wINleU58ZvA5kE';
        var api_url = 'https://geo.ipify.org/api/v1?';
        var url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        document.getElementById('ipAddress').innerHTML = searchBox.value;
        document.getElementById('location').innerHTML = data.location.region+', '+data.location.country+', '+data.location.postalCode;
        time.innerHTML = 'UTC'+data.location.timezone;
        document.getElementById('isp').innerHTML = data.isp;

        L.marker([data.location.lat, data.location.lng]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    }catch(err){
        console.log(err);
    }
}

submitBox.addEventListener('click',getLocation)