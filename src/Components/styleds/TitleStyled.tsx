import { Typography, styled } from '@mui/material';

const TitleStyled = styled(Typography)(({ theme }) => ({
  fontFamily: 'sans-serif',
  color: theme.palette.primary.main,
  textAlign: 'center'
}));

export default TitleStyled;