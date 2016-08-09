angular.module('app.controllers', [])
 
.controller('homeCtrl', function($scope) {

})
    .controller('mapCtrl', function($scope, $state, uiGmapGoogleMapApi, uiGmapIsReady, $rootScope, $timeout, $ionicLoading, Clinic) {
	console.log("map is loading");
	 $scope.ready = false; 
	$ionicLoading.show({template: '<img src = "img/syringe.gif">' , noBackdrop: false });

	Clinic.find({})
	    .$promise
	    .then(function success(response){
		    alert(1);
console.log(response);
		$scope.response = response;
	    }, function error(response){
		    alert(2);
		console.log(response);
	    });

    navigator.geolocation.getCurrentPosition(function($position){
	    // success!
	    console.log($position.coords);
	    setup_map(parseFloat($position.coords.latitude), parseFloat($position.coords.longitude));
	}, function($error){
	    setup_map({latitude: 0, longitude: 0});
	    // error!
	});

	function placeToMarker(searchbox, id) {

		var place = searchbox.getPlaces();
		if (!place || place == 'undefined' || place.length == 0) {
		return;
		}

		var marker = {
			id: id,
			place_id: place[0].place_id,
			name: place[0].name,
			address: place[0].formatted_address,
			latitude: place[0].geometry.location.lat(),
			longitude: place[0].geometry.location.lng(),
			latlng: place[0].geometry.location.lat() + ',' + place[0].geometry.location.lng()
		};
		// push your markers into the $scope.map.markers array
		if (!$scope.map.markers) {
			$scope.map.markers = [];
		}
	}

    var setup_map = function($latitude, $longitude){
    	console.log($latitude);
    	console.log($longitude);
	uiGmapGoogleMapApi.then(function(maps){
	    $scope.map = {};
	    $scope.map.center = {latitude: parseFloat($latitude),
				 longitude: parseFloat($longitude)};
	    $scope.map.zoom = 14;
	    $scope.map.searchbox = { 
        	template:'searchbox.tpl.html', 
        	events:{
            	places_changed: function (searchbox) {
            		var place = searchbox.getPlaces();
				    if (!place || place == 'undefined' || place.length == 0) {
				        console.log('no place data :(');
				        return;
				    }

				    $scope.map = {
				        "center": {
				            "latitude": place[0].geometry.location.lat(),
				            "longitude": place[0].geometry.location.lng()
				        },
				        "zoom": 18
				    };

				    $scope.place = [{
					    id: 'place',
					    place_id: place[0].place_id,
					    name: place[0].name,
					    address: place[0].formatted_address,
					    coords: {latitude: place[0].geometry.location.lat(),
					             longitude: place[0].geometry.location.lng()},
					    latlng: place[0].geometry.location.lat() + ',' + place[0].geometry.location.lng()
					}];
					console.log(place);
            	}
        	}
        }
        maps.visualRefresh = true;
	});

	$scope.place = [{
	    'id': 'place',
	    'coords': {
	        'latitude': parseFloat($latitude),
	        'longitude': parseFloat($longitude)
	    },
	    options: {
	    	draggable: true
	    },
	    events: {
	        dragend: function (marker, eventName, args) {

	            $scope.marker.options = {
	                draggable: true,
	                labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
	                labelAnchor: "100 0",
	                labelClass: "marker-labels"
	            };
	        },
	        places_changed: function (searchbox) {
				placeToMarker(searchbox, id);
  			}
	    }
	}];

	$scope.me = [{'id':'me',
		'coords': {'latitude': parseFloat($latitude),
			'longitude': parseFloat($longitude)
		},
		'icon': "img/mylocation.png",
		'options': {
			'icon': {
			  //'scaledSize': new google.maps.Size(34, 44)
			}
		}
	}];

		     $scope.ready= true;  
		     $ionicLoading.hide();
    };
})
   
.controller('clinicInfoCtrl', function($scope) {
})

.controller('clinicServicesCtrl', function($scope) {

});
