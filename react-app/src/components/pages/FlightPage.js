import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFlight } from '../../store/flight';
import MapWrapper from '../MapWrapper';
import FlightSidebar from '../components/FlightSidebar';

import IGC from 'ol/format/IGC';
// import Feature from 'ol/Feature';

function FlightPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const flight = useSelector(state => state.flight);
  const [ igcData, setIgcData ] = useState();
  const [ features, setFeatures ] = useState([])


  useEffect(() => {
    //dispatch get flight from db and into redux
    dispatch(getFlight(id));
  }, [dispatch, id])

  useEffect(() => {
    const fetchIgcData = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const text = await blob.text();
      setIgcData(text);
    }
    if (flight) {
      fetchIgcData(flight.igc_url);
    }
  }, [flight]);

  useEffect( () => {
    let igcFormat = new IGC();

    // parse fetched IGC into OpenLayers features
    const features = igcFormat.readFeatures(igcData, {
      featureProjection: 'EPSG:3857',
    });

    // set features into state (which will be passed into OpenLayers map component as props)
    setFeatures(features)
  },[igcData])

  return (
    <div className='mt-20 flex-1 flex flex-col md:flex-row'>
      <MapWrapper features={features} />
      <FlightSidebar sessionUser={sessionUser} flight={flight}/>
    </div>
  )
}

export default FlightPage;
