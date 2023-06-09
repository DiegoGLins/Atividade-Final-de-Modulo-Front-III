import { Grid } from '@mui/material';
import React from 'react';
import fotoLogin from '../image/fotoLogin.jpg';
import RegisterForm from '../Components/RegisterForm';

const Register: React.FC = () => {

  
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={7} sx={{ background: `url(${fotoLogin}) center / cover no-repeat` }}></Grid>
      <Grid item xs={5}>
        <Grid container sx={{ height: '100vh' }} alignItems="center" justifyContent="center">
          <RegisterForm/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
