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

export const distanceWrapper = () => ({
  textAlign: 'center',
  height: 'max-content',
});

export const mapWrapper = () => ({
  height: '100%',
  mb: 4,
});
