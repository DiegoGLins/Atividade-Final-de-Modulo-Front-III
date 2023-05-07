import { Grid, TextField, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addErrands } from '../../store/modules/ListErrandsSlice';
import ErrandsType from '../../types/ErrandsType';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import generateErrandsID from '../../utils/generateErrandsID';
import { add } from '../../store/modules/RegisterUserSlice';


const RegisterErrandsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLogged = useAppSelector(state => state.userLogged);

  const [description, setDescription] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [detailsError, setDetailsError] = useState<boolean>(false);

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

  const ClearErrands = () => {
    setDescription('');
    setDetails('');
  };

  const AddErrands = () => {
    const errandsUser: ErrandsType = { userId: userLogged.email, errandsId: generateErrandsID(), description, details };
    dispatch(addErrands(errandsUser));
    dispatch(add(errandsUser));
    navigate('/list-errands');

    ClearErrands();
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '50px' }} justifyContent="center">
      <Typography variant="h6">Adicionar novo recado</Typography>
      <Grid item xs={12} sx={{ marginLeft: '150px', marginRight: '150px' }}>
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
      <Grid item xs={12} sx={{ marginLeft: '150px', marginRight: '150px' }}>
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
      <Grid item xs={12} sx={{ marginLeft: '150px', marginRight: '150px' }}>
        <Button onClick={ClearErrands} fullWidth variant="outlined">
          Limpar recado
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ marginLeft: '150px', marginRight: '150px' }}>
        <Button onClick={AddErrands} disabled={descriptionError || detailsError} fullWidth variant="contained">
          Cadastrar recado
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterErrandsForm;
