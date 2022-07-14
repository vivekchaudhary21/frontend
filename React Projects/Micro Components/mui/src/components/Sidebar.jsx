import { Box, styled } from '@mui/material';
import React from 'react';

const MainBox = styled(Box)({
  backgroundColor: 'lightblue',
  flex: 1,
  padding: '20px',
});

export const Sidebar = () => {
  return (
    <MainBox
      sx={{
        display: {
          xs: 'none',
          sm: 'block',
        },
      }}
    >
      Sidebar !
    </MainBox>
  );
};

export default Sidebar;
