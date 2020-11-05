window.addEventListener("DOMContentLoaded", (event) => {
    
    if(navigator.geolocation) {
      console.log('Geolocalisation OK')
      navigator.geolocation.getCurrentPosition(success);
    } 
    else {
      alert('Votre Geolocalisation est inactive')
    }
  });

  function success(pos) {
    var crd = pos.coords;
    console.log('Votre position actuelle est :');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    const latitude = crd.latitude.toString();
    const longitude = crd.longitude.toString();
    const mymap = L.map('mapid').setView([ latitude, longitude ], 13);
   
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    });
    mymap.addLayer(osmLayer);
    var treeIcon = L.icon({
      iconUrl: '../app/src/46564.svg',
      iconSize:     [38, 95], // size of the icon
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var gpsIcon = L.icon({
      iconUrl: '../app/src/location-pointer.svg',
      iconSize:     [38, 95], // size of the icon
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker([ latitude, longitude ], {icon: gpsIcon}).addTo(mymap);
        
  }
 