Mapbox.load('directions', 'markercluster', 'locate', 'label', 'fullscreen', 'heat');
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

    // var heat = L.heatLayer(coords, { maxZoom: 12 }).addTo(map);

    map.on("click", function(e) {
      L.marker(e.latlng).addTo(map);
      // heat.addLatLng(e.latlng);
      Points.insert({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      });
    });
	}
});

app.FeedbackView = Backbone.View.extend({
  className: 'feedbackView',

  template: _.template($('#tmpl-feedback-view').html()),

  events: {
    'click': 'expandFeedback',
    'mouseleave': 'hideFeedback',
  },

  render: function() {
    this.$el.html(this.template({}));
    return this;
  },

  expandFeedback: function() {
    this.$('.feedbackExpansion').show();
    this.$el.addClass('expanded');
  },

  hideFeedback: function() {
    this.$('.feedbackExpansion').hide();
    this.$el.removeClass('expanded');
  },
});