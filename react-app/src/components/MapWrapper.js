import React, { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2'
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import LayerSwitcher from 'ol-layerswitcher';
// import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import BingMaps from 'ol/source/BingMaps';
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

function MapWrapper({ features, igcParsedData }) {
  const [ map, setMap ] = useState();
  const [ featuresLayer, setFeaturesLayer ] = useState();
  const [ selectedCoord, setSelectedCoord ] = useState();
  const mapElement = useRef();

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

    if (features.length) {// may be empty on first render

      // set features to map
      featuresLayer.setSource(
        new VectorSource({
          features: features // make sure features is an array
        })
      );

      // fit map to feature extent (with 100px of padding)
      map.getView().fit(featuresLayer.getSource().getExtent(), {
        padding: [50, 50, 50, 50]
      });
    }
  }, [features, featuresLayer, map]);


  // map click handler
  const handleMapClick = (event) => {

    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    // transform coord to EPSG 4326 standard Lat Long
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

    // set React state
    setSelectedCoord( transormedCoord )
  }

  // Graph options
  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 6,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: false,
            maxRotation: 0,
            maxTicksLimit: 10,
          },
          type: 'time',
            time: {
              displayFormats: {
                minute: 'H:mm'
              },
            },
        },
      ],
    },
    legend: {
      display: false,
      labels: {
          fontColor: 'rgb(255, 99, 132)'
      }
    },
    title: {
      display: true,
      text: 'Flight height profile',
    }
  }

  // Graph data
  let data;
  if (igcParsedData) {
    data = {
      // labels: igcParsedData.fixes.map(el => el.timestamp),
      datasets: [
        {
          label: 'Height',
          data: igcParsedData.fixes.map(el => {
            let obj = {
              y:el.gpsAltitude,
              x:new Date(el.timestamp)
            }
            return obj
          }),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(236, 70, 70, 1)',
          borderWidth: 3,
          pointRadius: 0,
        },
      ],
    }
  }

  return (
    <div className='bg-background w-full h-full md:w-9/12 md:order-2'>
      <div className='map-container w-full h-5/6' ref={mapElement}></div>
      <div className='w-full px-2'>
        <Line className='' height={120} data={data} options={options} />
      </div>
    </div>
  )
}

export default MapWrapper;
