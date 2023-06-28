import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { router } from "./router";
import { routerTechnical } from "./router/routerTechnical";
import { routerSorter } from "./router/routerSorter";

import { UserContext } from "./context/UserContext";
import SignInSide from "./components/SignInSide";
import { StadisticsContext } from "./context/StadisticsContext";

import axios from "./config/axios";
import ClassifyPage from "./pages/ClassifyPage";

function App() {
  const [stadisticsNumber, setStadisticsNumber] = useState([]);
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return { login: !!token };
  });

  const [completado, setCompletado] = useState();
  const [enEspera, setEnEspera] = useState();
  const [asignado, setAsignado] = useState();
  const [solicitado, setSolicitado] = useState();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/usuarios/userInfo", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("ENTRO ACA");
          console.log(response);
          const { data } = response;
          if(data.estadoCuenta !== "ACTIVO"){
            localStorage.removeItem("token");
            setUser({ login: false });
            return;
          }
          console.log("este el rol", data.userId);
          setUser({ login: true, rol: data.userId });
        })
        .catch((error) => {
          localStorage.removeItem("token");
          setUser({ login: false });
        });
    } else {
      setUser({ login: false });
    }
  }, []);

  if (user.login && user.rol === "ROLE_HELPDESK") {
    return (
      <StadisticsContext.Provider
        value={{ stadisticsNumber, setStadisticsNumber }}
      >
        <UserContext.Provider value={{ user, setUser }}>
          <RouterProvider router={routerTechnical}>
            <Routes />
          </RouterProvider>
        </UserContext.Provider>
      </StadisticsContext.Provider>
    );
  } else if (user.login && user.rol === "ROLE_HELPDESK_TECNICO") {
    console.log('es tecnicoooo')
    return (
      <StadisticsContext.Provider
        value={{ stadisticsNumber, setStadisticsNumber }}
      >
        <UserContext.Provider value={{ user, setUser }}>
          <RouterProvider router={router}>
            <Routes />
          </RouterProvider>
        </UserContext.Provider>
      </StadisticsContext.Provider>
    );

  } else if (user.login && user.rol === "ROLE_HELPDESK_CATEGORIZADOR") {
    return (
      <StadisticsContext.Provider
        value={{ stadisticsNumber, setStadisticsNumber }}
      >
        <UserContext.Provider value={{ user, setUser }}>
          <RouterProvider router={routerSorter}>
            <Routes />
          </RouterProvider>
        </UserContext.Provider>
      </StadisticsContext.Provider>
    );
  }
  // } else {
  //   return (
  //     <StadisticsContext.Provider
  //       value={{ stadisticsNumber, setStadisticsNumber }}
  //     >
  //       <UserContext.Provider value={{ user, setUser }}>
  //         {console.log("No entro a ninguno")}
  //         <SignInSide />
  //       </UserContext.Provider>
  //     </StadisticsContext.Provider>
  //   );
  // }
  if(!user.login){
        return (
      <StadisticsContext.Provider
        value={{ stadisticsNumber, setStadisticsNumber }}
      >
        <UserContext.Provider value={{ user, setUser }}>
          {console.log("No entro a ninguno")}
          <SignInSide />
        </UserContext.Provider>
      </StadisticsContext.Provider>
    );

  }
}

createRoot(document.getElementById("root")).render(<App />);
