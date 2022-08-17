/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Box, Button, Card, Typography } from '@mui/material';
import AirportAutocomplete from 'components/AirportAutocomplete/AirportAutocomplete';
import PageWrapper from 'components/Layout/PageWrapper';
import React, { useEffect, useState } from 'react';
import { AirportDTO, getAirports } from 'services/airports.service';
import { getDistanceFromLatLon } from 'utils/distance.utils';

import { useJsApiLoader, GoogleMap, Marker, Polyline } from '@react-google-maps/api';

import * as styles from './Home.styles';

const UNITED_STATES_CENTER = { lat: 39.8097343, lng: -98.5556199 };

const Home = () => {
  const [from, setFrom] = useState<AirportDTO | null>(null);
  const [to, setTo] = useState<AirportDTO | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [options, setOptions] = useState<AirportDTO[]>([]);

  useEffect(() => {
    async function getOptions() {
      const data = await getAirports();
      setOptions(
        data?.airports
          .filter(ap => ap.active && ap.iata)
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          })
      );
    }
    getOptions();
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API as string,
  });

  const handleCalculateDistance = () => {
    if (from && to) {
      const dist = getDistanceFromLatLon(from.latitude, from.longitude, to.latitude, to.longitude);
      setDistance(dist);
    }
  };

  return (
    <PageWrapper css={styles.pageWrapper}>
      <Card sx={styles.cardWrapper}>
        <AirportAutocomplete
          options={options}
          selectedAirport={from}
          setSelectedAirport={setFrom}
          label="From airport"
        />
        <AirportAutocomplete
          options={options}
          selectedAirport={to}
          setSelectedAirport={setTo}
          label="To airport"
        />
        <Button
          variant="contained"
          sx={styles.button}
          onClick={() => handleCalculateDistance()}
          disabled={!from || !to}
        >
          Calculate distance
        </Button>
      </Card>

      <Box sx={styles.distanceWrapper}>
        {distance && from && to && (
          <React.Fragment>
            {'The distance between '}
            <Typography component="span" fontWeight="bold">
              {from.name}
            </Typography>
            {' and '}
            <Typography component="span" fontWeight="bold">
              {to.name}
            </Typography>
            {' is '}
            <Typography component="span" fontWeight="bold">
              {`${distance} NM.`}
            </Typography>
          </React.Fragment>
        )}
      </Box>

      <Box sx={styles.mapWrapper}>
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
        ) : (
          <React.Fragment />
        )}
      </Box>
    </PageWrapper>
  );
};

export default Home;
