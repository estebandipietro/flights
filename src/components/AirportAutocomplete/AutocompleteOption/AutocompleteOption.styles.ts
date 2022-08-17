import { css } from '@emotion/react';

export const firstRow = () =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    gap: '16px',
    width: '100%',
  });

export const secondRow = () =>
  css({
    alignSelf: 'flex-start',
  });
