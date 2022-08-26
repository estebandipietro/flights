export const pageWrapper = () => ({
  bgcolor: 'grey.50',
  display: 'flex',
  justifyContent: 'center',
  pr: { md: '100px', s: '32px', xs: '16px' },
  pl: { md: '100px', s: '32px', xs: '16px' },
  width: '100%',
  height: '100%',
  '> *': {
    width: '100%',
  },
});
