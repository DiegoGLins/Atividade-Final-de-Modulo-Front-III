import { Grid } from '@mui/material';
import React from 'react';
import Header from '../Components/Header/Index';
import ListErrands from '../Components/ListErrandsPage/Index';
import { useAppSelector } from '../store/hooks';
import { getUserErrands } from '../Components/GetErrands';

const Errands: React.FC = () => {
  const userLogged = useAppSelector(state => state.users.loggedUser);

  return (
    <Grid container sx={{ height: '100%'}} justifyContent='center'>
      <Header/>
      <Grid item xs={6} justifyContent="center" alignSelf="center" sx={{marginTop: '15px' }}>
        <ListErrands errands={getUserErrands(userLogged) || []} />
      </Grid>
    </Grid>
  );
};

export default Errands;
