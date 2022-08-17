/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, CircularProgress, createFilterOptions, TextField } from '@mui/material';
import React, { useState } from 'react';
import { AirportDTO } from 'services/airports.service';
import AutocompleteOption from './AutocompleteOption/AutocompleteOption';

import * as styles from './AirportAutocomplete.styles';

interface AirportAutocompleteInterface {
  options: AirportDTO[];
  selectedAirport: AirportDTO | null;
  setSelectedAirport: React.Dispatch<React.SetStateAction<AirportDTO | null>>;
  label: string;
}

const AirportAutocomplete = ({
  options,
  selectedAirport,
  setSelectedAirport,
  label,
}: AirportAutocompleteInterface) => {
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option: AirportDTO) => option.name + option.iata,
  });

  return (
    <Autocomplete
      filterOptions={filterOptions}
      disablePortal
      id="combo-box-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loading={loading}
      options={options}
      value={selectedAirport}
      getOptionLabel={(option: AirportDTO) => `${option.name} - ${option.iata}`}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      onChange={(event: React.SyntheticEvent<Element, Event>, newValue: AirportDTO | null) => {
        setSelectedAirport(newValue);
      }}
      sx={{ width: 300 }}
      renderOption={(props, option) => (
        <li {...props} css={styles.optionWrapper} key={`${option.iata}${option.name}`}>
          <AutocompleteOption option={option} />
        </li>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AirportAutocomplete;
