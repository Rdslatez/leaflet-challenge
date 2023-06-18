// Create a map object.
let myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
});

 // Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson'

var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depths</h4>";
  div.innerHTML += '<i style="background: #8B0000"></i><span>100+</span><br>';
  div.innerHTML += '<i style="background: #FF0000"></i><span>90-100</span><br>';
  div.innerHTML += '<i style="background: #FF8C00"></i><span>80-90</span><br>';
  div.innerHTML += '<i style="background: #FFA500"></i><span>70-80</span><br>';
  div.innerHTML += '<i style="background: #FFFF00"></i><span>60-70</span><br>';
  div.innerHTML += '<i style="background: #9ACD32"></i><span>50-60</span><br>';
  div.innerHTML += '<i style="background: #008000"></i><span>40-50</span><br>';
  div.innerHTML += '<i style="background: #32CD32"></i><span>30-40</span><br>';
  div.innerHTML += '<i style="background: #7CFC00"></i><span>20-30</span><br>';
  div.innerHTML += '<i style="background: #90EE90"></i><span>10-20</span><br>';
  div.innerHTML += '<i style="background: #98FB98"></i><span>-10</span><br>';
  return div;
};

legend.addTo(myMap);


d3.json(url).then(function(response) {
    let data = response.features
    for (let i = 0; i < data.length; i++){
        
        let depth = data[i].geometry.coordinates[2]
        let color = "";
        if (depth > 100){
            color = "darkred"
        }
        else if (depth > 90){
            color = "red"
        }
        else if (depth > 80){
            color = "darkorange"
        }
        else if (depth > 70){
            color = "orange"
        }
        else if (depth > 60){
            color = "yellow"
        }
        else if (depth > 50){
            color = "yellowgreen"
        }
        else if (depth > 40){
            color = "green"
        }
        else if (depth > 30){
            color = "limegreen"
        }
        else if (depth > 20){
            color = "lawngreen"
        }
        else if (depth > 10){
            color = "lightgreen"
        }
        else {
            color = "palegreen"
        }
        console.log(depth)
        coords = L.GeoJSON.coordsToLatLng(data[i].geometry.coordinates)
        let magnitude = data[i].properties.mag
        L.circle(coords, {
            fillOpacity: .75,
            color: color,
            radius: magnitude * 10000
        }).bindPopup(`<h3>Magnitude: ${magnitude}</h3> <h3>location: ${data[i].geometry.coordinates[1]}, ${data[i].geometry.coordinates[0]}</h3> <h3>Depth: ${depth}</h3>`).addTo(myMap);
        
    }

})
