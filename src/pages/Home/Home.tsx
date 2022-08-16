/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AirportDTO, getAirports } from 'services/airports.service';
import { getDistanceFromLatLon } from 'utils/distance.utils';

const Home = () => {
  const [from, setFrom] = useState<AirportDTO | null>(null);
  const [to, setTo] = useState<AirportDTO | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const [open, setOpen] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [options, setOptions] = useState<AirportDTO[]>([]);
  const loading = open && options.length === 0;
  const loadingTo = openTo && options.length === 0;

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
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        height: '100%',
        width: '100%',
      }}
    >
      <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
        <Autocomplete
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
          value={from}
          getOptionLabel={(option: AirportDTO) => `${option.name} - ${option.iata}`}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onChange={(event: React.SyntheticEvent<Element, Event>, newValue: AirportDTO | null) => {
            setFrom(newValue);
          }}
          sx={{ width: 300 }}
          renderOption={(props, option) => (
            <li
              {...props}
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
              key={`${option.iata}${option.name}`}
            >
              <div
                css={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignSelf: 'flex-start',
                  gap: '16px',
                }}
              >
                <span>{option.name}</span>
                <span>{option.iata}</span>
              </div>
              <div css={{ alignSelf: 'flex-start' }}>
                {option.city}
                <span>, </span>
                {option.countryName}
              </div>
            </li>
          )}
          renderInput={params => (
            <TextField
              {...params}
              label="From Airport"
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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          open={openTo}
          onOpen={() => {
            setOpenTo(true);
          }}
          onClose={() => {
            setOpenTo(false);
          }}
          loading={loadingTo}
          options={options}
          value={to}
          getOptionLabel={(option: AirportDTO) => option.name}
          isOptionEqualToValue={(option, value) =>
            option.name.toLowerCase() === value.name.toLowerCase()
          }
          onChange={(event: React.SyntheticEvent<Element, Event>, newValue: AirportDTO | null) => {
            setTo(newValue);
          }}
          sx={{ width: 300 }}
          renderOption={(props, option) => (
            <li
              {...props}
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
              key={`${option.iata}${option.name}`}
            >
              <div
                css={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignSelf: 'flex-start',
                  gap: '16px',
                }}
              >
                <span>{option.name}</span>
                <span>{option.iata}</span>
              </div>
              <div css={{ alignSelf: 'flex-start' }}>
                {option.city}
                <span>, </span>
                {option.countryName}
              </div>
            </li>
          )}
          renderInput={params => (
            <TextField
              {...params}
              label="From Airport"
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
        <Button
          variant="outlined"
          css={{ height: 'fit-content' }}
          onClick={() => handleCalculateDistance()}
        >
          Calculate distance
        </Button>
      </div>

      {distance && (
        <div>
          <span>The distance is </span>
          {distance}
        </div>
      )}
    </div>
  );
};

export default Home;
