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



  // Street View上に配置する何か
  $("#waveform").hide();
  $(".btn-return").hide();

  var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'black',
    progressColor: 'white',
    height:200,
    normalize: true
  });

  // Street Viewを設定する変数
  var sv = new google.maps.StreetViewService();
  var svp = '';

  $(function() {
    $('.cesium-widget-credits').css('display', 'none');
    $('.cesium-viewer-animationContainer').css('display', 'none');
    $('.cesium-viewer-timelineContainer').css('display', 'none');
    $('.cesium-viewer-fullscreenContainer').css('display', 'none');
    $('.cesium-viewer-toolbar').css('display', 'none');
  });

  var viewer = new Cesium.Viewer("cesium");
  var scene = viewer.scene;


  //$("#desc1").velocity("fadeIn", { duration: 1500 }).delay(3000).velocity("fadeOut", { duration: 1500 });
  //$("#desc2").delay(7000).velocity("fadeIn", { duration: 1500 }).delay(3000).velocity("fadeOut", { duration: 1500 });
  $("#toptitle").delay(0).velocity("fadeIn", { duration: 1000 }).velocity("fadeOut", { duration: 5000 })
  .velocity({complete: function() {
    $("#intro").fadeOut();
    $("#head").velocity("fadeIn", { duration: 1500 });
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(135.9029728, 24.6757773, 1600000.0),
      orientation : {
                     pitch : Cesium.Math.toRadians(-50.0)
                    },
      complete : function() {
           setTimeout(function() {
             viewer.camera.flyTo({
               duration: 5,
               destination : Cesium.Cartesian3.fromDegrees(127.9029728, 15.6757773, 1600000.0),
               orientation : {
                              pitch : Cesium.Math.toRadians(-50.0)
                            },
               complete : function() {
                 viewer.camera.flyTo({
                  destination : Cesium.Cartesian3.fromDegrees(127.9029728, 25.6757773, 100000.0),
                  orientation : {
                                 pitch : Cesium.Math.toRadians(-50.0)
                               },
                  complete: function() {
                    // 基地の情報をマッピングします

                    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('/json/base.json', {
                          stroke: Cesium.Color.AQUA,
                          fill: Cesium.Color.AQUA.withAlpha(0.5),
                          strokeWidth: 3
                    }));

                    viewer.entities.add({
                          id: 0,
                          name : 'オキナワ・サウンドデータ1（道の駅かでな）',
                          file : '20121127_Kaneda_FA18.mp3',
                          position : Cesium.Cartesian3.fromDegrees(127.7739129, 26.3677858),
                          type: 'noise',
                          point : {
                               color : Cesium.Color.RED,
                               pixelSize : 5,
                               translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2)
                           }
                    });
                    viewer.entities.add({
                          id: 1,
                          name : 'オキナワ・サウンドデータ２（森川公園）',
                          file : '20121128_Morikawa_CH53.mp3',
                          position : Cesium.Cartesian3.fromDegrees(127.7403736, 26.2704817),
                          type: 'noise',
                          point : {
                               color : Cesium.Color.RED,
                               pixelSize : 5,
                               translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2)
                           }
                    });
                    viewer.entities.add({
                          id: 2,
                          name : 'オキナワ・サウンドデータ３（新城・ヘリ）',
                          file : '20151124_Arashiro_CH53.mp3',
                          position : Cesium.Cartesian3.fromDegrees(127.7721311, 26.2853835),
                          type: 'noise',
                          point : {
                               color : Cesium.Color.RED,
                               pixelSize : 5,
                               translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2)
                           }
                    });
                    viewer.entities.add({
                          id: 3,
                          name : 'オキナワ・サウンドデータ４（新城・オスプレイMV22）',
                          file : '20151124_Arashiro_MV22.mp3',
                          position : Cesium.Cartesian3.fromDegrees(127.7717827, 26.2856498),
                          type: 'noise',
                          point : {
                               color : Cesium.Color.RED,
                               pixelSize : 5,
                               translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2)
                           }
                    });
                    viewer.entities.add({
                          id: 4,
                          name : 'オキナワ・サウンドデータ５（砂辺、子供１）',
                          file : '20160105_Kadena_Child1.mp3',
                          position : Cesium.Cartesian3.fromDegrees(127.7411702, 26.3546692),
                          type: 'noise',
                          point : {
                               color : Cesium.Color.RED,
                               pixelSize : 5,
                               translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2)
                           }
                    });
                    viewer.entities.add({
                          id: 5,
                          name : 'オキナワ・サウンドデータ６（砂辺、子供２）',
                          file : '20160105_Kadena_Child2.mp3',
                          position : Cesium.Cartesian3.fromDegrees(127.7434518, 26.3539902),
                          type: 'noise',
                          point : {
                               color : Cesium.Color.RED,
                               pixelSize : 5,
                               translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2)
                           }
                    });

                    viewer.entities.add({
                          id: 6,
                          name : 'オキナワ・サウンドデータ７（上大謝名、オスプレイMV22）',
                          file : '20160105_Ueojana_MV22.mp3',
                          position : Cesium.Cartesian3.fromDegrees(127.7400556, 26.2631028),
                          type: 'noise',
                          point : {
                               color : Cesium.Color.RED,
                               pixelSize : 5,
                               translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2)
                           }
                    });


                  }
                 });
               }
             });
           }, 500);
       }
    });
  }})

  // 色んな地点を登録
  var viewPointsArray=[];
  viewPointsArray[0]=new viewPoints("オキナワ・サウンドデータ1（道の駅かでな）", 26.3677858,127.7739129,-160.0,-20,0);
  viewPointsArray[1]=new viewPoints("オキナワ・サウンドデータ２（森川公園）", 26.2704817,127.7403736,70,-20,0);
  viewPointsArray[2]=new viewPoints("オキナワ・サウンドデータ３（新城・ヘリ）", 26.2853835,127.7721311,-140.0,-20,0);
  viewPointsArray[3]=new viewPoints("オキナワ・サウンドデータ４（新城・オスプレイMV22）", 26.2856498,127.7717827,-140.0,-20,0);
  viewPointsArray[4]=new viewPoints("オキナワ・サウンドデータ５（砂辺、子供１）",26.3546692,127.7411702,90.0,-20,0);
  viewPointsArray[5]=new viewPoints("オキナワ・サウンドデータ６（砂辺、子供２）",26.3539902,127.7434518,90.0,-20,0);
  viewPointsArray[6]=new viewPoints("オキナワ・サウンドデータ７（上大謝名、オスプレイMV22）",26.2631028,127.7400556,40.0,-20.0,0);

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

    if (billBoard.id.type == "noise") {
      var position = billBoard.id.position._value;

      viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(viewPointsArray[billBoard.id.id].lng, viewPointsArray[billBoard.id.id].lat, 1000.0),
        complete : function() {
          viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(viewPointsArray[billBoard.id.id].lng, viewPointsArray[billBoard.id.id].lat, 200.0),
            orientation : {
              heading : Cesium.Math.toRadians(viewPointsArray[billBoard.id.id].heading),
              pitch : Cesium.Math.toRadians(viewPointsArray[billBoard.id.id].pitch),
            },
            complete : function() {
              flyTo(billBoard);
            }
          })
        }
      });
		}
	},　Cesium.ScreenSpaceEventType.LEFT_CLICK);

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

      streetView();
      $("#wavedesc").text(photoBillBoard.id.name);
      $("#waveform").show();
      wavesurfer.load('/audio/'+ photoBillBoard.id.file);
      wavesurfer.on('ready', function () {
        wavesurfer.play();
      });
      $(".btn-return").show();
  }

  var streetViewDiv = document.getElementById("sv");
  var streetViewPos = {x:0,y:0,x:0};
  var streetViewHeading = 0;

  // 上に向くカウントアップ
  var c = 0;

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
          c = 0;
          setInterval(up, 500);
			  }
	    }
  );

  var up = function() {
    if (c == 0) {
      svp.setOptions({
        pov: {
          heading: 140.11,
          pitch : 5,
          zoom : 1
        }
      });
    }
    if (c == 1) {
      svp.setOptions({
        pov: {
          heading: 140.11,
          pitch : 10,
          zoom : 1
        }
      });
    }
    if (c == 2) {
      svp.setOptions({
        pov: {
          heading: 140.11,
          pitch : 15,
          zoom : 1
        }
      });
    }
    if (c == 3) {
      svp.setOptions({
        pov: {
          heading: 140.11,
          pitch : 15,
          zoom : 1
        }
      });
    }
    if (c == 4) {
      svp.setOptions({
        pov: {
          heading: 140.11,
          pitch : 20,
          zoom : 1
        }
      });
    }
    if (c == 5) {
      svp.setOptions({
        pov: {
          heading: 140.11,
          pitch : 25,
          zoom : 1
        }
      });
    }
    if (c == 6) {
      svp.setOptions({
        pov: {
          heading: 140.11,
          pitch : 30,
          zoom : 1
        }
      });
    }
    c++;
  }

  $(".btn-return").on('click', function() {
    c = 0;
    clearInterval(up);
    $("#waveform").hide();
    $(".btn-return").hide();

    $('#cesium').fadeIn("slow");
    wavesurfer.pause();
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(127.9029728, 25.6757773, 100000.0),
      orientation : {
                      pitch : Cesium.Math.toRadians(-50.0)
                    }
    });
  });
}
}());
