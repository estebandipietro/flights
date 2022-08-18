/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Box, Button, Card } from '@mui/material';
import { useEffect, useState } from 'react';

import * as styles from './Home.styles';

import AirportAutocomplete from 'components/AirportAutocomplete/AirportAutocomplete';
import DistanceMessage from 'components/DistanceMessage/DistanceMessage';
import PageWrapper from 'components/Layout/PageWrapper';
import MyGoogleMap from 'components/MyGoogleMap/MyGoogleMap';
import { getAirports } from 'services/airports.service';
import { AirportDTO } from 'types/AirportType';
import { getDistanceFromLatLon } from 'utils/distance.utils';

const Home = () => {
  const [from, setFrom] = useState<AirportDTO | null>(null);
  const [to, setTo] = useState<AirportDTO | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [options, setOptions] = useState<AirportDTO[]>([]);

  useEffect(() => {
    async function getOptions() {
      const airports = await getAirports();
      setOptions(airports);
    }
    getOptions();
  }, []);

  const handleCalculateDistance = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (from && to) {
      const dist = getDistanceFromLatLon(from.latitude, from.longitude, to.latitude, to.longitude);
      setDistance(dist);
    }
  };

  return (
    <PageWrapper css={styles.pageWrapper}>
      <Card sx={styles.cardWrapper}>
        <form css={styles.form} onSubmit={e => handleCalculateDistance(e)}>
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
          <Button type="submit" variant="contained" sx={styles.button} disabled={!from || !to}>
            Calculate distance
          </Button>
        </form>
      </Card>

      <Box sx={styles.distanceWrapper}>
        <DistanceMessage distance={distance} from={from} to={to} />
      </Box>

      <Box sx={styles.mapWrapper}>
        <MyGoogleMap from={from} to={to} />
      </Box>
    </PageWrapper>
  );
};

export default Home;
