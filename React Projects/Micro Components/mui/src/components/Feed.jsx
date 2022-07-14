import { Box, styled } from '@mui/material';
import React from 'react';

const MainBox = styled(Box)({
  backgroundColor: 'coral',
  flex: 4,
  padding: '20px',
});

export const Feed = () => {
  return <MainBox>Navbar</MainBox>;
};

export default Feed;
