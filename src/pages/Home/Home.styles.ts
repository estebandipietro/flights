import { css } from '@emotion/react';

import { MEDIA_QUERIES } from 'constants/constants';

export const pageWrapper = () =>
  css({
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '16px',
  });

export const cardWrapper = () => ({
  p: 4,
  mt: 4,
  minHeight: 120,
  maxHeight: 120,
  height: '100%',
  bgcolor: 'grey.100',
  [`@media (max-width: ${MEDIA_QUERIES.laptop})`]: {
    maxHeight: '100%',
  },
});

export const form = () =>
  css({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    [`@media (max-width: ${MEDIA_QUERIES.laptop})`]: {
      flexDirection: 'column',
    },
  });

export const button = () => ({
  height: '100%',
  width: '100%',
  maxWidth: 300,
});

export const distanceWrapper = () => ({
  textAlign: 'center',
  minHeight: 25,
});

export const mapWrapper = () => ({
  width: '100%',
  height: '100%',
  mb: 4,
});
