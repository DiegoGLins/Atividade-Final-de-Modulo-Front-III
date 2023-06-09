import { Grid, TextField, Button, Typography, Alert, Snackbar, Link } from '@mui/material';
import TitleStyled from '../styleds/TitleStyled';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import React, { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { selectAll } from '../../store/modules/registerUserSlice';
import { userLogged } from '../../store/modules/UserLoggedSlice';

const LoginForm = () => {
  const [accessLogin, setAccessLogin] = useState<string>('');
  const [accessPassword, setAccessPassword] = useState<string>('');
  const [openSnap, setOpenSnap] = useState<boolean>(false);

  const navigate = useNavigate();

  const usersRedux = useAppSelector(selectAll);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const userExist = usersRedux.find(userLogin => userLogin.email === accessLogin && userLogin.password === accessPassword);
  
    if (userExist) {
      dispatch(userLogged(accessLogin));
      navigate('/list-errands');
    } else {
      setTimeout(() => {
        setOpenSnap(true);
      }, 500);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <TitleStyled>
            <LockIcon />
          </TitleStyled>
          <TitleStyled>Entrar no sistema</TitleStyled>
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            onChange={e => setAccessLogin(e.target.value)}
            fullWidth
            type="email"
            placeholder="email"
            variant="outlined"
          ></TextField>
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            onChange={e => setAccessPassword(e.target.value)}
            fullWidth
            type="password"
            placeholder="senha"
            variant="outlined"
          ></TextField>
        </Grid>
        <Grid item xs={8}>
          <Button type="submit" fullWidth variant="contained" color="success">
            Login
          </Button>
        </Grid>
        <Grid item container xs={8} display="inline-flex" justifyContent="center" alignContent="center">
          <Typography align="center" variant="body2">
            Ainda não tem conta ?
            <Link sx={{ padding: '5px' }} href="/register" underline="none">
              <strong className="TitleRegister" style={{ color: '#10ba32', fontSize: '17px' }}>
                Criar conta.
              </strong>
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnap}
        autoHideDuration={6000}
        onClose={() => setOpenSnap(false)}
      >
        <Alert onClose={() => setOpenSnap(false)} severity="warning" sx={{ width: '100%' }}>
          Login ou senha incorretos!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default LoginForm;
