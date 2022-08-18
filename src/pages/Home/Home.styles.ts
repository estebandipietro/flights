/* eslint-disable no-useless-computed-key */
import { css } from '@emotion/react';

export const pageWrapper = () =>
  css({
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '16px',
  });

export const cardWrapper = () => ({
  pt: 4,
  pb: 1,
});

export const contentWrapper = () => ({
  m: 0,
  p: 4,
  display: 'flex',
  flexDirection: { md: 'row', s: 'column', xs: 'column' },
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
});

export const button = () => ({
  maxWidth: '56px',
  maxHeight: '56px',
  minWidth: '56px',
  minHeight: '56px',
  ['@media (max-width:899px)']: {
    width: '100%',
    maxWidth: 300,
  },
});

export const distanceWrapper = () => ({
  textAlign: 'center',
  minHeight: 25,
});

export const mapWrapper = () => ({
  height: '100%',
  mb: 4,
});
