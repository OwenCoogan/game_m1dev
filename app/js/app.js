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
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 20
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
    
        mymap.addLayer(osmLayer);
    console.log(mymap)
  }
 