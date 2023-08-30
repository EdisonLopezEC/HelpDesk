import React, { useState, useEffect, useContext } from "react";
import styles from "./styles/ClassifyPage.module.css";
import CardBoard from "../components/CardBoard";
import Chip from "@mui/material/Chip";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "../config/axios";
import { StadisticsContext } from "../context/StadisticsContext";
import "animate.css";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import BoxComponent from "../components/BoxComponent";


const SorterPage = () => {
  //Listas del board

  const [pageSize, setPageSize] = useState(5); // Puedes ajustar el tamaño de página según tus necesidades
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada
  const [selectedMonth, setSelectedMonth] = useState(""); // Estado para el mes seleccionado
  const [totalPagesFilter, setTotalPagesFilter] = useState(0);
  const [selectedYear, setSelectedYear] = useState(
    localStorage.getItem("selectedYear")
  );
  const [loadingBox, setLoadingBox] = useState(false);

  const perPageOptions = [5, 10, "all"];

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    document.title = "Categorizar";
  }, []);
  const [planningList, setPlanningList] = useState([]);
  const [assignedList, setassignedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar si está cargando

  useEffect(() => {
    setLoadingBox(true);
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URLS}/tickets`)
      .then((res) => {
        // console.log(res.data);
        const newPlanningList = [];

        res.data.forEach((element) => {
          const fecha = new Date(element.fecha);
          const fechaEc = fecha.toLocaleDateString("es-EC", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          const elementYear = fechaEc.slice(6, 8); // Obtener los últimos dos dígitos del año
          const aux = selectedYear.slice(2, 4);

          switch (element.estado) {
            case "Solicitado":
              if (elementYear === aux) {
                newPlanningList.push(element);
              }
              break;
            default:
              break;
          }
        });
        setPlanningList((prevList) => [...newPlanningList, ...prevList]);
        setIsLoading(false);
        setLoadingBox(false);
        setStadisticsNumber({ solicitado: planningList.length });
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  //Eliminar ticket
  const handleDelete = (ticketId) => {
    setLoadingBox(true);
    axios
      .put(`${process.env.REACT_APP_API_URLS}/tickets/${ticketId}`, {
        categoria: null,
        estado: "cancelado",
      })
      .then((response) => {
        // console.log(response);
        setPlanningList(
          planningList.filter((ticket) => ticket.id !== ticketId)
        );
        setLoadingBox(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Actualizar ticket
  const handleSend = (ticketId, categoria) => {
    setLoadingBox(true);
    axios
      .put(`${process.env.REACT_APP_API_URLS}/tickets/${ticketId}`, {
        categoria: categoria,
        estado: "Asignado",
      })
      .then((response) => {
        // console.log("Entro al planing");
        setPlanningList(
          planningList.filter((ticket) => ticket.id !== ticketId)
        );
        const ticket = planningList.find((ticket) => ticket.id === ticketId);
        ticket.categoria = categoria;
        setassignedList([ticket, ...assignedList]);
        setLoadingBox(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const maxLength = Math.max(planningList.length);

  const allPage = Math.ceil(maxLength / pageSize);

  const indexOfLastCard = currentPage * pageSize;
  const indexOfFirstCard = indexOfLastCard - pageSize;

  const visiblePlanningList = planningList
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    // .slice(indexOfFirstCard, indexOfLastCard);

  const [dateFilteredPlanningList, setDateFilteredPlanningList] = useState();

  // const planningListLength = dateFilteredPlanningList
  //   ? dateFilteredPlanningList.length
  //   : 0;

  // const allPageFilter = Math.ceil(planningListLength / pageSize) - 1 || 0;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    const dateFilteredPlanningList = visiblePlanningList.filter((ticket) => {
      const ticketDate = new Date(ticket.fecha);
      const ticketMonth = ticketDate.getMonth(); // Obtener el mes del ticket (0-11)

      if (selectedMonth !== "" && selectedMonth !== ticketMonth) {
        return false; // Filtrar si el mes seleccionado no coincide
      }

      // if (selectedCategory !== "" && selectedCategory !== ticket.categoria) {
      //   return false; // Filtrar si la categoría seleccionada no coincide
      // }

      return true; // Mantener el ticket si pasa los filtros de mes y categoría
    });
  
    setDateFilteredPlanningList(
      dateFilteredPlanningList.slice(indexOfFirstCard, indexOfLastCard)
    );
    const totalFilteredTicket = Math.max(
      dateFilteredPlanningList.length
    );
    setTotalPagesFilter(totalFilteredTicket);

  
  }, [
    selectedMonth,
    indexOfFirstCard,
    indexOfLastCard,
    planningList,
  ])
  

  const { setStadisticsNumber } = useContext(StadisticsContext);

  return (
    <div className={styles.container}>

{
  loadingBox ? (
    <div
    >
      <div className={`${styles.overlay} ${styles.fadeIn}`}>
        {/* <div className={styles.overlayContent}> */}
          <BoxComponent />
        {/* </div> */}
      </div>
    </div>
  ) : null
}

      <div
        className={styles.header}
        style={{
          alignItems: "center",
        }}
      >
        <h1
          style={{
            marginRight: "20px",
          }}
        >
          Gestiona los tickets
        </h1>

        <Button
          aria-label="delete"
          onClick={handleClick}
          variant={
            selectedMonth !== "" || selectedCategory !== ""
              ? "contained"
              : "text"
          }
          endIcon={
            selectedMonth !== "" || selectedCategory !== "" ? (
              <FilterAltOffIcon />
            ) : (
              <FilterAltIcon />
            )
          }
        >
          Filtrar
        </Button>
      </div>

      {/* DIALOG */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Seleccionar el filtro:</DialogTitle>
        <DialogContent>

        <FormControl
            style={{
              width: "15vw",
            }}
          >
            <InputLabel>Mes</InputLabel>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value={0}>Enero</MenuItem>
              <MenuItem value={1}>Febrero</MenuItem>
              <MenuItem value={2}>Marzo</MenuItem>
              <MenuItem value={3}>Abril</MenuItem>
              <MenuItem value={4}>Mayo</MenuItem>
              <MenuItem value={5}>Junio</MenuItem>
              <MenuItem value={6}>Julio</MenuItem>
              <MenuItem value={7}>Agosto</MenuItem>
              <MenuItem value={8}>Septiembre</MenuItem>
              <MenuItem value={9}>Octubre</MenuItem>
              <MenuItem value={10}>Noviembre</MenuItem>
              <MenuItem value={11}>Diciembre</MenuItem>

              {/* Agregar más meses */}
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* <StickyHeadTable/> */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
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

          {/* {(!isLoading  && selectedMonth !== "")
            ? (dateFilteredPlanningList.length > 0) ? (
              dateFilteredPlanningList
              .map((ticket) => (
                <CardBoard
                  mensaje={ticket.mensaje}
                  key={ticket.id}
                  asunto={ticket.asunto}
                  fecha={ticket.fecha}
                  remitente={ticket.remitente}
                  id={ticket.id}
                  handleSend={handleSend}
                  handleDelete={handleDelete}
                />
              )))
      :              visiblePlanningList
                // .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .map((ticket) => (
                  <CardBoard
                    mensaje={ticket.mensaje}
                    key={ticket.id}
                    asunto={ticket.asunto}
                    fecha={ticket.fecha}
                    remitente={ticket.remitente}
                    id={ticket.id}
                    handleSend={handleSend}
                    handleDelete={handleDelete}
                  />
                ))): !isLoading ? (
                  <p>No hay tickets disponibles.</p>
                ) : null 
          )} */}


          {!isLoading && (selectedMonth !== "") ? (
            dateFilteredPlanningList.length > 0 ? (
              dateFilteredPlanningList
                // .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .map((ticket) => (
                  <CardBoard
                    mensaje={ticket.mensaje}
                    key={ticket.id}
                    asunto={ticket.asunto}
                    fecha={ticket.fecha}
                    remitente={ticket.remitente}
                    id={ticket.id}
                    handleSend={handleSend}
                    categoria={ticket.categoria}
                    handleDelete={handleDelete}
                  />
                ))
            ) : !isLoading ? (
              <p>No hay tickets disponibles.</p>
            ) : null
          ) : visiblePlanningList.length > 0 ? (
            visiblePlanningList
              // .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .map((ticket) => (
                <CardBoard
                  mensaje={ticket.mensaje}
                  key={ticket.id}
                  asunto={ticket.asunto}
                  fecha={ticket.fecha}
                  remitente={ticket.remitente}
                  id={ticket.id}
                  handleSend={handleSend}
                  categoria={ticket.categoria}
                  handleDelete={handleDelete}

                />
                // console.log("FITRO TICKET ",ticket)
              ))
          ) : !isLoading ? (
            <p>No hay tickets disponibles.</p>
          ) : null}

          <hr />
          {/* <Button variant="outlined">+</Button> */}
        </div>
      </div>

      {/* ===PAGINADOR===  */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={styles["pagination-container"]}>
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            variant="outlined"
            style={{
              width: "10%",
              height: "10%",
              fontSize: ".5rem",
            }}
          >
            Anterior
          </Button>
          <span
            style={{
              fontSize: ".9rem",
              marginRight: "8px",
              marginLeft: "8px",
            }}
          >
            {/* {` Página ${currentPage} de ${allPage == -1 ? "-" : allPage} `} */}
            {` Página ${currentPage} de ${
              selectedCategory !== "" || selectedMonth !== ""
                ? Math.ceil(totalPagesFilter / pageSize)
                : allPage == -1
                ? "-"
                : allPage
            } `}
          </span>
          <Button
            onClick={goToNextPage}
            disabled={
              selectedMonth !== ""
                ? currentPage >= Math.ceil(totalPagesFilter / pageSize)
                : currentPage >= allPage
            }
            variant="outlined"
            style={{
              width: "10%",
              height: "10%",
              fontSize: ".5rem",
            }}
          >
            Siguiente
          </Button>

          <select
            style={{
              width: "15%",
              marginLeft: "8px",
            }}
            value={
              pageSize === planningList.length
                ? "all"
                : pageSize
            }
            onChange={(e) => {
              setCurrentPage(1);
              const selectedValue = e.target.value;
              if (selectedValue === "all") {
                setPageSize(planningList.length);
              } else {
                setPageSize(Number(selectedValue));
              }
            }}
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "Todas" : option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* ===PAGINADOR===  */}
    </div>
  );
};

export default SorterPage;
