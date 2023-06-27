import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import TemporaryDrawer from './TemporaryDrawer';

const MAX_TEXT_LENGTH = 200; // Define el número máximo de caracteres que se mostrarán

const CardBoard = ({asunto,fecha,remitente,mensaje, id, handleSend}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleCardClick = () => {
    setIsDrawerOpen(true);
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  }

  const shortenedText = mensaje.length > MAX_TEXT_LENGTH ? `${mensaje.substring(0, MAX_TEXT_LENGTH)}...` : mensaje;

  return (
    <>
    <Card sx={{ maxWidth: 345}}>
      <CardActionArea onClick={handleCardClick}>
      <Box sx={{ height: 3, backgroundColor: 'gray' }} /> {/* Reemplazar CardMedia con un Box */}
        <CardContent
        sx={{ maxHeight: '120px', minHeight:'120px', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {asunto}
          </Typography>
          <Typography variant="body2" color="text.secondary"
          >
            {shortenedText}
          </Typography>
        </CardContent>
      </CardActionArea>
      <TemporaryDrawer open={isDrawerOpen} onClose={handleDrawerClose} fecha={fecha} asunto={asunto} mensaje={mensaje} remitente={remitente} id={id} handleSend={handleSend}/>
    </Card>
    <hr/>
    </>
  );
}

export default CardBoard;
