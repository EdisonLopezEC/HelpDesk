
import React, { useState, useEffect, useContext } from "react";
import styles from "./styles/Technical.module.css";
import StickyHeadTable from "../components/StickyHeadTable";
import CardBoard from "../components/technicalComponents/CardBoard";
import CardProgress from "../components/technicalComponents/CardProgress";
import Chip from "@mui/material/Chip";
import { Button, Card, CircularProgress } from "@mui/material";
import TemporaryDrawer from "../components/TemporaryDrawer";
import CardComplete from "../components/CardComplete";
import axios from "axios";
import TransitionsModal from "../components/TransitionsModal";
import { UserContext } from "../context/UserContext";
import "animate.css";
import { StadisticsContext } from "../context/StadisticsContext";

const ClassifyPage = () => {
  //Listas del board

  const {stadisticsNumber, setStadisticsNumber} = useContext(StadisticsContext);


  useEffect(() => {
    document.title = "Tecnico";

  }, []);
  const [planningList, setPlanningList] = useState([]);
  const [assignedList, setassignedList] = useState([]);
  const [inPorgressList, setInPorgressList] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar si está cargando

  const [completeList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
    .get(`${process.env.REACT_APP_API_URLS}/email/receive-emails`)
      .then((res) => {
        console.log(res.data);
        const newPlanningList = [];
        const newassignedList = [];
        const newinProgressList = [];
        res.data.forEach((element) => {
          switch (element.estado) {
            case "En Proceso":
              newPlanningList.push(element);
              break;
            case "en espera":
              newassignedList.push(element);
              break;
            case "completado":
              newinProgressList.push(element);
              break;
            default:
              break;
          }
        });
        setPlanningList((prevList) => [...newPlanningList, ...prevList]);
        setassignedList((prevList) => [...newassignedList, ...prevList]);
        setInPorgressList((prevList) => [...newinProgressList, ...prevList]);
        setIsLoading(false);
        setStadisticsNumber({completado: newinProgressList.length})
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [open, setOpen] = useState(false);

  // Actualizar ticket
  const handleSend = (ticketId,remitente) => {
    axios
      .put(`${process.env.REACT_APP_API_URLS}/tickets/${ticketId}`, {
        estado: "en espera",
      })
      .then((response) => {
        
        // ENVIAR EL MENSAJE DEL TECNICO
        axios.post(`${process.env.REACT_APP_API_URLS}/tickets/techicalProgress`, null, {
          params: { remitente: remitente }
        }).then((response) => {
          console.log("se envio tecnico")
        }).catch((error) =>{
          console.log(error)
        });

        setPlanningList(
          planningList.filter((ticket) => ticket.id !== ticketId)
        );
        const ticket = planningList.find((ticket) => ticket.id === ticketId);
        setassignedList([ticket, ...assignedList]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAttend = (ticketId, remitente) => {
    axios
      .put(`${process.env.REACT_APP_API_URLS}/tickets/${ticketId}`, {
        estado: "completado",
      })
      .then((response) => {
        axios.post(`${process.env.REACT_APP_API_URLS}/tickets/technicalComplete`, null, {
          params: { remitente: remitente }
        }).then((response) => {
          console.log("se envio tecnico")
        }).catch((error) =>{
          console.log(error)
        });

        setassignedList(
          assignedList.filter((ticket) => ticket.id !== ticketId)
        );
        const ticket = assignedList.find((ticket) => ticket.id === ticketId);
        setInPorgressList([ticket, ...inPorgressList]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { user } = useContext(UserContext);
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Gestiona los tickets de técnicos</h1>
      {/* <StickyHeadTable/> */}
      <div className={styles.containerGrid}>
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
            ? planningList.map((ticket) => (
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

        {/* Cuadro 2 */}
        <div className={styles.containerCards}>
          <Chip label="En Progreso" color="warning" className={styles.chip} />
          <hr />
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
            ? assignedList.map((ticket) => (
                  <CardProgress
                    mensaje={ticket.mensaje}
                    key={ticket.id}
                    asunto={ticket.asunto}
                    fecha={ticket.fecha}
                    remitente={ticket.remitente}
                    id={ticket.id}
                    categoria={ticket.categoria}
                    handleAttend={handleAttend}
                  />
              ))
            : null}

          {/* Boton para agregar */}
          <hr />
          {/* <Button variant="outlined">+</Button> */}
        </div>

        {/* Cuadro 3 */}
        <div className={styles.containerCards}>
          <Chip label="Completado" color="success" className={styles.chip} />
          <hr />
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
            ? inPorgressList.map((ticket) => (
                  <CardComplete
                    mensaje={ticket.mensaje}
                    key={ticket.id}
                    asunto={ticket.asunto}
                    fecha={ticket.fecha}
                    remitente={ticket.remitente}
                    id={ticket.id}
                    categoria={ticket.categoria}
                    handleAttend={handleAttend}
                  />
              ))
            : null}

          {/* <CardComplete
            asunto="Reparacion PC"
            categoria="Soporte"
            id={123}
            mensaje="Buenas tardes estimado ingeniero Jorge Freire, quisiera por favor se me ayude con la reparacion de una PC que se encuentra en muy mal estado dado que no se a usado la misma desde hace 3 años."
          /> */}
          {/* Boton para agregar */}
          <hr />
          {/* <Button variant="outlined">+</Button> */}
        </div>

        {/* Cuadro 4 */}
        {/* <div
          style={{
            paddingTop: "50px",
          }}
        >
          <Chip
            label="En proceso"
            variant="primary"
            onClick={handleClick}
            color="primary"
            style={{ width: "100%" }}
          />
          <hr />
          <Chip
            label="En espera"
            onClick={handleClick}
            color="warning"
            style={{ width: "100%" }}
          />
          <TransitionsModal
            abrir={open}
            handleCloseModal={handleClose}
            list={inPorgressList}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ClassifyPage;
