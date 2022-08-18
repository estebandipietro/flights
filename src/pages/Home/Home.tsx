/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';

import * as styles from './Home.styles';

import AirportAutocomplete from 'components/AirportAutocomplete/AirportAutocomplete';
import DistanceMessage from 'components/DistanceMessage/DistanceMessage';
import PageWrapper from 'components/Layout/PageWrapper';
import MyGoogleMap from 'components/MyGoogleMap/MyGoogleMap';
import { UNITED_STATES_CENTER } from 'constants/constants';
import { getAirports } from 'services/airports.service';
import { AirportDTO } from 'types/AirportType';
import { getDistanceFromLatLon } from 'utils/distance.utils';

const Home = () => {
  const [from, setFrom] = useState<AirportDTO | null>(null);
  const [to, setTo] = useState<AirportDTO | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [options, setOptions] = useState<AirportDTO[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    async function getOptions() {
      const airports = await getAirports();
      setOptions(airports);
    }
    getOptions();
  }, []);

  useEffect(() => {
    if (from && to) {
      const dist = getDistanceFromLatLon(from.latitude, from.longitude, to.latitude, to.longitude);
      setDistance(dist);
    }
  }, [from, to]);

  const handleReset = () => {
    map?.panTo(UNITED_STATES_CENTER);
    map?.setZoom(4);
    setFrom(null);
    setTo(null);
  };

  return (
    <PageWrapper css={styles.pageWrapper}>
      <Box sx={styles.cardWrapper}>
        <Card variant="outlined">
          <CardContent sx={styles.contentWrapper}>
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

            <Button variant="outlined" sx={styles.button} onClick={() => handleReset()}>
              <RestartAltIcon />
            </Button>
          </CardContent>
        </Card>
      </Box>

      <Box sx={styles.distanceWrapper}>
        <DistanceMessage distance={distance} from={from} to={to} />
      </Box>

      <Box sx={styles.mapWrapper}>
        <MyGoogleMap from={from} to={to} onLoad={setMap} />
      </Box>
    </PageWrapper>
  );
};

export default Home;
