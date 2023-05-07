import { Grid, TextField, Button, FormControl, Alert, Snackbar, Link } from '@mui/material';
import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import TitleStyled from '../styleds/TitleStyled';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register } from '../../store/modules/RegisterUserSlice';

const RegisterForm = () => {
  const [registerLogin, setRegisterLogin] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [repeatRegisterPassword, setRepeatRegisterPassword] = useState<string>('');
  const [openSnap, setOpenSnap] = useState<boolean>(false);
  const [finishedTimeout, setFinishedTimeout] = useState<boolean>(false);
  const [openRegisterEmpty, setRegisterEmpty] = useState<boolean>(false);
  const [passwordShort, setPasswordShort] = useState<boolean>(false);
  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const AllUsers = useAppSelector(state => state.users.items);

  const registerUser = () => {
    if (registerLogin === '' || registerPassword === '') {
      setRegisterEmpty(true);
    }
    else if (registerPassword.length < 4) {
      setPasswordShort(true);
    } else {
      const userAlreadyExist = AllUsers.find(item => item.email === registerLogin);
      if (userAlreadyExist) {
        setOpenSnap(true);
      } else {
        if (registerPassword === repeatRegisterPassword) {
          dispatch(
            register({
              email: registerLogin,
              password: registerPassword,
              errands: []
            })
          );
          setFinishedTimeout(true);
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
        else{
          setPasswordInvalid(true);
        }
      }
    }
  };

  return (
    <FormControl>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <TitleStyled>
            <LockIcon />
          </TitleStyled>
          <TitleStyled>Crie um email e senha para cadastrar</TitleStyled>
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            onChange={e => setRegisterLogin(e.target.value)}
            fullWidth
            type="email"
            label="crie um email"
            variant="outlined"
          ></TextField>
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            onChange={e => setRegisterPassword(e.target.value)}
            fullWidth
            type="password"
            label="crie uma senha"
            variant="outlined"
          ></TextField>
        </Grid>
        <Grid item xs={8}>
          <TextField
            onChange={e => setRepeatRegisterPassword(e.target.value)}
            fullWidth
            type="password"
            label="repita a senha por favor"
            variant="outlined"
          ></TextField>
        </Grid>
        <Grid item xs={8}>
          <Button onClick={registerUser} fullWidth variant="contained" color="success">
            Criar conta
          </Button>
        </Grid>
        <Grid item xs={8}>
          <TitleStyled>
            Já tem conta ?{' '}
            <Link sx={{ padding: '5px' }} href="/" underline="none">
              <strong className="TitleRegister" style={{ color: '#10ba32', fontSize: '17px' }}>
                Fazer login.
              </strong>
            </Link>
          </TitleStyled>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnap}
        autoHideDuration={7000}
        onClose={() => setOpenSnap(false)}
      >
        <Alert onClose={() => setOpenSnap(false)} severity="warning" sx={{ width: '100%' }}>
          Usuário já cadastrado! Faça login para entrar.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={finishedTimeout}
        autoHideDuration={6000}
        onClose={() => setFinishedTimeout(false)}
      >
        <Alert onClose={() => setFinishedTimeout(false)} severity="success" sx={{ width: '100%' }}>
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openRegisterEmpty}
        autoHideDuration={6000}
        onClose={() => setRegisterEmpty(false)}
      >
        <Alert onClose={() => setRegisterEmpty(false)} severity="warning" sx={{ width: '100%' }}>
          Por favor informe um email e uma senha valida!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={passwordShort}
        autoHideDuration={6000}
        onClose={() => setPasswordShort(false)}
      >
        <Alert onClose={() => setPasswordShort(false)} severity="warning" sx={{ width: '100%' }}>
          Por favor insira uma senha com no mínimo 4 caracteres!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={passwordInvalid}
        autoHideDuration={6000}
        onClose={() => setPasswordInvalid(false)}
      >
        <Alert onClose={() => setPasswordInvalid(false)} severity="warning" sx={{ width: '100%' }}>
          Senhas não são iguais!
        </Alert>
      </Snackbar>

    </FormControl>
  );
};

export default RegisterForm;
