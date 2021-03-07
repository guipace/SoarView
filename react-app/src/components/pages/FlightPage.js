import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MapWrapper from '../MapWrapper';

import GeoJSON from 'ol/format/GeoJSON'
import Feature from 'ol/Feature';

function FlightPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const flight = useSelector(state => state.flight);

  const [ features, setFeatures ] = useState([])

  useEffect(() => {
    //dispatch get flight from db and into redux

    return () => {

    }
  }, [])

  useEffect( () => {

    const fetchedFeatures = require('./mock-geoson-api.json');

    // console.log('FEATURES', fetchedFeatures)

    // parse fetched geojson into OpenLayers features
    //  use options to convert feature from EPSG:4326 to EPSG:3857
    const wktOptions = {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }

    const parsedFeatures = new GeoJSON().readFeatures(fetchedFeatures, wktOptions)

    // set features into state (which will be passed into OpenLayers
    //  map component as props)
    setFeatures(parsedFeatures)
    console.log("FEATURES", parsedFeatures);
  },[])


  return (
    <div className='flex-1 flex flex-col md:flex-row'>
      <MapWrapper features={features} />
      <div className='w-full md:w-3/12 md:order-1'>PLACEHOLDER FOR SIDEBAR COMPONENT</div>
    </div>
  )
}

export default FlightPage;
