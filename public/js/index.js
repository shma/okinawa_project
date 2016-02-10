var kadenaAudio = new Audio("/audio/Kadena_FA18.m4a");
kadenaAudio.volume = 1;
kadenaAudio.loop = false;

var futenmaAudio = new Audio("/audio/Futenma_Osprey1230.m4a");
futenmaAudio.volume = 1;
futenmaAudio.loop = false;


var stylez = [
  {
    "stylers": [
      { "saturation": -80 },
      { "gamma": 1.11 },
      { "visibility": "on" },
      { "invert_lightness": true }
    ]
    },{
      "featureType": "all",
      "elementType": "labels",
      "stylers": [
       { visibility: "off" }
      ]
    },
    {
    "featureType": "water",
    "stylers": [
      { "color": "#fefefe" }
    ]
    },{
    "featureType": "road",
    "stylers": [
      { "visibility": "off" },
      { "color": "#000000" }
    ]
    },{
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" },
      { "color": "#000000" }
    ]
  }
];

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 26.3280916, lng: 127.7988999},
    styles: stylez,
    zoom: 10,
    streetViewControl: true
  });

  var futenmaBounds = {
    north: 26.287578,
    south: 26.264,
    east: 127.7776,
    west: 127.7414
  };

  var kadenaBounds = {
    north: 26.369,
    south: 26.32809163,
    east: 127.81,
    west: 127.744
  };

  futenmaOverlay = new google.maps.GroundOverlay(
    '/img/futenma.png',
    futenmaBounds);
  futenmaOverlay.setMap(map);

  kadenaOverlay = new google.maps.GroundOverlay(
    '/img/kadena.png',
    kadenaBounds);
  kadenaOverlay.setMap(map);

  var panorama;
  var futenma = {lat: 26.2857773, lng: 127.7729728};
  futenmaOverlay.addListener('click', function() {
    console.log('aaaa');
    futenmaAudio.play();

    map.panToBounds(futenma);
/**
    panorama = map.getStreetView();


      panorama.setPosition(futenma);
      panorama.setPov(/** @type {google.maps.StreetViewPov} *//**({

        heading: 140.11,
        pitch: 3
      }));
    panorama.setVisible(true);

    **/
  });

  kadenaOverlay.addListener('click', function() {
    console.log('aaaa');
    kadenaAudio.play();

    panorama = map.getStreetView();
      panorama.setPosition(futenma);
      panorama.setPov(/** @type {google.maps.StreetViewPov} */({
        heading: 140.11,
        pitch: 3
      }));
    panorama.setVisible(true);
  });
}
