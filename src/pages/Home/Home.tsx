/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import * as styles from './Home.styles';

import AirportCard from 'components/AirportCard/AirportCard';
import DistanceMessage from 'components/DistanceMessage/DistanceMessage';
import PageWrapper from 'components/Layout/PageWrapper';
import MyGoogleMap from 'components/MyGoogleMap/MyGoogleMap';
import { UNITED_STATES_CENTER } from 'constants/constants';
import { AirportDTO } from 'types/AirportType';
import { getDistanceFromLatLon } from 'utils/distance.utils';

const Home = () => {
  const [from, setFrom] = useState<AirportDTO | null>(null);
  const [to, setTo] = useState<AirportDTO | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

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
        <AirportCard
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          handleReset={handleReset}
        />
      </Box>

      <Box sx={styles.distanceWrapper}>
        <DistanceMessage distance={distance} from={from} to={to} />
      </Box>

      <Box sx={styles.mapWrapper}>
        <MyGoogleMap from={from} to={to} setMap={setMap} />
      </Box>
    </PageWrapper>
  );
};

export default Home;
