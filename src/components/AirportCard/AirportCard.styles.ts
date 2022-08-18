/* eslint-disable no-useless-computed-key */
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
