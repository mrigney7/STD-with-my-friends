angular.module('app.controllers', [])
 
.controller('homeCtrl', function($scope, $ionicLoading) {
$ionicLoading.show(); $ionicLoading.hide();
})

.controller('mapCtrl', function($scope, $state, uiGmapGoogleMapApi, uiGmapIsReady, $rootScope, $timeout) {
	console.log("map is loading");
	 $scope.ready = false; 

    navigator.geolocation.getCurrentPosition(function($position){
	    // success!
	    console.log($position.coords);
	    setup_map(parseFloat($position.coords.latitude), parseFloat($position.coords.longitude));
	}, function($error){
	    setup_map({latitude: 0, longitude: 0});
	    // error!
	});
    var setup_map = function($latitude, $longitude){
    	console.log($latitude);
    	console.log($longitude);
	uiGmapGoogleMapApi.then(function(maps){
	    $rootScope.map = {};
	    $rootScope.map.center = {latitude: parseFloat($latitude),
				 longitude: parseFloat($longitude)};
	    $rootScope.map.zoom = 14;
	});
	$scope.me = [{'id':'me',
		      'coords': 
		      {'latitude': parseFloat($latitude),
		       'longitude': parseFloat($longitude)
		      },
		      'icon': "img/mylocation.png",
		      'options': {
			  'icon': {
			      //'scaledSize': new google.maps.Size(34, 44)
			  }
		      },
		     }];

		     $scope.ready= true;  
    };
})
   
.controller('clinic4Ctrl', function($scope) {

});
