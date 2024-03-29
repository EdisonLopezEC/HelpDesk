import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import { width } from "@mui/system";
import { Stack, Typography } from "@mui/material";

export default function TemporaryDrawerComplete({
  fecha,
  asunto,
  remitente,
  mensaje,
  id,
  categoria,
  handleAttend,
  handleClose,
  observacion,
  fechaCompletado,
  isTransitionModal 
}) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  fecha = new Date(fecha);

  fechaCompletado = new Date(fechaCompletado)

  const fechaEc = fecha.toLocaleDateString('es-EC', {day: '2-digit', month: '2-digit', year: '2-digit'})
                 + ' '
                 + fecha.toLocaleTimeString('es-EC', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'});

 const fechaCompletadoEc  = fechaCompletado.toLocaleDateString('es-EC', {day: '2-digit', month: '2-digit', year: '2-digit'})
 + ' '
 + fechaCompletado.toLocaleTimeString('es-EC', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'});


  const regex = /<html\b[^>]*>([\s\S]*?)<\/html>/i;
  const match = mensaje.match(regex);
  const contenidoHtml = match ? match[0] : "";

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [state, setState] = React.useState({
    right: false,
  });

  const handleVerClick = (anchor) => {
    // toggleDrawer(anchor, true)
    setState({ ...state, [anchor]: true });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, toggleDrawer) => (
    <Box
      sx={!isMobile ? { width: 500 } : { width: 250 }}
      role="presentation"
      padding={5}
      maxeight={"80vh"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography id="transition-modal-title" variant="h6" component="h3">
        Información del Ticket Cerrado
      </Typography>
      <hr />
      <Divider />
      <hr />

      <Typography variant="h7" component="h5">
        Remitente
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        {remitente}
      </Typography>

      <hr />
      <Typography variant="h7" component="h5">
        Asunto
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        {asunto}
      </Typography>

      <hr />
      <Typography variant="h7" component="h5">
        Mensaje
      </Typography>
      <Typography
        id="transition-modal-description"
        sx={{ mt: 2 }}
        component="div"
        dangerouslySetInnerHTML={{
          __html: /<[a-z][\s\S]*>/i.test(mensaje)
            ? contenidoHtml
            : `${mensaje}`,
        }}
      />

      <hr/>
      <Typography variant="h7" component="h5">
        Area / Categoria
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        {
          categoria === "administracion" ? (
            categoria = categoria.charAt(0).toUpperCase() + categoria.slice(1),
            categoria.replace("o", "\u00F3")
          ):(categoria.charAt(0).toUpperCase() + categoria.slice(1))
        }
      </Typography>
      <hr />

      <Typography variant="h7" component="h5">
        Fecha y Hora de Inicio
      </Typography>    
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        {fechaEc}
      </Typography>
      <hr />
      <Typography variant="h7" component="h5">
        Fecha y Hora Completado
      </Typography>    
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        {fechaCompletadoEc}
      </Typography>
      <hr />

      
      <Typography variant="h7" component="h5">
        Observacion
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        {observacion}
      </Typography>


      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          onClick={() => {
            setState({ right: false });
          }}
        >
          Cerrar
        </Button>
      </Stack>
    </Box>
  );

  return (
    !isTransitionModal && <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={() => {
              // handleClose();
              handleVerClick(anchor);
            }}
          >
            Ver
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor, toggleDrawer)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// // import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from "@mui/material/ListItemText";
// import { width } from "@mui/system";
// import { Modal, Stack, Typography } from "@mui/material";
// export default function TemporaryDrawerComplete({ fecha, asunto, remitente, mensaje, id, categoria, handleAttend }) {
//   const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

//   React.useEffect(() => {
//     function handleResize() {
//       setIsMobile(window.innerWidth <= 768);
//     }

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const [openDrawer, setOpenDrawer] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpenDrawer(true);
//     setOpenModal(false);
//   };

//   const handleDrawerClose = () => {
//     setOpenDrawer(false);
//   };

//   const [openModal, setOpenModal] = React.useState(false);

//   const handleModalOpen = () => {
//     setOpenModal(true);
//   };

//   const handleModalClose = () => {
//     setOpenModal(false);
//   };

//   const list = (handleDrawerClose) => (
//     <Box
//       sx={!isMobile ? { width: 500 } : { width: 250 }}
//       role="presentation"
//       padding={5}
//       maxeight={"80vh"}
//       display={"flex"}
//       flexDirection={"column"}
//     >
//       <Stack direction="row" spacing={2} justifyContent="center">
//         <Button onClick={handleDrawerClose}>Aceptar</Button>
//       </Stack>
//     </Box>
//   );

//   return (
//     <div>
//       <Button onClick={handleModalOpen}>Ver</Button>
//       <Modal open={openModal} onClose={handleModalClose}>
//         <div>Contenido del modal</div>
//       </Modal>
//       <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
//         {list(handleDrawerClose)}
//       </Drawer>
//     </div>
//   );
// }
