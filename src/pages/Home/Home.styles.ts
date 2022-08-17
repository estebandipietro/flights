export const pageWrapper = () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  height: '100%',
  width: '100%',
  bgcolor: 'grey.50',
});

export const cardWrapper = () => ({
  mt: 16,
  p: 4,
  width: '50%',
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
