/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Box, Button, Card } from '@mui/material';
import AirportAutocomplete from 'components/AirportAutocomplete/AirportAutocomplete';
import { useEffect, useState } from 'react';
import { AirportDTO, getAirports } from 'services/airports.service';
import { getDistanceFromLatLon } from 'utils/distance.utils';

import * as styles from './Home.styles';

const Home = () => {
  const [from, setFrom] = useState<AirportDTO | null>(null);
  const [to, setTo] = useState<AirportDTO | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [options, setOptions] = useState<AirportDTO[]>([]);

  useEffect(() => {
    async function getOptions() {
      const data = await getAirports();
      setOptions(data?.airports.filter(ap => ap.active && ap.iata));
    }
    getOptions();
  }, []);

  const handleCalculateDistance = () => {
    if (from && to) {
      const dist = getDistanceFromLatLon(from.latitude, from.longitude, to.latitude, to.longitude);
      setDistance(dist);
    }
  };

  return (
    <Box sx={styles.pageWrapper}>
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

      {distance && (
        <Box>
          <span>The distance is </span>
          {distance}
        </Box>
      )}
    </Box>
  );
};

export default Home;
