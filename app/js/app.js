window.addEventListener("DOMContentLoaded", (event) => {
 
    if(navigator.geolocation) {
      console.log('Geolocalisation OK')
      navigator.geolocation.getCurrentPosition(success);
    } 
    else {
      alert('Votre Geolocalisation est inactive')
    }
  });
  let a = 0;
  const header=document.querySelector('header')
  const positionHolder= document.createElement("div");
  const scoreText = document.createTextNode(`Score : ${a}`);
  const scoreHolder = document.createElement('p');
  
  scoreHolder.innerHTML = a;
  header.appendChild(scoreHolder)
  function success(pos) {
    const crd = pos.coords;
    const positionLat = `Latitude : ${crd.latitude}`;
    const positionLong = `Longitude : ${crd.longitude}`;
    const positionLatHolder = document.createElement('p');
    const positionLongHolder = document.createElement('p');
    positionLatHolder.innerHTML = positionLat;
    positionLongHolder.innerHTML = positionLong;
    header.appendChild(positionLatHolder)
    header.appendChild(positionLongHolder)
    const latitude = crd.latitude.toString();
    const longitude = crd.longitude.toString();

    function updateData(positionLatHolder,positionLongHolder){
      scoreHolder.innerHTML = a;
      positionLatHolder.innerHTML = positionLat;
      positionLongHolder.innerHTML = positionLong;
      console.log(updatedData)
    }
  
    setInterval(function(){ updateData(); }, 100);

    const mymap = L.map('mapid').setView([ latitude, longitude ], 13);
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    });
    mymap.addLayer(osmLayer);
    var treeIcon = L.icon({
      iconUrl: '../app/src/46564.svg',
      iconSize:     [10, 95], // size of the icon
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


    const myRequest = new Request('https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&rows=5000&facet=domanialite&facet=arrondissement&facet=libellefrancais&facet=circonferenceencm&facet=hauteurenm&facet=remarquable&geofilter.distance=48.8512725%2C+2.3800521%2C+1000');
    
  
  fetch(myRequest)
    .then(response => response.json())
    .then(data => {
      for (const tree of data.records) {
        const latitudeTree = tree.fields.geo_point_2d[0];
        const longitudeTree = tree.fields.geo_point_2d[1];
        L.marker([ latitudeTree, longitudeTree ], {icon: treeIcon}).addTo(mymap);
        var circle = L.circle([ latitudeTree, longitudeTree ], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.1,
          radius: 500
      }).addTo(mymap);
      }
      
    });

    
  }
  
  //SCORE STORAGE
  
  const buttonTest = document.querySelector("#button-test")
  buttonTest .addEventListener("click", AddScore)
  
  function AddScore(){
    var aUpdated = a++;
    console.log(aUpdated)
    localStorage.setItem('Score', a );
    scoreHolder.innerHTML = a
  }

  