import { Grid, TextField, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import React from 'react';
import generateID from '../../utils/generateErrandsID';
import { addAllErrands, addErrand, selectAll } from '../../store/modules/ListErrandsSlice';
import { selectById, updateUser } from '../../store/modules/registerUserSlice';
import { useNavigate } from 'react-router-dom';

const RegisterErrandsForm: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [detailsError, setDetailsError] = useState<boolean>(false);

  const userReduxLogged = useAppSelector(state => state.userLogged);
  const userRedux = useAppSelector(state => selectById(state, userReduxLogged));

  const errandRedux = useAppSelector(selectAll);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRedux?.errands) {
      dispatch(addAllErrands(userRedux.errands));
    }
  }, []);

  useEffect(() => {
    dispatch(
      updateUser({
        id: userReduxLogged,
        changes: { errands: errandRedux }
      })
    );
  }, [errandRedux]);

  useEffect(() => {
    if (description.length) {
      if (description.length < 3) {
        setDescriptionError(true);
      } else {
        setDescriptionError(false);
      }
    } else {
      setDescriptionError(false);
    }
  }, [description]);

  useEffect(() => {
    if (details.length) {
      if (details.length < 3) {
        setDetailsError(true);
      } else {
        setDetailsError(false);
      }
    } else {
      setDetailsError(false);
    }
  }, [details]);

  useEffect(() => {
    if (!userReduxLogged) {
      navigate('/');
    }
  }, [userReduxLogged]);

  const ClearErrands = () => {
    setDescription('');
    setDetails('');
  };

  const AddErrands = () => {
    dispatch(
      addErrand({
        errandId: generateID(),
        description,
        details
      })
    );
    ClearErrands();
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '40px' }} justifyContent="center">
      <Grid container item xs={12} md={8} sx={{ marginLeft: '150px', marginRight: '150px' }} justifyContent="center">
        <Typography variant="h6" sx={{ marginBottom: '20px'}}>Adicionar novo recado</Typography>
        <TextField
          error={descriptionError}
          helperText={descriptionError ? 'Digite uma descrição válida! No mínimo 3 caracteres' : ''}
          value={description}
          onChange={event => setDescription(event.target.value)}
          fullWidth
          id="name"
          label="Digite a descrição do recado"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={8} sx={{ marginLeft: '150px', marginRight: '150px' }}>
        <TextField
          error={detailsError}
          helperText={detailsError ? 'Digite um detalhamento válido ! No mínimo 3 caracteres' : ''}
          value={details}
          onChange={event => setDetails(event.target.value)}
          fullWidth
          id="phone"
          label="Digite o detalhamento do recado"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={8} sx={{ marginLeft: '150px', marginRight: '150px' }}>
        <Button onClick={ClearErrands} fullWidth variant="outlined">
          Limpar recado
        </Button>
      </Grid>
      <Grid item xs={12} md={8} sx={{ marginLeft: '150px', marginRight: '150px' }}>
        <Button onClick={AddErrands} disabled={descriptionError || detailsError} fullWidth variant="contained">
          Cadastrar recado
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterErrandsForm;
