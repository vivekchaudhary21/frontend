import { Box, styled } from '@mui/material';
import React from 'react';

const MainBox = styled(Box)({
  backgroundColor: 'pink',
  flex: 1,
  padding: '20px',
});

export const Rightbar = () => {
  return (
    <MainBox
      sx={{
        display: {
          xs: 'none',
          sm: 'block',
        },
      }}
    >
      Rightbar
    </MainBox>
  );
};

export default Rightbar;
