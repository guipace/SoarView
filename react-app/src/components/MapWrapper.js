import React, { useState, useRef, useEffect } from 'react';
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import LayerSwitcher from 'ol-layerswitcher';
// import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import BingMaps from 'ol/source/BingMaps';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';
import { defaults } from 'ol/control';
import { Stroke, Style } from 'ol/style'
import { bingApiKey } from '../index';

const polygonStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(236, 70, 70, 1)',
    width: 3
  }),
})

function MapWrapper(props) {
  const [ map, setMap ] = useState();
  const [ featuresLayer, setFeaturesLayer ] = useState();
  const [ selectedCoord, setSelectedCoord ] = useState();
  const mapElement = useRef();

  // console.log("Key ========= ", process.env.REACT_APP_BING_MAPS_KEY)

  // create state ref that can be accessed in OpenLayers onclick callback function
  const mapRef = useRef()
  mapRef.current = map

  // initialize map on first render
  useEffect(() => {

    // create and add vector source layer
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
      style: polygonStyle
    })

    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        // // USGS Topo
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
        //   }),
        //   visible: false,
        //   title: 'FIRST BASE MAP',
        //   type: 'base',
        // }),
        // // OSM Standard
        // new TileLayer({
        //   source: new OSM(),
        //   visible: false,
        //   title: 'Standard',
        //   type: 'base',
        // }),
        // // Stamen Terrain
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
        //     attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        //   }),
        //   visible: true,
        //   title: 'Stamen Terrain',
        //   type: 'base',
        // }),
        // Bing Maps Satelite
        new TileLayer({
          source: new BingMaps({
            key: bingApiKey,
            imagerySet: 'AerialWithLabelsOnDemand',
          }),
          title: 'Satelite',
          type: 'base',
        }),
        // Bing Maps Satelite
        new TileLayer({
          source: new BingMaps({
            key: bingApiKey,
            imagerySet: 'RoadOnDemand',
          }),
          title: 'Standard',
          type: 'base',
        }),
        // Bing Maps Dark
        new TileLayer({
          source: new BingMaps({
            key: bingApiKey,
            imagerySet: 'CanvasDark',
          }),
          title: 'Dark',
          type: 'base',
        }),

        initialFeaturesLayer,
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2
      }),
      controls: defaults(),
    });

    const layerSwitcher = new LayerSwitcher({
      reverse: true,
      groupSelectStyle: 'group'
    });
    initialMap.addControl(layerSwitcher);

    // save map and vector layer references to state
    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);

    initialMap.on('click', handleMapClick)
  }, []);


  // update map if features prop changes
  useEffect(() => {

    if (props.features.length) {// may be empty on first render

      // set features to map
      featuresLayer.setSource(
        new VectorSource({
          features: props.features // make sure features is an array
        })
      );

      // fit map to feature extent (with 100px of padding)
      map.getView().fit(featuresLayer.getSource().getExtent(), {
        padding: [100, 100, 100, 100]
      });
    }
  }, [props.features]);


  // map click handler
  const handleMapClick = (event) => {

    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    // transform coord to EPSG 4326 standard Lat Long
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

    // set React state
    setSelectedCoord( transormedCoord )
  }

  return (
    <div className='map-container bg-tertiary w-full h-full md:w-9/12 md:order-2' ref={mapElement}></div>
  )
}

export default MapWrapper;
