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
          console.log("este el rol", data.userId);
          setUser({ login: true, rol: data.userId });

          // axios.get(`${process.env.REACT_APP_API_URLS}/tickets/ticketsComplete`)
          // .then((response)=>{
          //   const { data } = response;
          //   setCompletado({completado: data.cantidad});
          // }).catch((error) =>{
          //   setCompletado({completado: 0});
          // })

          // axios.get(`${process.env.REACT_APP_API_URLS}/tickets/ticketsRequired`)
          // .then((response)=>{
          //   const { data } = response;
          //   setSolicitado({solicitado: data.cantidad});
          // }).catch((error) =>{
          //   setSolicitado({solicitado: 0});
          // })

          // axios.get(`${process.env.REACT_APP_API_URLS}/tickets/ticketsHold`)
          // .then((response)=>{
          //   const { data } = response;
          //   setEnEspera({enEspera: data.cantidad});
          // }).catch((error) =>{
          //   setEnEspera({enEspera: 0});
          // })

          // axios.get(`${process.env.REACT_APP_API_URLS}/tickets/ticketsAsigned`)
          // .then((response)=>{
          //   const { data } = response;
          //   setAsignado({asignado: data.cantidad});
          // }).catch((error) =>{
          //   setAsignado({asignado: 0});
          // })

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
          <RouterProvider router={router}>
            <Routes />
          </RouterProvider>
        </UserContext.Provider>
      </StadisticsContext.Provider>
    );
  } else if (user.login && user.rol === "ROLE_HELPDESK_TECNICO") {
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
