import { Grid, TextField, Button, Typography, FormControl, Alert, Snackbar, Link } from '@mui/material';
import TitleStyled from '../styleds/TitleStyled';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAll } from '../../store/modules/ListErrandsSlice';
import { loggeds, add } from '../../store/modules/UserLoggedSlice';

const LoginForm = () => {
  const [accessLogin, setAccessLogin] = useState<string>('');
  const [accessPassword, setAccessPassword] = useState<string>('');
  const [openSnap, setOpenSnap] = useState<boolean>(false);

  const navigate = useNavigate();
  const AllErrands = useAppSelector(selectAll);
  const AllUsers = useAppSelector(state => state.users.items);

  const dispatch = useAppDispatch();

  const LoginSubmit = () => {
    const LoginUser = AllUsers.find(items => items.email === accessLogin);

    if (LoginUser && LoginUser.password === accessPassword) {
      const ErrandsUser = AllErrands.filter(item => item.userId === LoginUser.email); 
      dispatch(loggeds());
      navigate('/register-errands');
    } else {
      setOpenSnap(true);lhlhlhl
    }
  };


  return (
    <FormControl>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <TitleStyled>
            <LockIcon />
          </TitleStyled>
          <TitleStyled>Entrar no sistema</TitleStyled>
        </Grid>
        <Grid item xs={8}>
          <TextField required
            onChange={e => setAccessLogin(e.target.value)}
            fullWidth
            type="email"
            placeholder="email"
            variant="outlined"
          ></TextField>
        </Grid>
        <Grid item xs={8}>
          <TextField required
            onChange={e => setAccessPassword(e.target.value)}
            fullWidth
            type="password"
            placeholder="senha"
            variant="outlined"
          ></TextField>
        </Grid>
        <Grid item xs={8}>
          <Button onClick={LoginSubmit} fullWidth variant="contained" color="success">
            Login
          </Button>
        </Grid>
        <Grid item container xs={8} display="inline-flex" justifyContent="center" alignContent="center">
          <Typography align="center" variant="body2">
            Ainda não tem conta ?
            <Link sx={{ padding: '5px' }} href="/registerLogin" underline="none">
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
    </FormControl>
  );
};

export default LoginForm;
