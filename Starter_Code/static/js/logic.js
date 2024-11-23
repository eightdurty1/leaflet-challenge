// Map Initalization 
var myMap = L.map("map").setView([37.7749, -122.4194], 5)

//Tile Layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
}).addTo(myMap);

//Json earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    function markerSize(magnitude){
        return magnitude *4;
    }

    //function that determines color
    function markerColor(depth) {
        if (depth > 90) return "#ff5f65"; 
        if (depth > 70) return "#fca35d"; 
        if (depth > 50) return "#fdb72a"; 
        if (depth > 30) return "#f7db11"; 
        if (depth > 10) return "#dcf400"; 
        return "#a3f600";
    }
    //loops through data and gneerates markers
    data.features.forEach(function(feature){
        var coordinates = feature.geometry.coordinates;
        var properties = feature.properties;

        L.circleMarker([coordinates[1], coordinates[0]], {
            radius: markerSize(properties.mag),
            fillColor: markerColor(coordinates[2]),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8

        }).bindPopup(`<h3>${properties.place}</h3><hr><p>Magnitude: ${properties.mag}</p><p>Depth: ${coordinates[2]} km</p>`).addTo(myMap);
    }

    );
    //Adds legend to the
    var legend = L.control({ position: "bottomright" }); 
    legend.onAdd = function(map) { 
        var div = L.DomUtil.create("div", "info legend"); 
        var depths = [-10, 10, 30, 50, 70, 90]; 
        var colors = [ "#a3f600", 
            "#dcf400", 
            "#f7db11", 
            "#fdb72a", 
            "#fca35d", 
            "#ff5f65"
         ]; 
         for (var i = 0; i < depths.length; i++) { 
            div.innerHTML += 
            '<i style="background: ' + colors[i] + '"></i> ' +
             depths[i] + (depths[i + 1] ? '&ndash;' + 
                depths[i + 1] + '<br>' : '+'); } 
                return div; 
            }; 
            legend.addTo(myMap);






});