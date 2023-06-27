import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { width } from "@mui/system";
import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function TemporaryDrawer({
  fecha,
  asunto,
  remitente,
  mensaje,
  id,
  handleSend,
}) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  const regex = /<html\b[^>]*>([\s\S]*?)<\/html>/i;
  const match = mensaje.match(regex);
  const contenidoHtml = match ? match[0] : "";

  fecha = new Date(fecha);

  const fechaEc =
    fecha.toLocaleDateString("es-EC", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }) +
    " " +
    fecha.toLocaleTimeString("es-EC", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const selectRef = React.useRef(null);
  const [errorCategory, setErrorCategory] = useState(false);

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleClose = (anchor) => {
    toggleDrawer(anchor, false);
  };

  const [selectedValue, setSelectedValue] = React.useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const list = (anchor) => (
    <Box
      sx={!isMobile ? { width: 500 } : { width: 250 }}
      role="presentation"
      padding={5}
      maxeight={"80vh"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography id="transition-modal-title" variant="h6" component="h3">
        Clasificar el ticket
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

      <hr />
      <Typography variant="h7" component="h5">
        Fecha
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        {fechaEc}
        {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
      </Typography>

      <hr />
      <Typography variant="h7" component="h5">
        Categoria
      </Typography>
      <select
        name="select"
        className="select"
        defaultValue=""
        onChange={handleChange}
      >
        <option value="" disabled>
          Seleccione una opción...
        </option>
        <option value="infraestructura">Infraestructura</option>
        <option value="desarrollo">Desarrollo</option>
        <option value="administracion">Administración</option>
        <option value="soporte">Soporte</option>
      </select>

      <hr />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            setState({ right: false });
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (selectedValue === "") {
              setErrorCategory(true);
              return;
            }
            handleSend(id, selectedValue);
            setState({ right: false });
          }}
        >
          Enviar
        </Button>
      </Stack>

      <Snackbar
        open={errorCategory}
        autoHideDuration={4000}
        onClose={() => {
          setErrorCategory(false);
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => {
            setErrorCategory(false);
          }}
        >
          Seleccione una categoría!.
        </Alert>
      </Snackbar>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Administrar</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
