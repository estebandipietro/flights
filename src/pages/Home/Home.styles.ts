import { css } from '@emotion/react';

export const pageWrapper = () =>
  css({
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '16px',
  });

export const cardWrapper = () => ({
  mt: 8,
  p: 4,
  maxWidth: 1200,
  height: 'fit-content',
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
});
