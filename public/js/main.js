(function() {
  "use strict";

　// 明るさなどを設定
  var viewModel = {
    brightness: 2.0,
    contrast: 1,
    hue: 3,
    saturation: 0,
    gamma: 1
  };
/**
  var elem = document.getElementById('cesium');
  var two = new Two({width:285, height:200}).appendTo(elem);
  var circle = two.makeCircle(-70, 0, 50);
  var okinawa_circle = two.makeCircle(70, 0, 100);
  circle.fill = '#FF8000';
  circle.stroke = 'orangered';

  okinawa_circle.fill = '#FF8000';
  okinawa_circle.stroke = 'orangered';


  // Groups can take an array of shapes and/or groups.
  var group = two.makeGroup(circle, okinawa_circle);

  // And have translation, rotation, scale like all shapes.
  group.translation.set(two.width / 2, two.height / 2);
  group.rotation = Math.PI;
  group.scale = 0.75;

  // You can also set the same properties a shape have.
  group.linewidth = 7;

  two.update();

**/

  // 色んな地点を登録
  var viewPointsArray=[];
  viewPointsArray[0]=new viewPoints("普天間基地",34.39548333333333,132.4535916666667,0,-60,200);
  viewPointsArray[1]=new viewPoints("嘉手納基地",34.3927249,132.4524912,0,-60,600);

  // Street View上に配置する何か
  var sound = document.getElementById('acontrol');
  $("#acontrol").hide();
  $(".btn-return").hide();

  // 音声ファイルの読み込み
  var kadenaAudio = new Audio("/audio/Kadena_FA18.m4a");
  kadenaAudio.volume = 1;
  kadenaAudio.loop = false;

  var futenmaAudio = new Audio("/audio/Futenma_Osprey1230.m4a");
  futenmaAudio.volume = 1;
  futenmaAudio.loop = false;

  var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'black',
    progressColor: 'white'
  });
  wavesurfer.load('/audio/Kadena_FA18.m4a');
  wavesurfer.on('ready', function () {
  wavesurfer.play();
});

  var sv = new google.maps.StreetViewService();
  var svp = '';

  $(function() {
    $('.cesium-widget-credits').css('display', 'none');
    //$('.cesium-viewer-animationContainer').css('display', 'none');
    //$('.cesium-viewer-timelineContainer').css('display', 'none');
    //$('.cesium-viewer-fullscreenContainer').css('display', 'none');
    $('.cesium-viewer-toolbar').css('display', 'none');
  });

  var viewer = new Cesium.Viewer("cesium");

  var pinBuilder = new Cesium.PinBuilder();
  var bluePin = viewer.entities.add({
      id: 1,
      name : '普天間基地',
      position : Cesium.Cartesian3.fromDegrees(127.7729728, 26.2857773),
      billboard : {
          image : pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
          verticalOrigin : Cesium.VerticalOrigin.BOTTOM
      }
  });

  var scene = viewer.scene;

  viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(135.8421549, 37.9210939, 5000000.0)
  });

  setTimeout(function(){
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(127.7729728, 26.2857773, 300000.0)
    });
  }, 5000);

  function viewPoints(_label, _lat, _lng, _heading, _pitch, _range) {
	  this.label = _label;
	  this.lat = _lat;
    this.lng = _lng;
	  this.heading = _heading;
	  this.pitch = _pitch;
	  this.range = _range;
  }

  function changeViewPoint(num, delay) {
     var newLat = viewPointsArray[num].lat;
	   var newLng = viewPointsArray[num].lng;
	   var newHeading = Cesium.Math.toRadians(viewPointsArray[num].heading);
	   var newPitch = Cesium.Math.toRadians(viewPointsArray[num].pitch);
	   var newRange = viewPointsArray[num].range;
	   var center = Cesium.Cartesian3.fromDegrees(newLng, newLat);
     var boundingSphere = new Cesium.BoundingSphere(center, newRange);
	   var headingPitchRange = new Cesium.HeadingPitchRange(newHeading, newPitch, newRange);
     viewer.camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
	   viewer.camera.flyToBoundingSphere(boundingSphere,{
		   duration : delay,
		   offset : headingPitchRange,
		   easingFunction: Cesium.EasingFunction.CUBIC_IN_OUT
	   });
  }

  var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(
	function(movement){
		var billBoard = scene.pick(movement.position);
		if (billBoard) {
			flyTo(billBoard);
		}
	},
	Cesium.ScreenSpaceEventType.LEFT_CLICK);

  function flyTo(photoBillBoard) {
    var photoFov = 2 * photoBillBoard.id.fov;
    var position = photoBillBoard.id.position._value;
    streetViewPos = position;
    var heading = photoBillBoard.id.heading;
     streetViewHeading = heading;
    var pitch = photoBillBoard.id.pitch;
    var roll = photoBillBoard.id.roll;
    var photoUrl = photoBillBoard.id.photoUrl;
    //var description = photoBillBoard.id._description._value;
    var fov = 2 * photoBillBoard.id.fov;
    //cameraPosWC = [viewer.camera.positionWC.x,viewer.camera.positionWC.y,viewer.camera.positionWC.z];
    //cameraOrientation = [viewer.camera.heading,viewer.camera.pitch,viewer.camera.roll,fov];
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(127.7729728, 26.2857773, 10.0)
    });

    setTimeout(function(){
			console.log('aaaa');
      streetView();
      $("#acontrol").show();
      $(".btn-return").show();

      sound.currentTime = 0;
      sound.play();
		}, 3000);
  }
  var streetViewDiv = document.getElementById("sv");
  var streetViewPos = {x:0,y:0,x:0};
  var streetViewHeading = 0;

  function streetView() {
    streetViewDiv.innerHTML = null;
	  var cart = Cesium.Ellipsoid.WGS84.cartesianToCartographic(streetViewPos);
	  var latlng = new google.maps.LatLng(Cesium.Math.toDegrees(cart.latitude), Cesium.Math.toDegrees(cart.longitude));

	  var streetViewOptions = {
		  enableCloseButton:false,
		  addressControl:false,
		  panControl:true,
		  panControlOptions:{
			  position:google.maps.ControlPosition.TOP_CENTER
		  },
		  zoomControl:false,
	  };

	  sv.getPanoramaByLocation(latlng, 200,
		  function (data, status) {
			  if (status != google.maps.StreetViewStatus.OK) {
				  svNotAvailable.innerHTML = '<p class="errorMessage">この場所のストリートビューは利用できません</p>';
				  fadeInOut(svNotAvailable,1);
				  setTimeout('fadeInOut(svNotAvailable,0)',1500);
			  } else {
          $('#cesium').fadeOut("slow");
				  svp = new google.maps.StreetViewPanorama(
					  streetViewDiv,{
						  position : data.location.latLng,
						  pov : {
							  heading : 140.11,
							  pitch : 3,
							  zoom : 1
						  }
					  });
				  svp.setOptions(streetViewOptions);
          svp.setVisible(true);
			  }
	    }
  );

  $(".btn-return").on('click', function() {
    $("#acontrol").hide();
    $(".btn-return").hide();
    sound.pause();

    $('#cesium').fadeIn("slow");
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(127.7729728, 26.2857773, 300000.0)
    });
  });
}

}());
