Meteor.startup(function(){
	Mapbox.load('directions', 'markercluster', 'locate', 'label', 'fullscreen', 'heat');
});

Tracker.autorun(function () {
	if (Mapbox.loaded()) {
		L.mapbox.accessToken = 'pk.eyJ1Ijoiam1vbGF5ZW0iLCJhIjoiY2lsbXhuMGwzMDAwMnRzbTE2ejh0dnlsaSJ9.VDYLw3sLdwl7RfBtZX1ySA';
		var map = L.mapbox.map("map", 'jmolayem.0l18inf9');
    Points.find().observe({
      added: function(point) {
        L.marker([point.latitude, point.longitude]).addTo(map);
      }
    });
    var points = Points.find().fetch();
    var coords = [];

    for (var i = 0; i < points.length; i++) {
      L.marker([points[i].latitude, points[i].longitude])
      .bindPopup(points[i].description, { minWidth: 200})
      .addTo(map);
      // coords.push([points[i].latitude, points[i].longitude]);
    }

    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');

    function switchLayer(layer) {
         var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
    }

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].onclick = switchLayer;
    }

    // var heat = L.heatLayer(coords, { maxZoom: 12 }).addTo(map);

        map.on('click', function(e) {
        // Let's add a callback to makeMarker so that it can draw the route only
        // *after* it's done processing the marker adding.
        makeMarker(e, drawRoute);
    });
    var waypoints = [];
    var polyline = L.polyline([]).addTo(map);
    function makeMarker(e, done) {
        var marker = L.marker(e.latlng, { draggable: true }).addTo(map);
        marker.on('dragend', drawRoute);
        waypoints.push(marker);
        return done();
    }

map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point);
    document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
});

    function drawRoute() {
        if (waypoints.length < 2) return;
        // Directions API request looks like
        // http://api.tiles.mapbox.com/v4/directions/mapbox.driving/
        //    -122.42,37.78;-77.03,38.91.json?access_token={access_token}
        // We'll construct this using latlngs from the markers in waypoints.
        var points = waypoints.map(function(marker) {
            var latlng = marker._latlng;
            return [latlng.lng, latlng.lat].join(',');
        }).join(';');
        var directionsUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving/' +
        points + '?geometries=polyline' + '&access_token=pk.eyJ1Ijoiam1vbGF5ZW0iLCJhIjoiY2lsbXhuMGwzMDAwMnRzbTE2ejh0dnlsaSJ9.VDYLw3sLdwl7RfBtZX1ySA';
        $.get(directionsUrl, function(data) {
            // Do something with the directions returned from the API.
            var route = data.routes[0].geometry.coordinates;
            route = route.map(function(point) {
                // Turns out if we zoom out we see that the lat/lngs are flipped,
                // which is why it didn't look like they were being added to the
                // map. We can invert them here before drawing.
                return [point[1], point[0]];
            });
            polyline.setLatLngs(route);
        });
    };
	}
});



Template.Pipelines.onCreated(function(){
	this.editMode = new ReactiveVar(false);
	//	this.editMode = new ReactiveVar();
	// this.editMode.set(false);
});

Template.Pipelines.helpers({
	updatePipelineId: function() {
		return this._id;
	},
	editMode: function(){
		return Template.instance().editMode.get();
	}
});

Template.Pipelines.events({
	'click .toggle-menu': function(){
		Meteor.call('toggleMenuItem', this._id, this.inMenu);
	},
	'click .fa-trash': function () {
		Meteor.call('deletePipeline', this._id);
	},
	'click .fa-pencil': function (event, template) {
		template.editMode.set(!template.editMode.get());
	}
});