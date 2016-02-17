(function() {
  "use strict";
  var viewer = new Cesium.Viewer("cesium");
  var scene = viewer.scene;

  viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(127.8040432, 26.3637929, 15000.0)
  });

}());
