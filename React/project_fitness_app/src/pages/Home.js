import React from 'react';
import { Box } from '@mui/material';

import { HeroBanner, SearchExercises, Exercises } from '../components';

export const Home = () => {
  return (
    <Box>
      <HeroBanner />
      <SearchExercises />
      <Exercises />
    </Box>
  );
};
