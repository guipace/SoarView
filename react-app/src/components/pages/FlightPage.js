import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IGCParser from 'igc-parser'
import IGC from 'ol/format/IGC';
import { getFlight } from '../../store/flight';
import { getComments } from '../../store/comments';
import MapWrapper from '../MapWrapper';
import FlightSidebar from '../components/FlightSidebar';

function FlightPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const flight = useSelector(state => state.flight.singleFlight);
  const [ igcData, setIgcData ] = useState();
  const [ igcParsedData, setIgcParsedData ] = useState();
  const [ features, setFeatures ] = useState([])


  useEffect(() => {
    dispatch(getFlight(id));
    dispatch(getComments(id));
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
    if (igcData) {
      let parsedData = IGCParser.parse(igcData);
      console.log(parsedData);
      setIgcParsedData(parsedData);
    }

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
      <FlightSidebar sessionUser={sessionUser} flight={flight} igcParsedData={igcParsedData}/>
    </div>
  )
}

export default FlightPage;
