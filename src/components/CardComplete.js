
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TemporaryDrawer from './TemporaryDrawer';
import TemporaryDrawerComplete from './TemporaryDrawerComplete';

const CardComplete = ({asunto,fecha,remitente,mensaje, id, handleSend, categoria, handleClose}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleCardClick = () => {
    setIsDrawerOpen(true);
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  }

  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="5"
          image="/1.svg"
          alt="green iguana"
        />
        <CardContent
        sx={{ maxHeight: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {asunto}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mensaje}
          </Typography>
        </CardContent>
      </CardActionArea>
      <TemporaryDrawerComplete open={isDrawerOpen} onClose={handleDrawerClose} fecha={fecha} asunto={asunto} mensaje={mensaje} remitente={remitente} id={id} categoria={categoria} handleClose={handleClose}/>
    </Card>
    <hr/>
    </>
    
  );
}
export default CardComplete;
