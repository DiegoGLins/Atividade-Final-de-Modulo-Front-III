import { Grid, TextField, Button, Alert, Snackbar, Link } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import TitleStyled from '../styleds/TitleStyled';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { saveUser, selectAll } from '../../store/modules/registerUserSlice';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userRedux = useAppSelector(selectAll);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [openSnap, setOpenSnap] = useState<boolean>(false);
  const [snapMessage, setSnapMessage] = useState<string>('');

  function registerValidation(): { success: boolean; message: string } {
    if (!email) {
      return {
        success: false,
        message: 'Email não foi informado!'
      };
    }
    if (!password) {
      return {
        success: false,
        message: 'Senha deve ser informada!'
      };
    }

    if (password !== repeatPassword) {
      return {
        success: false,
        message: 'Senhas não são iguais!'
      };
    }

    if (findUser) {
      return {
        success: true,
        message: 'Usuário já cadastrado'
      };
    }

    return {
      success: true,
      message: 'Cadastro realizado com sucesso'
    };
  }

  const findUser = userRedux.find(user => user.email === email);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = registerValidation();
    setSnapMessage(result.message);
    if (result.success) {
      dispatch(saveUser({ email: email, password: password, errands: [] }));
      setOpenSnap(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setOpenSnap(true);
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={8}>
            <TitleStyled>
              <LockIcon />
            </TitleStyled>
            <TitleStyled>Crie um email e senha para cadastrar</TitleStyled>
          </Grid>
          <Grid item xs={8}>
            <TextField
              onChange={e => setEmail(e.target.value)}
              fullWidth
              type="email"
              label="crie um email"
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={8}>
            <TextField
              onChange={e => setPassword(e.target.value)}
              fullWidth
              type="password"
              label="crie uma senha"
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={8}>
            <TextField
              onChange={e => setRepeatPassword(e.target.value)}
              fullWidth
              type="password"
              label="repita a senha por favor"
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={8}>
            <Button type="submit" fullWidth variant="contained" color="success">
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
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnap}
        autoHideDuration={7000}
        onClose={() => setOpenSnap(false)}
      >
        <Alert onClose={() => setOpenSnap(false)} severity="warning" sx={{ width: '100%' }}>
          {snapMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterForm;
