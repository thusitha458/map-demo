/* global SITE_CONFIG */
/* global URLSearchParams */
import geoblaze from 'geoblaze';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

const L = window.L;

const getResolution = () => {
  const resolution = Number(new URLSearchParams(window.location.search).get('resolution'))
  if (resolution) {
    return resolution
  }

  if (SITE_CONFIG.resolution) {
    return Number(SITE_CONFIG.resolution);
  }

  const width = document.documentElement.clientWidth;
  const userAgent = window.navigator.userAgent;
  const isAndroid = userAgent.includes("Android");
  const isChromebook = userAgent.includes("CrOS");
  if (width < 900 || isAndroid || isChromebook) {
    return 32;
  } else if (width < 1200) {
    return 48;
  } else {
    return 64;
  }
}

const RasterService = {

  createRaster() {

    /* check for Github URL and switch to cors-enabled version
    https://github.com/GeoTIFF/geotiff.io/blob/master/assets/data/PuertoRicoTropicalFruit.tiff
    to:
    https://raw.githubusercontent.com/GeoTIFF/geotiff.io/master/assets/data/PuertoRicoTropicalFruit.tiff
    */
    // if (typeof input === "string") {
    //   if (input.match(/^https\:\/\/github\.com\/.*\/.*\/blob\/.*\/.*.tiff?$/i)) {
    //     input = input.replace("https://github.com/", "https://raw.githubusercontent.com/").replace("/blob", "");
    //     console.warn("Changed URL to " + input + " which is CORS-enabled");
    //   } else if (input.match(/^https\:\/\/github\.com\/.*\/.*\/blob\/.*\/.*.tiff?\?raw\=true$/i)) {
    //     input = input.replace("https://github.com/", "https://raw.githubusercontent.com/").replace("/blob", "").replace("?raw=true","");
    //     console.warn("Changed URL to " + input + " which is CORS-enabled");
    //   } else if (input.match(/^https\:\/\/github\.com\/.*\/.*\/raw\/.*\/.*.tiff?$/i)) {
    //     input = input.replace("https://github.com/", "https://raw.githubusercontent.com/").replace("/raw/", "/");
    //     console.warn("Changed URL to " + input + " which is CORS-enabled");
    //   }
    // }

    return new Promise((resolve, reject) => {
      const layer = L.tileLayer.wms('http://165.22.50.235:8087/geoserver/wms'/*'http://localhost:8080/geoserver/wms'*//*'http://ows.mundialis.de/services/service?'*/, {
        // layers: 'TOPO-OSM-WMS',
        // layers: 'cite:oek',
        layers: 'cite:srtm',
        opacity: 0.6,
        resolution: getResolution(),
      });
      // console.log('layer.....', layer);
      resolve(layer);
      // geoblaze.load(input)
      //   .then(georaster => {
      //     let options = {
      //       georaster: georaster,
      //       opacity: 0.7,
      //       resolution: getResolution()
      //     };
      //     const raster = new GeoRasterLayer(options);
      //     const layer = L.tileLayer.wms('http://localhost:8080/geoserver/wms'/*'http://ows.mundialis.de/services/service?'*/, {
      //       // layers: 'TOPO-OSM-WMS',
      //       // layers: 'cite:oek',
      //       layers: 'cite:srtm_53_07',
      //     });
      //     resolve(layer);
      //   }, error => {
      //     reject(error);
      //   });
    });
  },

  createRasterFromGeoraster(georaster) {
    const options = {
      georaster,
      opacity: 0.7,
      resolution: getResolution()
    }
    return new GeoRasterLayer(options);
  }
}

export default RasterService;
