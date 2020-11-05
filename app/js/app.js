if(navigator.geolocation) {
    console.log('Geolocalisation OK')
    console.log(navigator.geolocation.getCurrentPosition);
    fetch("https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&facet=typeemplacement&facet=domanialite&facet=arrondissement&facet=genre&facet=espece&facet=varieteoucultivar&facet=circonferenceencm&facet=hauteurenm&facet=stadedeveloppement")
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    .catch(error => alert("Erreur : " + error));
   

  } else {
    // Pas de support, proposer une alternative ?
  }