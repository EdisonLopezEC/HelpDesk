
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import TemporaryDrawer from './TemporaryDrawer';
import TemporaryDrawerComplete from './TemporaryDrawerComplete';

const CardComplete = ({asunto,fecha,remitente,mensaje, id, handleSend, categoria, handleClose, observacion, fechaCompletado, handleOpenDrawer}) => {
  
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  

  const handleCardClick = () => {
    setIsDrawerOpen(true);
    handleOpenDrawer();
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  }

  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleCardClick}>
      <Box sx={{ height: 3, backgroundColor: 'gray' }} /> {/* Reemplazar CardMedia con un Box */}
        <CardContent
        sx={{ maxHeight: '120px', minHeight:'120px', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {asunto}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mensaje}
          </Typography>
        </CardContent>
      </CardActionArea>
      <TemporaryDrawerComplete open={isDrawerOpen} handleDrawerClose={handleDrawerClose} fecha={fecha} asunto={asunto} mensaje={mensaje} remitente={remitente} id={id} categoria={categoria} handleClose={handleClose} observacion={observacion} fechaCompletado={fechaCompletado} />
    </Card>
    <hr/>
    </>
    
  );
}
export default CardComplete;
