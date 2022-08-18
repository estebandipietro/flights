/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';

import * as styles from './AirportCard.styles';

import AirportAutocomplete from 'components/AirportAutocomplete/AirportAutocomplete';
import { getAirports } from 'services/airports.service';
import { AirportDTO } from 'types/AirportType';

interface AirportCardProps {
  from: AirportDTO | null;
  setFrom: React.Dispatch<React.SetStateAction<AirportDTO | null>>;
  to: AirportDTO | null;
  setTo: React.Dispatch<React.SetStateAction<AirportDTO | null>>;
  handleReset: () => void;
}

const AirportCard = ({ from, setFrom, to, setTo, handleReset }: AirportCardProps) => {
  const [options, setOptions] = useState<AirportDTO[]>([]);

  useEffect(() => {
    async function getOptions() {
      const airports = await getAirports();
      setOptions(airports);
    }
    getOptions();
  }, []);

  return (
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
  );
};

export default AirportCard;
