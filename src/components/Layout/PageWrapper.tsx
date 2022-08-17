/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Box } from '@mui/material';

import * as styles from './PageWrapper.styles';

const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <Box className={className} sx={styles.pageWrapper}>
    {children}
  </Box>
);

export default PageWrapper;
