import React from 'react';
import { Box, Stack } from '@mui/material';

import { Sidebar, Navbar, Rightbar, Feed } from './components';

function App() {
  return (
    <Box>
      <Navbar />
      <Stack
        direction='row'
        alignItems={'center'}
        justifyContent='space-between'
      >
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default App;
