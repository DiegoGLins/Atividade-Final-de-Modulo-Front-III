import { Grid } from '@mui/material';
import React from 'react';
import Header from '../Components/Header/Index';
import ListErrands from '../Components/ListErrandsPage/Index';


const Errands: React.FC = () => {

  return (
    <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Header/>
      </Grid>
      <Grid item xs={12} justifyContent='center' alignSelf='center'>
        <ListErrands/>
      </Grid>
    </Grid>
  );
};

export default Errands;
