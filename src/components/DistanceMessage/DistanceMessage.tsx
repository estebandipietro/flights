/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Typography } from '@mui/material';
import React from 'react';

import { AirportDTO } from 'types/AirportType';

interface DistanceMessageProps {
  distance: number | null;
  from: AirportDTO | null;
  to: AirportDTO | null;
}

const DistanceMessage = ({ distance, from, to }: DistanceMessageProps) => (
  <React.Fragment>
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
  </React.Fragment>
);

export default DistanceMessage;
