/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useJsApiLoader, GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import React from 'react';

import { UNITED_STATES_CENTER } from 'constants/constants';
import { AirportDTO } from 'types/AirportType';

interface MyGoogleMapProps {
  from: AirportDTO | null;
  to: AirportDTO | null;
}

const MyGoogleMap = ({ from, to }: MyGoogleMapProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API as string,
  });

  return (
    <React.Fragment>
      {isLoaded ? (
        <GoogleMap
          center={UNITED_STATES_CENTER}
          zoom={4}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
          {from && <Marker position={{ lat: from.latitude, lng: from.longitude }} />}
          {to && <Marker position={{ lat: to.latitude, lng: to.longitude }} />}
          {from && to && (
            <Polyline
              path={[
                { lat: from.latitude, lng: from.longitude },
                { lat: to.latitude, lng: to.longitude },
              ]}
            />
          )}
        </GoogleMap>
      ) : null}
    </React.Fragment>
  );
};

export default MyGoogleMap;
