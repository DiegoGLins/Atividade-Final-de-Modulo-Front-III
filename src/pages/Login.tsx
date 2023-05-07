import { Grid } from '@mui/material';
import React from 'react';
import fotoLogin from '../image/fotoLogin.jpg';
import LoginForm from '../Components/LoginForm/Index';

const Login: React.FC = () => {

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={7} sx={{ background: `url(${fotoLogin}) center / cover no-repeat` }}></Grid>
      <Grid item xs={5}>
        <Grid container sx={{ height: '100vh' }} alignItems="center" justifyContent="center">
          <LoginForm/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
