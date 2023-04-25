import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Hidden } from "@mui/material";
import TemporaryDrawer from "./TemporaryDrawer";
import TemporaryDrawerProgress from "./TemporaryDrawerProgress";

const CardProgress = ({ asunto, fecha, remitente, mensaje, id, categoria, handleAttend }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

const MAX_TEXT_LENGTH = 170; // Define el número máximo de caracteres que se mostrarán
const shortenedText = mensaje.length > MAX_TEXT_LENGTH ? `${mensaje.substring(0, MAX_TEXT_LENGTH)}...` : mensaje;


  const handleCardClick = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

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
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{overflow: "hidden", textOverflow: "ellipsis"}}>
            <strong>{asunto}</strong>: {shortenedText}
          </Typography>
          <Typography variant="h6" color="text.secondary"></Typography>
        </CardContent>
      </CardActionArea>
      <TemporaryDrawerProgress
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        fecha={fecha}
        asunto={asunto}
        mensaje={mensaje}
        remitente={remitente}
        id={id}
        categoria={categoria}
        handleAttend={handleAttend}
      />
    </Card>
    <hr/>
    </>
  );
};
export default CardProgress;
