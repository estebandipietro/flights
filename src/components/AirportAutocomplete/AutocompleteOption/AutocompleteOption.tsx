/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import React from 'react';

import * as styles from './AutocompleteOption.styles';

import { AirportDTO } from 'types/AirportType';

interface AutocompleteOptionInterface {
  option: AirportDTO;
}

const AutocompleteOption = ({ option }: AutocompleteOptionInterface) => (
  <React.Fragment>
    <Box css={styles.firstRow}>
      <Typography component="span" fontWeight="bold">
        {option.name}
      </Typography>
      <Typography component="span" fontWeight="bold">
        {option.iata}
      </Typography>
    </Box>
    <Box css={styles.secondRow}>
      {option.city}
      <Typography component="span">, </Typography>
      {option.countryName}
    </Box>
  </React.Fragment>
);

export default AutocompleteOption;
