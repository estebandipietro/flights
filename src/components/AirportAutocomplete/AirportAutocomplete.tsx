/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, CircularProgress, FilterOptionsState, TextField } from '@mui/material';
import { matchSorter } from 'match-sorter';
import React, { useState } from 'react';

import * as styles from './AirportAutocomplete.styles';
import AutocompleteOption from './AutocompleteOption/AutocompleteOption';

import { MAX_AUTOCOMPLETE_OPTIONS } from 'constants/constants';
import { AirportDTO } from 'types/AirportType';

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

  const filterOptions = (opts: AirportDTO[], state: FilterOptionsState<AirportDTO>) =>
    matchSorter(opts, state.inputValue, { keys: ['iata', 'name'] }).slice(
      0,
      MAX_AUTOCOMPLETE_OPTIONS
    );

  return (
    <Autocomplete
      filterOptions={filterOptions}
      disablePortal
      blurOnSelect="touch"
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
      sx={styles.autocomplete}
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
