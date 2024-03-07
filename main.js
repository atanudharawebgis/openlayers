var container = document.getElementById('popup');
var content = document.getElementById('popup-content');

var wmsSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/ad/wms',
    params: { 'LAYERS': 'ad:EAST_MEDINIPUR	', 'TILED': true },
    serverType: 'geoserver',
    // Countries have transparency, so do not fade tiles:
    transition: 0
})

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        new ol.layer.Tile({
            source: wmsSource
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([87.668723, 21.886799]),
        zoom: 9
    })
});

map.on('singleclick', function (evt) {
    document.getElementById('nodelist').innerHTML = "Loading... please wait...";
    var view = map.getView();
    var viewResolution = view.getResolution();
    var url = wmsSource.getFeatureInfoUrl(
        evt.coordinate, viewResolution, view.getProjection(),
        { 'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50 });
    console.log(url)
    if (url) {
        document.getElementById('nodelist').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
    }
});