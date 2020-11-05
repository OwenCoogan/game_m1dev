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

    const myRequest = new Request('https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&facet=typeemplacement&facet=domanialite&facet=arrondissement&facet=libellefrancais&facet=genre&facet=espece&facet=varieteoucultivar&facet=circonferenceencm&facet=hauteurenm&facet=stadedeveloppement&facet=remarquable');

  fetch(myRequest)
    .then(response => response.json())
    .then(data => {
      for (const tree of data.records) {
        console.log(tree)
        const latitudeTree = tree.fields.geo_point_2d[0];
        const longitudeTree = tree.fields.geo_point_2d[1];
        L.marker([ latitudeTree, longitudeTree ], {icon: treeIcon}).addTo(mymap);
      }
  });

  }
 