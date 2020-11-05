window.addEventListener("DOMContentLoaded", (event) => {
    


    fetch("https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&facet=typeemplacement&facet=domanialite&facet=arrondissement&facet=libellefrancais&facet=genre&facet=espece&facet=varieteoucultivar&facet=circonferenceencm&facet=hauteurenm&facet=stadedeveloppement&facet=remarquable")
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    .catch(error => alert("Erreur : " + error));
        
  });
 