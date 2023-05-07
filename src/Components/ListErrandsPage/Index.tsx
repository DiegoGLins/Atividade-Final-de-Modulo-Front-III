import React, { useMemo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar, Divider, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrandsType from '../../types/ErrandsType';
import { removeErrands } from '../../store/modules/ListErrandsSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const ListErrands: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userErrands= useAppSelector(state => state.users.loggedUser.errands);

  const [errandsLocal, setErrandsLocal] = useState<ErrandsType[]>([]);

  useEffect(() => {
    setErrandsLocal([...userErrands]);
  }, [userErrands]);

  const handleDelete = (itemDelete: ErrandsType) => {
    dispatch(removeErrands(itemDelete.errandsId));
  };

  const handleEdit = (itemEdit: ErrandsType) => {
    navigate(`/edit-Errands/${itemEdit.userId}`);
  };


  const ErrandsMemo = useMemo(() => {
    return userErrands.map((item: ErrandsType) => {
      return (
        <React.Fragment key={item.errandsId}>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(item)} edge="end" aria-label="delete">
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
        </React.Fragment>
      );
    });
  }, [errandsLocal]);

  return (
    <List sx={{ bgcolor: 'background.paper' }}>
      {errandsLocal.length ? ErrandsMemo : <Typography variant="body1">Nenhum recado para listar</Typography>}
    </List>
  );
};

export default ListErrands;
