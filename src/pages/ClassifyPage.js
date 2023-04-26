
import React, { useState, useEffect, useContext } from "react";
import styles from "./styles/ClassifyPage.module.css";
import StickyHeadTable from "../components/StickyHeadTable";
import CardBoard from "../components/CardBoard";
import Chip from "@mui/material/Chip";
import { Button, Card, CircularProgress } from "@mui/material";
import TemporaryDrawer from "../components/TemporaryDrawer";
import CardProgress from "../components/CardProgress";
import CardComplete from "../components/CardComplete";
import axios from "axios";
import TransitionsModal from "../components/TransitionsModal";
import { UserContext } from "../context/UserContext";
import "animate.css";


const ClassifyPage = () => {
  //Listas del board

  useEffect(() => {
    document.title = "Gestionar";
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
            case "Solicitado":
              newPlanningList.push(element);
              break;
            case "Asignado":
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [open, setOpen] = useState(false);

  // Actualizar ticket
  const handleSend = (ticketId, categoria) => {
    axios
      .put(`${process.env.REACT_APP_API_URLS}/tickets/${ticketId}`, {
        categoria: categoria,
        estado: "Asignado",
      })
      .then((response) => {
        console.log(response);
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

  const handleAttend = (ticketId, categoria) => {
    axios
      .put(`${process.env.REACT_APP_API_URLS}/tickets/${ticketId}`, {
        estado: "En Proceso",
        categoria: categoria,
      })
      .then((response) => {
        console.log(response);
        setassignedList(
          assignedList.filter((ticket) => ticket.id !== ticketId)
        );
     
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
      <h1 className={styles.header}>Gestiona los tickets</h1>
      {/* <StickyHeadTable/> */}
      <div className={styles.containerGrid}>
        {/* Cuadro 1 */}
        <div className={styles.containerCards}>
          <Chip label="Categorizar" color="primary" className={styles.chip} />
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
          <Chip label="Atender" color="warning" className={styles.chip} />
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
          {/* Boton para agregar */}
          <hr />
          {/* <Button variant="outlined">+</Button> */}
        </div>

        {/* Cuadro 4 */}
        <div
          style={{
            paddingTop: "50px",
          }}
        >
          <Chip
            label="Solicitado"
            variant="primary"
            onClick={handleClick}
            color="primary"
            style={{ width: "100%" }}
          />
          <hr />
          <Chip
            label="En Progreso"
            onClick={handleClick}
            color="warning"
            style={{ width: "100%" }}
          />
          <TransitionsModal
            abrir={open}
            handleCloseModal={handleClose}
            list={inPorgressList}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassifyPage;
