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
  overflow:"scroll",
  maxHeight: "80vh"
};
export default function TransitionsModal({ abrir, handleCloseModal, list }) {
  const [open, setOpen] = React.useState(abrir);
  const handleClose = handleCloseModal;
  const [lista, setLista] = React.useState([]);
  React.useEffect(() => {
    setOpen(abrir);
  }, [abrir]);
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
            <Typography id="transition-modal-title" variant="h6" component="h3">
              Tickets en Proceso
            </Typography>
            {/* {
              list.map((ticket) => (
                <CardComplete
                  remitente={ticket.remitente}
                  categoria={ticket.categoria}
                  asunto={ticket.asunto}
                  fecha={ticket.fecha}
                  id={ticket.id}
                  mensaje={ticket.mensaje}
                  key={ticket.id}
                />
              ))
            } */}
            {
              list.length >=1 ? ( list.map((ticket) => (
                <>
                    <CardComplete
                        handleClose={handleClose}
                        remitente={ticket.remitente}
                        categoria={ticket.categoria}
                        id={ticket.id}
                        asunto={ticket.asunto}
                        fecha={ticket.fecha}
                        mensaje={ticket.mensaje}
                        key={ticket.id}
                    />
                    <br/>
                </>
          
              ))) : <div></div>
            }
            <Stack direction="row" spacing={2}
              justifyContent="center"
            >
              <Button variant="outlined"
                onClick={()=>{
                  handleClose()
                }}
              >Cerrar</Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
