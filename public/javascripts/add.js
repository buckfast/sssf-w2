"use strict";

document.addEventListener("DOMContentLoaded", (event) => {
    initMap();
    //changeMarkerPos({lat: 44, lng: 44});
    google.maps.event.addListener(map, 'click', (event) => {
      changeMarkerPos({lat: event.latLng.lat(), lng: event.latLng.lng()}, false) ;
      document.getElementById("lat").value = event.latLng.lat();
      document.getElementById("lng").value = event.latLng.lng();
    });
});
