var map;
var infowindow;

$(document).ready(function () {
    initMap();
});

function initMap() {

    var location = new google.maps.LatLng(39.5, -98.35);

    var mapCanvas = $('#map');
    var mapOptions = {
        center: location,
        panControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 4
    };
    map = new google.maps.Map(mapCanvas[0], mapOptions);

    infowindow = new google.maps.InfoWindow({
        maxWidth: 200
    });


    var res = [
        //{
        //    name: "Milestone Foundation",
        //    location: {lat:43.661471, lng: -70.2553259},
        //    city: "Portland Maine"
        //},
        {
            name: "Yukon Kuskokwim Health Corporation Sobering Center",
            location: {lat:60.7922222, lng: -161.7558333},
            city: "Bethel Alaska"
        },
        {
            name: "Volunteers of America Sobering Center/Serial Inebriate Program",
            location: {lat:32.715738, lng:-117.1610838},
            city: "San Diego California"
        }
        ];
    for (var i = 0; i < res.length; i++) {
        console.log(res[i]);
        createMarker(res[i]);
    }

}
function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.location,
    });

    marker.addListener("click", function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    })
}


