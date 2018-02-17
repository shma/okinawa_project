"use strict";

function initMap() {
    Cesium.BingMapsApi.defaultKey = "Ar0B0yEfBTt6pqUyvlE2ARKYOl7wti2Klk04EVMBZE0mA8B5cKcm4ILrZPi2P2bd"
    var sv = new google.maps.StreetViewService();
    var svp = '';

    // Street View上に配置するオブジェクト
    $("#waveform").hide();
    $(".btn-play").hide();
    $(".btn-return").hide();
    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'black',
        progressColor: 'white',
        height: 200,
    });

    var getDevice = (function() {
        var ua = navigator.userAgent;
        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
            return 'sp';
        } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
            return 'tab';
        } else {
            return 'other';
        }
    })();

    var pointsize = 40;
    if (getDevice == 'sp') {
        pointsize = 20;
    }

    var viewer = new Cesium.Viewer("cesium");
    var scene = viewer.scene;

    var stamenTonerImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[11];
    var normalImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[0];
    viewer.baseLayerPicker.viewModel.selectedImagery = stamenTonerImagery;

    //データが入ります。
    var viewPointsArray = [];
    viewPointsArray[0] = new viewPoints("2012年11月27日18:10録音, 嘉手納, F15戦闘機", "recorded 13:30 November 27 2012 at Kadena, F15", "2012_kadena_f15_2.mp3", 26.3677948, 127.7739129, 190.6, 5, 300)
    viewPointsArray[1] = new viewPoints("2012年11月28日16:00録音, 森川公園", "recorded 16:00 November 28, 2012 at Morikawa Park", "2012_morikawa_ch46.mp3", 26.2713147, 127.7407946, 155.77, 5, 300)
    viewPointsArray[2] = new viewPoints("2015年11月24日18:15録音, 新城, オスプレイ", "recorded 18:15 November 24, 2015 at Arashiro, MV22", "151124_arashiro_osprey.mp3", 26.2857332, 127.7718912, 142.19, 5, 300)
    viewPointsArray[3] = new viewPoints("2016年1月5日10:40録音, 兼久", "recorded 10:40 January 5, 2016 at Kaneku", "160105_kaneku_kodomo.mp3", 26.3547976, 127.7420361, 259.47, 5, 300)
    viewPointsArray[4] = new viewPoints("2016年1月5日18:10録音, 上大謝名, オスプレイ", "recorded 18:10 January 5, 2016 at Ue-Ojana, MV-22", "160105_ueojana_osprey.mp3", 26.2629626, 127.7402643, 107.43, 5, 300)
    viewPointsArray[5] = new viewPoints("2016年8月9日19:23録音、高江、MV-22 オスプレイ", "recorded 19:23 August 9th 2016 at Takae, MV-22 Osprey", "160809_arakawa_zuku_osprey.mp3", 26.6799939, 128.242844, 215.29, 5, 300)
    viewPointsArray[6] = new viewPoints("2017年3月30日15:40録音、砂辺、戦闘機", "recorded 15:40 March 30th 2017 at Sunabe, Fighters", "170330_sunabepark.mp3", 26.3334472, 127.7453168, 35.32, 5, 300)



    $("#toptitle").delay(0).velocity("fadeIn", { duration: 1000 }).velocity("fadeOut", { duration: 2000 })
        .velocity({
            complete: function() {
                $("#intro").fadeOut();

                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(135.9029728, 24.6757773, 1600000.0),
                    orientation: {
                        pitch: Cesium.Math.toRadians(-50.0)
                    },
                    complete: function() {
                        viewer.camera.flyTo({
                            duration: 5,
                            destination: Cesium.Cartesian3.fromDegrees(127.9029728, 15.6757773, 1600000.0),
                            orientation: {
                                pitch: Cesium.Math.toRadians(-50.0)
                            },
                            complete: function() {
                                viewer.camera.flyTo({
                                    destination: Cesium.Cartesian3.fromDegrees(127.9029728, 25.8057773, 73000.0),
                                    orientation: {
                                        pitch: Cesium.Math.toRadians(-50.0)
                                    },
                                    complete: function() {
                                        viewer.dataSources.add(Cesium.GeoJsonDataSource.load('/json/base.json', {
                                            stroke: Cesium.Color.BLACK,
                                            fill: Cesium.Color.BLACK.withAlpha(0.7),
                                            strokeWidth: 1
                                        }));

                                        $("#intro").delay(3000).velocity("fadeIn", { duration: 1500 }).velocity({
                                            complete: function() {
                                                setTimeout(function() { viewer.baseLayerPicker.viewModel.selectedImagery = normalImagery; }, 100);
                                            }
                                        });

                                        $("#desc3").delay(3000).velocity("fadeIn", { duration: 1500 }).delay(3000).velocity("fadeOut", { duration: 1500 })
                                            .velocity({
                                                complete: function() {
                                                    $("#intro").fadeOut();
                                                    $("#head").velocity("fadeIn", { duration: 1500 });
                                                    $("#foot").velocity("fadeIn", { duration: 1500 });
                                                    setTimeout(function() {
                                                        // 地点を登録
                                                        viewPointsArray.map(function(value, index) {
                                                            viewer.entities.add({
                                                                id: index,
                                                                name: value.label,
                                                                name_en: value.label_en,
                                                                file: value.mp3,
                                                                heading: value.heading,
                                                                position: Cesium.Cartesian3.fromDegrees(value.lng, value.lat, value.range),
                                                                type: 'noise',
                                                                point: {
                                                                    color: Cesium.Color.RED.withAlpha(0.4),
                                                                    pixelSize: pointsize,
                                                                    translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2)
                                                                }
                                                            });
                                                        })
                                                    }, 1000);
                                                }
                                            });
                                    }
                                })
                            }
                        });
                    }
                });
            }
        });

    function viewPoints(_label, _label_en, _mp3, _lat, _lng, _heading, _pitch, _range) {
        this.label = _label;
        this.label_en = _label_en;
        this.mp3 = _mp3;
        this.lat = _lat;
        this.lng = _lng;
        this.heading = _heading;
        this.pitch = _pitch;
        this.range = _range;
    }

    function flyTo(photoBillBoard) {
        var photoFov = 2 * photoBillBoard.id.fov;
        var position = photoBillBoard.id.position._value;
        streetViewPos = position;

        var heading = photoBillBoard.id.heading;
        streetViewHeading = heading;


        var pitch = photoBillBoard.id.pitch;
        var roll = photoBillBoard.id.roll;
        var photoUrl = photoBillBoard.id.photoUrl;
        var fov = 2 * photoBillBoard.id.fov;

        streetView(heading);
        $("#wavedesc").text(photoBillBoard.id.name);
        $("#wavedesc_en").text(photoBillBoard.id.name_en);
        $("#waveform").show();
        wavesurfer.load('/audio/' + photoBillBoard.id.file);
        wavesurfer.on('ready', function() {
            wavesurfer.play();
        });

        wavesurfer.on('finish', function() {
            $("#waveform").hide();
            $(".btn-return").hide();
            $(".btn-play").hide();

            $('#foot').fadeIn("slow");
            $('#cesium').fadeIn("slow");
            wavesurfer.pause();
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(127.9029728, 25.8057773, 80000.0),
                orientation: {
                    pitch: Cesium.Math.toRadians(-50.0)
                }
            });
        });

        $(".btn-return").show();
        if (getDevice == 'sp') {
            $(".btn-play").show();
        }
    }

    var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(
        function(movement) {
            var billBoard = scene.pick(movement.position);

            if (billBoard == undefined) {
                return
            }

            if (billBoard.id.type == "noise") {
                var position = billBoard.id.position._value;
                $('.cesium-infoBox').css('display', 'none');

                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(viewPointsArray[billBoard.id.id].lng, viewPointsArray[billBoard.id.id].lat, 1000.0),
                    complete: function() {
                        viewer.camera.flyTo({
                            destination: Cesium.Cartesian3.fromDegrees(viewPointsArray[billBoard.id.id].lng, viewPointsArray[billBoard.id.id].lat, 20.0),
                            orientation: {
                                heading: Cesium.Math.toRadians(viewPointsArray[billBoard.id.id].heading),
                                pitch: Cesium.Math.toRadians(viewPointsArray[billBoard.id.id].pitch),
                            },
                            complete: function() {
                                flyTo(billBoard);
                            }
                        })
                    }
                });
            } else {
                $('.cesium-infoBox').show();
            }
        }, 　Cesium.ScreenSpaceEventType.LEFT_DOWN);

    var streetViewDiv = document.getElementById("sv");
    var streetViewPos = { x: 0, y: 0, x: 0 };
    var streetViewHeading = 0;


    function streetView(heading) {
        streetViewDiv.innerHTML = null;
        var cart = Cesium.Ellipsoid.WGS84.cartesianToCartographic(streetViewPos);
        var latlng = new google.maps.LatLng(Cesium.Math.toDegrees(cart.latitude), Cesium.Math.toDegrees(cart.longitude));

        var streetViewOptions = {
            enableCloseButton: false,
            addressControl: false,
            panControl: true,
            panControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER
            },
            zoomControl: false,
        };

        sv.getPanoramaByLocation(latlng, 200,
            function(data, status) {
                if (status != google.maps.StreetViewStatus.OK) {
                    svNotAvailable.innerHTML = 'この場所のストリートビューは利用できません';
                    fadeInOut(svNotAvailable, 1);
                    setTimeout('fadeInOut(svNotAvailable,0)', 1500);
                } else {
                    $('#cesium').fadeOut(2800);
                    $('#foot').fadeOut(2800);

                    svp = new google.maps.StreetViewPanorama(
                        streetViewDiv, {
                            position: data.location.latLng,
                            pov: {
                                heading: heading,
                                pitch: 15,
                                zoom: 1
                            }
                        });
                    svp.setOptions(streetViewOptions);
                    svp.setVisible(true);
                }
            }
        );

        $(".btn-return").on('click', function() {
            $("#waveform").hide();
            $(".btn-return").hide();

            $('#foot').fadeIn("slow");
            $('#cesium').fadeIn("slow");
            wavesurfer.pause();
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(127.9029728, 25.8057773, 70000.0),
                orientation: {
                    pitch: Cesium.Math.toRadians(-50.0)
                }
            });
        });

        $(".btn-play").on('click', function() {
            wavesurfer.play();
        });
    }
    $(document).on('click', '.about', function() {
        $("#about").fadeIn();
        return false;
    });

    $("#about").on('click', function() {
        $("#about").fadeOut();
        return false;
    });
}