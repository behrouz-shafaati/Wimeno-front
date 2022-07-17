import IconButton from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';

const BgIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

export default BgIconButton;