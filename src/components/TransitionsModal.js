import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import CardBoard from "./CardBoard";
import { maxHeight } from "@mui/system";
import CardComplete from "./CardComplete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  borderColor: "#53555d",
  maxHeight: "100%",
  overflow: "scroll",
  maxHeight: "80vh",
};

export default function TransitionsModal({
  abrir,
  handleCloseModal,
  list,
  titulo,
}) {
  const [open, setOpen] = React.useState(abrir);
  const handleClose = handleCloseModal;
  const [lista, setLista] = React.useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false); // Nuevo estado para controlar el TemporaryDrawer

  React.useEffect(() => {
    setOpen(abrir);
  }, [abrir]);

  const handleCloseModify = () => {
    setOpen(false); // Cerrar el TransitionModal estableciendo el estado open en false
    handleCloseModal(); // Llamar a la función handleCloseModal pasada como prop
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(false); // Abrir el TemporaryDrawer estableciendo el estado isDrawerOpen en true
    handleCloseModify(); // Cerrar el TransitionModal llamando a la función handleCloseModify
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                position: "sticky",
                top: -32,
                bgcolor: "background.paper",
                zIndex: 1,
                backgroundColor: "#e1e1e1",
                // marginTop: "-2rem",
                height: "2rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h6" component="h3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {titulo}
              </Typography>
              <Button
                onClick={
                  handleClose
                }
              >x</Button>
              <br />
            </Box>
            <br />



            {list.length >= 1 ? (
              list
              .map((ticket) => (
                // <div>
                  <CardComplete
                    handleClose={handleCloseModify}
                    handleOpenDrawer={handleOpenDrawer}
                    remitente={ticket.remitente}
                    categoria={ticket.categoria}
                    id={ticket.id}
                    asunto={ticket.asunto}
                    fecha={ticket.fecha}
                    mensaje={ticket.mensaje}
                    key={ticket.asunto+ticket.id}
                    isTransitionModal={true}
                  />
                  // <br />
                // </div>
              ))
            ) : (
              <div></div>
            )}
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                onClick={() => {
                  handleClose();
                }}
              >
                Cerrar
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
