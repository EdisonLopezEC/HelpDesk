import React, { useState, useEffect, useContext } from "react";
import styles from "./styles/ClassifyPage.module.css";
import CardBoard from "../components/CardBoard";
import Chip from "@mui/material/Chip";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { StadisticsContext } from "../context/StadisticsContext";
import "animate.css";

const SorterPage = () => {
  //Listas del board

  useEffect(() => {
    document.title = "Categorizar";
  }, []);
  const [planningList, setPlanningList] = useState([]);
  const [assignedList, setassignedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar si está cargando
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URLS}/email/receive-emails`)
      .then((res) => {
        console.log(res.data);
        const newPlanningList = [];
        res.data.forEach((element) => {
          switch (element.estado) {
            case "Solicitado":
              newPlanningList.push(element);
              break;
            default:
              break;
          }
        });
        setPlanningList((prevList) => [...newPlanningList, ...prevList]);
        setIsLoading(false);
        setStadisticsNumber({solicitado: planningList.length})
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Actualizar ticket
  const handleSend = (ticketId, categoria) => {
    axios
      .put(`${process.env.REACT_APP_API_URLS}/tickets/${ticketId}`, {
        categoria: categoria,
        estado: "Asignado",
      },config)
      .then((response) => {
        console.log("Entro al planing");
        setPlanningList(
          planningList.filter((ticket) => ticket.id !== ticketId)
        );
        const ticket = planningList.find((ticket) => ticket.id === ticketId);
        ticket.categoria = categoria;
        setassignedList([ticket, ...assignedList]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { setStadisticsNumber} = useContext(StadisticsContext);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Gestiona los tickets</h1>
      {/* <StickyHeadTable/> */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'        
        }}
      >
        {/* Cuadro 1 */}
        <div className={styles.containerCards}>
          <Chip label="Planeado" color="primary" className={styles.chip} />
          <hr />
          {/* {console.log('aqui', planningList)} */}

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : null}

          {!isLoading
            ? planningList
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .map((ticket) => (
                <CardBoard
                  mensaje={ticket.mensaje}
                  key={ticket.id}
                  asunto={ticket.asunto}
                  fecha={ticket.fecha}
                  remitente={ticket.remitente}
                  id={ticket.id}
                  handleSend={handleSend}
                />
              ))
            : null}
          {/* <div></div> */}
          {/* Boton para agregar */}
          <hr />
          {/* <Button variant="outlined">+</Button> */}
        </div> 
      </div>
    </div>
  );
};

export default SorterPage;
