import Header from '../Components/Header/Index';
import React from 'react';
import RegisterErrandsForm from '../Components/RegisterErrandsPage';
import { Grid } from '@mui/material';

const RegisterErrands: React.FC = () => {
  return (
    <>
      <Header />
      <Grid container>
        <RegisterErrandsForm />
      </Grid>
    </>
  );
};

export default RegisterErrands;
