import React, { useState, useRef, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';


function MapWrapper(props) {
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
      source: new VectorSource()
    })

    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        // USGS Topo
        new TileLayer({
          source: new XYZ({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
          })
        }),

        initialFeaturesLayer,
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2
      }),
      controls: [],
    });

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
    <div className='map-container bg-tertiary w-full md:w-9/12 md:order-2' ref={mapElement}></div>
  )
}

export default MapWrapper;
