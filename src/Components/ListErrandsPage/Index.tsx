import React, { useMemo, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar, Divider, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAllErrands, removeErrands, selectAll } from '../../store/modules/ListErrandsSlice';
import { Errand, selectById, updateUser } from '../../store/modules/registerUserSlice';
import { useNavigate } from 'react-router-dom';
import ErrandType from '../../types/ErrandType';
import Modal from '../ModalErrands';

const ListErrands: React.FC = () => {
  const userReduxLogged = useAppSelector(state => state.userLogged);
  const userRedux = useAppSelector(state => selectById(state, userReduxLogged));

  const errandRedux = useAppSelector(selectAll);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errandEdit, setErrandEdit] = useState<ErrandType | undefined>();
  const [openModal, setOpenModal] = React.useState(false);

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
    if (!userReduxLogged) {
      navigate('/');
    }
  }, [userReduxLogged]);

  const handleDelete = (itemDelete: Errand) => {
    dispatch(removeErrands(itemDelete.errandId));
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (itemEdit: ErrandType) => {
    console.log('clicou aqui');
    setErrandEdit(itemEdit);
    setOpenModal(true);
  };

  const ErrandsMemo = useMemo(() => {
    return errandRedux.map(item => {
      return (
        <React.Fragment key={item.errandId}>
          <Grid container>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <>
                  <IconButton onClick={() => handleOpenModal(item)} edge="end" aria-label="delete">
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(item)} edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar>{item.description[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.description}
                secondary={
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    {item.details}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Grid>
        </React.Fragment>
      );
    });
  }, [errandRedux]);

  return (
    <>
      <Modal
        openDialog={openModal}
        detail={errandEdit?.details || ''}
        description={errandEdit?.description || ''}
        id={errandEdit?.errandId}
        actionCancel={handleClose}
      />
      <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
        <List sx={{ bgcolor: 'background.paper' }}>
          {errandRedux.length ? ErrandsMemo : <Typography variant="h5">Nenhum recado para listar</Typography>}
        </List>
      </Grid>
    </>
  );
};

export default ListErrands;
