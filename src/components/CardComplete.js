
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import TemporaryDrawer from './TemporaryDrawer';
import TemporaryDrawerComplete from './TemporaryDrawerComplete';

const CardComplete = ({asunto,fecha,remitente,mensaje, id, handleSend, categoria, handleClose, observacion, fechaCompletado, handleOpenDrawer, isTransitionModal}) => {
  
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  
const MAX_TEXT_LENGTH = 170; // Define el número máximo de caracteres que se mostrarán
const MAX_TEXT_ASUNTO_LENGHT = 20;
const shortenedText = mensaje.length > MAX_TEXT_LENGTH ? `${mensaje.substring(0, MAX_TEXT_LENGTH)}...` : mensaje;
const shortenedAsunto = asunto.length > MAX_TEXT_ASUNTO_LENGHT ? `${asunto.substring(0, MAX_TEXT_ASUNTO_LENGHT)}...` : asunto;


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
        sx={{ maxHeight: '120px', minHeight:'120px', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: '200px'}}
        >
          <Typography gutterBottom variant="h5" component="div"  sx={{overflow: "hidden", textOverflow: "ellipsis"}}>
            {asunto}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{overflow: "hidden", textOverflow: "ellipsis"}}>
            {shortenedText}
          </Typography>
        </CardContent>
      </CardActionArea>
      <TemporaryDrawerComplete open={isDrawerOpen} handleDrawerClose={handleDrawerClose} fecha={fecha} asunto={asunto} mensaje={mensaje} remitente={remitente} id={id} categoria={categoria} handleClose={handleClose} observacion={observacion} fechaCompletado={fechaCompletado} isTransitionModal={isTransitionModal}/>
    </Card>
    <hr/>
    </>
    
  );
}
export default CardComplete;
