window.onload = function() {
  L.map('map', {
    layers: MQ.mapLayer(),
    center: [ 47.6062, -122.3321 ],
    zoom: 12
  });
};
