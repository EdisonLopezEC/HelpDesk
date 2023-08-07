import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
// import AnimatedSVG from './AnimatedSVG'
import NewComponent from './NewComponent';

const PageNotFound = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={10} marginTop={10} >
        <Box >
          <NewComponent />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Typography variant="h2" component="h1" color="textPrimary">
            404 Página no encontrada
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
