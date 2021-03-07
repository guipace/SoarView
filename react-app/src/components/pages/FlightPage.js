import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFlight } from '../../store/flight';
import MapWrapper from '../MapWrapper';

import IGC from 'ol/format/IGC';
import Feature from 'ol/Feature';

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
    fetchIgcData('https://soarview.s3.amazonaws.com/12sv1wz1.igc');
  }, []);

  useEffect( () => {

    let igcFormat = new IGC();

    // parse fetched geojson into OpenLayers features
    const features = igcFormat.readFeatures(igcData, {
      featureProjection: 'EPSG:3857',
    });

    // set features into state (which will be passed into OpenLayers map component as props)
    setFeatures(features)
  },[igcData])

  return (
    <div className='flex-1 flex flex-col md:flex-row'>
      <MapWrapper features={features} />
      <div className='w-full md:w-3/12 md:order-1'>PLACEHOLDER FOR SIDEBAR COMPONENT</div>
    </div>
  )
}

export default FlightPage;
