window.addEventListener("DOMContentLoaded", (event) => {
    //Map Management
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

    // UPDATE SCORE AND POSITION

    const latitude = crd.latitude.toString();
    const longitude = crd.longitude.toString();
    const TreeCount = "100"
    function updateData(positionLatHolder,positionLongHolder){
      scoreHolder.innerHTML = a;
      positionLatHolder.innerHTML = positionLat;
      positionLongHolder.innerHTML = positionLong;
    }
    const mymap = L.map('mapid').setView([ latitude, longitude ], 13);
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    });
    mymap.addLayer(osmLayer);
    var treeIcon = L.divIcon({className: 'treeIcon'});
    var gpsIcon = L.icon({
      iconUrl: '../app/src/location-pointer.svg',
      iconSize:     [38, 95], // size of the icon
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker([ latitude, longitude ], {icon: gpsIcon}).addTo(mymap);

    //API Call

    const requestURL = "https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&rows=5000&facet=domanialite&facet=arrondissement&facet=libellefrancais&facet=circonferenceencm&facet=hauteurenm&facet=remarquable&geofilter.distance=" + latitude + "%2C" + longitude + "%2C+" + TreeCount;

    // Fausse URL ( Pas de datas sur le Val d'oise ;) )
    const FakerequestURL = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&rows=5000&facet=domanialite&facet=arrondissement&facet=libellefrancais&facet=circonferenceencm&facet=hauteurenm&facet=remarquable&geofilter.distance=48.8512725%2C+2.3800521%2C+'+TreeCount;


    const myRequest = new Request(FakerequestURL);
    fetch(myRequest)
    .then(response => response.json())
    .then(data => {
      for (const tree of data.records) {
        const latitudeTree = tree.fields.geo_point_2d[0];
        const longitudeTree = tree.fields.geo_point_2d[1];
        L.marker([ latitudeTree, longitudeTree ], {icon: treeIcon}).addTo(mymap);
        var circle = L.circle([ latitudeTree, longitudeTree ], {
          color: 'green',
          fillColor: 'transparent',
          fillOpacity: 0.1,
          radius: 50
        }).addTo(mymap)
      .on('click',function(){
        AddScore(circle);
      });
      }
    });
  }
  
  //SCORE STORAGE
  
  function AddScore(circle){
    if(!circle.classList.contains("checked-zone")){
      var aUpdated = a++;
      console.log(aUpdated)
      localStorage.setItem('Score', a );
      scoreHolder.innerHTML = a; 
    }
    else{
    }
  }


  // DRAW ZONES

  





  