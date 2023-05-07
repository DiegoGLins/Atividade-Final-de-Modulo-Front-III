import { Grid } from '@mui/material';
import React from 'react';
import Header from '../Components/Header/Index';
import ListErrands from '../Components/ListErrandsPage/Index';

const Errands: React.FC = () => {
  
  return (
    <Grid container sx={{ height: '100%'}} justifyContent='center'>
      <Header/>
      <Grid item xs={6} justifyContent="center" alignSelf="center" sx={{marginTop: '15px' }}>
        <ListErrands/>
      </Grid>
    </Grid>
  );
};

export default Errands;
