import { css } from '@emotion/react';

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
  maxWidth: 1200,
  display: 'flex',
  flexDirection: { lg: 'row', md: 'column', s: 'column', xs: 'column' },
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  bgcolor: 'grey.100',
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
  maxWidth: 1200,
  height: '100%',
  mb: 4,
});
