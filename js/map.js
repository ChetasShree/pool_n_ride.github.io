'user strict';

if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(
    function (position){

        const{latitude}= position.coords;
        const{longitude}= position.coords;
        console.log("https://www.google.pt/maps/@$[latitude],$[longitude]");
        
        const coords =[latitude,longitude]
        const map = L.map('map',{gestureHandling:true}).setView(coords, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        map.on('click', function (mapEvent){
            console.log(mapEvent);
            // const {lat,lng}=mapEvent.latlng;
            L.marker(mapEvent.latlng).addTo(map).bindPopup('final Destination')
            .openPopup();

        
        });

        L.marker(coords).addTo(map)
            .bindPopup('You')
            .openPopup();
},function(){
    alert("could not get your position")
}
)
