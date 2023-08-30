

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";
// import axios from "axios";
import axios from "../config/axios";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, Snackbar } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://edisonlg-ec.vercel.app/">
        Edison López
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const { setUser } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [errorCredentials, setErrorCredentials] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Validar que los campos no estén vacíos
    if (!formData.get("email") || !formData.get("password")) {
      setEmpty(true);
      // alert("Por favor, ingrese su email y contraseña.");
      return;
    }

    // Evitar envío de múltiples solicitudes mientras se está cargando
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/usuarios/login", {
        dsgusCuenta: formData.get("email"),
        dsgusClave: formData.get("password"),
      });

      Cookies.set("token", response.data.token, {expires:1, sameSite:"stict"});
      // Cookies.set("token", response.data.token,{expires:1});



      setUser({ login: true, nombres: response.data.nombres, rol: response.data.rol });
    } catch (error) {
      setErrorCredentials(true);
    }

    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.eeasa.com.ec/content/uploads/2022/04/WhatsApp-Image-2022-04-11-at-5.09.13-PM.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >


            <Snackbar
              open={empty}
              autoHideDuration={4000}
              onClose={() => {
                setEmpty(false);
              }}
            >
              <Alert
                severity="warning"
                sx={{ width: "100%" }}
                onClose={() => {
                  setEmpty(false);
                }}
              >
                Por favor, ingrese su email y contraseña!.
              </Alert>
            </Snackbar>

            <Snackbar
              open={errorCredentials}
              autoHideDuration={4000}
              onClose={() => {
                setErrorCredentials(false);
              }}
            >
              <Alert
                severity="error"
                sx={{ width: "100%" }}
                onClose={() => {
                  setErrorCredentials(false);
                }}
              >
                El nombre de usuario o la contraseña son incorrectos!. 
              </Alert>
            </Snackbar>


            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              HELPDESK
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}