
const api_url = "https://geo.ipify.org/api/v2/country?apiKey=at_vMXW8jlrTtq9MoyjXol3dGSL6T3T9&ipAddress=8.8.8.8"
//targeting results
const current_ip = document.getElementById("current_ip")
const current_loc = document.getElementById("current_loc")
const current_time = document.getElementById("current_time") 
const current_isp = document.getElementById("current_isp")

//targeting form
const entered_ip = document.getElementById("input")
const btn = document.getElementById("search_btn")


//function retuning controls of map and setting map to div
const map = L.map('map', {
    'center': [0,0],
    'zoom': 2,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})

//add and update marker
updateMarker = (update_marker = [-33.665, 18.993]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

document.addEventListener('load', updateMarker())


getIpDetails = (defaultIp) =>{
if(defaultIp == undefined){
   var ip_url =  "https://geo.ipify.org/api/v2/country,city?apiKey=at_vMXW8jlrTtq9MoyjXol3dGSL6T3T9"
}
else{
    var ip_url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_vMXW8jlrTtq9MoyjXol3dGSL6T3T9&ipAddress=${defaultIp}`
}

fetch(ip_url).then(results => results.json)
.then(
    data => {
        current_ip.innerHTML = data.ip
        console.log(data.ip)
        current_loc.innerHTML =  data.location.country
        current_time.innerHTML = data.location.timezone
        current_isp.innerHTML = data.isp

        updateMarker([data.location.lat, data.location.lng])
    }
    
)
}

    search_btn.addEventListener('click',e=>{
    e.preventDefault()

    if (entered_ip.value != '' && entered_ip.value != null) {
        getIPDetails(entered_ip.value)
        return
    }
    alert("Please enter a valid IP address");


   
        alert('Please enter a valid IP address')
    
})