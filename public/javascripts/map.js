let map;
let marker;

 const initMap = () => {
  const pos = {lat: 60, lng: 25};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: pos
  });
  marker = new google.maps.Marker({
    position: pos,
    map: map
  });
}

const changeMarkerPos = (coordinates, setZoom) => {
  console.log("changemarkerpos");
  console.log(coordinates);
  console.log("\n");
    const latlng = new google.maps.LatLng(coordinates.lat, coordinates.lng);
    marker.setPosition(latlng);
    if (setZoom) {
      map.setZoom(6);
    }
    map.setCenter(latlng);
}
