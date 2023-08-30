import React, { useState, useEffect, useContext } from "react";
import styles from "./styles/Technical.module.css";
import StickyHeadTable from "../components/StickyHeadTable";
import CardBoard from "../components/technicalComponents/CardBoard";
import CardProgress from "../components/technicalComponents/CardProgress";
import Chip from "@mui/material/Chip";
import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TemporaryDrawer from "../components/TemporaryDrawer";
import CardComplete from "../components/CardComplete";
import axios from "../config/axios";
import TransitionsModal from "../components/TransitionsModal";
import { UserContext } from "../context/UserContext";
import "animate.css";
import { StadisticsContext } from "../context/StadisticsContext";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import BoxComponent from "../components/BoxComponent";

const ClassifyPage = () => {
  //Listas del board
  const [selectedMonth, setSelectedMonth] = useState(""); // Estado para el mes seleccionado
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Puedes ajustar el tamaño de página según tus necesidades
  const perPageOptions = [5, 10, "all"];
  const [filter, setFilter] = useState("all");
  const [loadingBox, setLoadingBox] = useState(false);

  const { stadisticsNumber, setStadisticsNumber } =
    useContext(StadisticsContext);

  useEffect(() => {
    document.title = "Tecnico";
  }, []);

  const [planningList, setPlanningList] = useState([]);
  const [assignedList, setassignedList] = useState([]);
  const [inPorgressList, setInPorgressList] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar si está cargando

  const [completeList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    localStorage.getItem("selectedYear")
  );

  useEffect(() => {
    setLoadingBox(true);
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URLS}/tickets`)
      .then((res) => {
        // console.log(res.data);
        const newPlanningList = [];
        const newassignedList = [];
        const newinProgressList = [];

        res.data.forEach((element) => {
          const fecha = new Date(element.fecha);
          // console.log("Aqui fechas de los element", element.fechaCompletada);
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

          switch (element.estado) {
            case "En Proceso":
              if (elementYear === selectedYear.slice(2, 4)) {
                newPlanningList.push(element);
              }
              break;
            case "en espera":
              if (elementYear === selectedYear.slice(2, 4)) {
                newassignedList.push(element);
              }
              break;
            case "completado":
              if (elementYear === selectedYear.slice(2, 4)) {
                newinProgressList.push(element);
              }
              break;
            default:
              break;
          }
        });

        setPlanningList((prevList) => [...newPlanningList, ...prevList]);
        setassignedList((prevList) => [...newassignedList, ...prevList]);
        setInPorgressList((prevList) => [...newinProgressList, ...prevList]);
        setIsLoading(false);
        setLoadingBox(false);
        setStadisticsNumber({ completado: newinProgressList.length });
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const [open, setOpen] = useState(false);

  // Actualizar ticket
  const handleSend = (ticketId, remitente, asunto) => {
    setLoadingBox(true);
    axios
      .put(`${process.env.REACT_APP_API_URLS}/tickets/${ticketId}`, {
        estado: "en espera",
        fechaPlaneadoProgesoTecnico: new Date(),
      })
      .then((response) => {
        // ENVIAR EL MENSAJE DEL TECNICO
        axios
          .post(
            `${process.env.REACT_APP_API_URLS}/tickets/technicalProgress`,
            null,
            {
              params: { remitente: remitente, asunto: asunto },
            }
          )
          .then((response) => {
            // console.log("se envio tecnico");
            setLoadingBox(false);
          })
          .catch((error) => {
            // console.log(error);
          });

        setPlanningList(
          planningList.filter((ticket) => ticket.id !== ticketId)
        );
        const ticket = planningList.find((ticket) => ticket.id === ticketId);
        ticket.fechaPlaneadoProgesoTecnico = new Date() 
        setassignedList([ticket, ...assignedList]);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleAttend = (ticketId, remitente, observaciones, asunto) => {
    setLoadingBox(true);
    axios
      .put(`${process.env.REACT_APP_API_URLS}/tickets/${ticketId}`, {
        estado: "completado",
        observacion: observaciones,
        fechaCompletada: new Date(),
      })
      .then((response) => {
        axios
          .post(
            `${process.env.REACT_APP_API_URLS}/tickets/technicalComplete`,
            null,
            {
              params: {
                remitente: remitente,
                observaciones: observaciones,
                asunto: asunto,
              },
            }
          )
          .then((response) => {
            // console.log("se envio tecnico");
            setLoadingBox(false);
          })
          .catch((error) => {
            // console.log(error);
          });

        setassignedList(
          assignedList.filter((ticket) => ticket.id !== ticketId)
        );
        const ticket = assignedList.find((ticket) => ticket.id === ticketId);
        ticket.observacion = observaciones;
        ticket.fechaCompletada = new Date();
        setInPorgressList([ticket, ...inPorgressList]);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { user } = useContext(UserContext);

  const indexOfLastCard = currentPage * pageSize;
  const indexOfFirstCard = indexOfLastCard - pageSize;

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Función para verificar si una fecha es hoy
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Función para verificar si una fecha está dentro de la semana actual
  const isThisWeek = (date) => {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(today.getDate() + 6));
    return date >= weekStart && date <= weekEnd;
  };

  // Función para verificar si una fecha está dentro del mes actual
  const isThisMonth = (date) => {
    const today = new Date();
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Función para verificar si una fecha está dentro del año actual
  const isThisYear = (date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear();
  };

  const filteredPlanningList = planningList.filter((ticket) => {
    switch (filter) {
      case "today":
        // Filtrar por tickets de hoy
        return isToday(new Date(ticket.fecha));
      case "thisWeek":
        // Filtrar por tickets de esta semana
        return isThisWeek(new Date(ticket.fecha));
      case "thisMonth":
        // Filtrar por tickets de este mes
        return isThisMonth(new Date(ticket.fecha));
      case "thisYear":
        // Filtrar por tickets de este año
        return isThisYear(new Date(ticket.fecha));
      default:
        return true; // Mostrar todos los tickets por defecto
    }
  });

  const filteredAssignedList = assignedList.filter((ticket) => {
    switch (filter) {
      case "today":
        // Filtrar por tickets de hoy
        return isToday(new Date(ticket.fecha));
      case "thisWeek":
        // Filtrar por tickets de esta semana
        return isThisWeek(new Date(ticket.fecha));
      case "thisMonth":
        // Filtrar por tickets de este mes
        return isThisMonth(new Date(ticket.fecha));
      case "thisYear":
        // Filtrar por tickets de este año
        return isThisYear(new Date(ticket.fecha));
      default:
        return true; // Mostrar todos los tickets por defecto
    }
  });

  const filteredInProgressList = inPorgressList.filter((ticket) => {
    switch (filter) {
      case "today":
        // Filtrar por tickets de hoy
        return isToday(new Date(ticket.fecha));
      case "thisWeek":
        // Filtrar por tickets de esta semana
        return isThisWeek(new Date(ticket.fecha));
      case "thisMonth":
        // Filtrar por tickets de este mes
        return isThisMonth(new Date(ticket.fecha));
      case "thisYear":
        // Filtrar por tickets de este año
        return isThisYear(new Date(ticket.fecha));
      default:
        return true; // Mostrar todos los tickets por defecto
    }
  });

  const visiblePlanningList = filteredPlanningList
    .sort(
      (a, b) =>
        new Date(b.fechaAtenderPlaneado) - new Date(a.fechaAtenderPlaneado)
    )
    .slice(indexOfFirstCard, indexOfLastCard);

  const visibleAssignedList = filteredAssignedList
    .sort(
      (a, b) =>
        new Date(b.fechaPlaneadoProgesoTecnico) -
        new Date(a.fechaPlaneadoProgesoTecnico)
    )
    .slice(indexOfFirstCard, indexOfLastCard);

  const visibleInProgressList = filteredInProgressList
    .sort((a, b) => new Date(b.fechaCompletada) - new Date(a.fechaCompletada))
    .slice(indexOfFirstCard, indexOfLastCard);

  const [dateFilteredPlanningList, setDateFilteredPlanningList] = useState();
  const [dateFilteredInProgressList, setDateFilteredInProgressList] =
    useState();
  const [dateFilteredAssignedList, setDateFilteredAssignedList] = useState();

  const maxLength = Math.max(
    planningList.length,
    assignedList.length,
    inPorgressList.length
  );

  // console.log(maxLength + "AQUI MAX LENGH");

  const allPage = Math.ceil(maxLength / pageSize);

  // console.log(allPage + "AQUI MAX CEIL");

  // console.log("ALL PAGEEEE========", allPage);

  const assignedListLength = dateFilteredAssignedList
    ? dateFilteredAssignedList.length
    : 0;
  const inProgressListLength = dateFilteredInProgressList
    ? dateFilteredInProgressList.length
    : 0;
  const planningListLength = dateFilteredPlanningList
    ? dateFilteredPlanningList.length
    : 0;

  const allPageFilter =
    Math.ceil(
      (assignedListLength + inProgressListLength + planningListLength) /
        pageSize
    ) - 1 || 0;

  const [totalPagesFilter, setTotalPagesFilter] = useState(0);

  useEffect(() => {
    // console.log("se ejecuto el filtro");
    const dateFilteredPlanningList = visiblePlanningList.filter((ticket) => {
      const ticketDate = new Date(ticket.fecha);
      const ticketMonth = ticketDate.getMonth(); // Obtener el mes del ticket (0-11)

      if (selectedMonth !== "" && selectedMonth !== ticketMonth) {
        return false; // Filtrar si el mes seleccionado no coincide
      }

      if (selectedCategory !== "" && selectedCategory !== ticket.categoria) {
        return false; // Filtrar si la categoría seleccionada no coincide
      }

      return true; // Mantener el ticket si pasa los filtros de mes y categoría
    });

    const dateFilteredAssignedList = visibleAssignedList.filter((ticket) => {
      const ticketDate = new Date(ticket.fecha);
      const ticketMonth = ticketDate.getMonth(); // Obtener el mes del ticket (0-11)

      if (selectedMonth !== "" && selectedMonth !== ticketMonth) {
        return false; // Filtrar si el mes seleccionado no coincide
      }

      if (selectedCategory !== "" && selectedCategory !== ticket.categoria) {
        return false; // Filtrar si la categoría seleccionada no coincide
      }

      return true; // Mantener el ticket si pasa los filtros de mes y categoría
    });

    // const dateFilteredInProgressList = visibleInProgressList.filter((ticket) => {
    //   const ticketDate = new Date(ticket.fecha);
    //   const ticketMonth = ticketDate.getMonth(); // Obtener el mes del ticket (0-11)

    //   if (selectedMonth !== "" && selectedMonth !== ticketMonth) {
    //     return false; // Filtrar si el mes seleccionado no coincide
    //   }

    //   if (selectedCategory !== "" && selectedCategory !== ticket.categoria) {
    //     return false; // Filtrar si la categoría seleccionada no coincide
    //   }

    //   return true; // Mantener el ticket si pasa los filtros de mes y categoría
    // });

    const dateFilteredInProgressList = inPorgressList.filter((ticket) => {
      const ticketDate = new Date(ticket.fecha);
      const ticketMonth = ticketDate.getMonth(); // Obtener el mes del ticket (0-11)

      if (selectedMonth !== "" && selectedMonth !== ticketMonth) {
        return false; // Filtrar si el mes seleccionado no coincide
      }

      if (selectedCategory !== "" && selectedCategory !== ticket.categoria) {
        return false; // Filtrar si la categoría seleccionada no coincide
      }

      return true; // Mantener el ticket si pasa los filtros de mes y categoría
    });

    // console.log("AQUI LISTA CON FILTROOO");

    setDateFilteredPlanningList(
      dateFilteredPlanningList
        .sort(
          (a, b) => new Date(b.fechaCompletada) - new Date(a.fechaCompletada)
        )
        .slice(indexOfFirstCard, indexOfLastCard)
    );
    setDateFilteredAssignedList(
      dateFilteredAssignedList
        .sort(
          (a, b) => new Date(b.fechaCompletada) - new Date(a.fechaCompletada)
        )
        .slice(indexOfFirstCard, indexOfLastCard)
    );

    setDateFilteredInProgressList(
      dateFilteredInProgressList
        .sort(
          (a, b) => new Date(b.fechaCompletada) - new Date(a.fechaCompletada)
        )
        .slice(indexOfFirstCard, indexOfLastCard)
    );

    const totalFilteredTicket = Math.max(
      dateFilteredAssignedList.length,
      dateFilteredInProgressList.length,
      dateFilteredPlanningList.length
    );
    setTotalPagesFilter(totalFilteredTicket);
    // console.log(totalFilteredTicket + " TOTAAAAAL FILTER MAXIMO");
  }, [
    selectedMonth,
    selectedCategory,
    assignedList,
    inPorgressList,
    indexOfFirstCard,
    indexOfLastCard,
    planningList,
  ]);

  return (
    <div className={styles.container}>
      {loadingBox ? (
        <div>
          <div className={`${styles.overlay} ${styles.fadeIn}`}>
            {/* <div className={styles.overlayContent}> */}
            <BoxComponent />
            {/* </div> */}
          </div>
        </div>
      ) : null}

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
          Gestiona los tickets de los técnicos
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

        {/* </div> */}
      </div>

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
          <FormControl
            style={{
              width: "15vw",
            }}
          >
            <InputLabel>Categoría</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="soporte">Soporte</MenuItem>
              <MenuItem value="infraestructura">Infraestructura</MenuItem>
              <MenuItem value="administracion">Administracion</MenuItem>
              <MenuItem value="desarrollo">Desarrollo</MenuItem>
              {/* Agregar más categorías */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* <StickyHeadTable/> */}
      <div className={styles.containerGrid}>
        {/* Cuadro 1 */}
        <div className={styles.containerCards}>
          <Chip
            label="Planeado"
            color="primary"
            className={styles.chip}
            style={{
              minWidth: "100px",
            }}
          />
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
          {!isLoading && (selectedMonth !== "" || selectedCategory !== "") ? (
            dateFilteredPlanningList.length > 0 ? (
              dateFilteredPlanningList
                // .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .map((ticket) => (
                  <CardBoard
                    mensaje={ticket.mensaje}
                    key={ticket.id}
                    asunto={ticket.asunto}
                    x
                    fecha={ticket.fecha}
                    remitente={ticket.remitente}
                    id={ticket.id}
                    handleSend={handleSend}
                    categoria={ticket.categoria}
                    handleAttend={handleAttend}
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
                  handleAttend={handleAttend}
                />
              ))
          ) : !isLoading ? (
            <p>No hay tickets disponibles.</p>
          ) : null}

          {/* <div></div> */}
          {/* Boton para agregar */}
          <hr />
          {/* <Button variant="outlined">+</Button> */}
        </div>

        {/* Cuadro 2 */}
        <div className={styles.containerCards}>
          <Chip
            label="En Progreso"
            color="warning"
            className={styles.chip}
            style={{
              minWidth: "100px",
            }}
          />
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

          {!isLoading && (selectedMonth !== "" || selectedCategory !== "") ? (
            dateFilteredAssignedList.length > 0 ? (
              dateFilteredAssignedList
                // .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .map((ticket) => (
                  <CardProgress
                    mensaje={ticket.mensaje}
                    key={ticket.id}
                    asunto={ticket.asunto}
                    fecha={ticket.fecha}
                    remitente={ticket.remitente}
                    id={ticket.id}
                    handleSend={handleSend}
                    categoria={ticket.categoria}
                    handleAttend={handleAttend}
                  />
                ))
            ) : !isLoading ? (
              <p>No hay tickets disponibles.</p>
            ) : null
          ) : visibleAssignedList.length > 0 ? (
            visibleAssignedList
              // .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .map((ticket) => (
                <CardProgress
                  mensaje={ticket.mensaje}
                  key={ticket.id}
                  asunto={ticket.asunto}
                  fecha={ticket.fecha}
                  remitente={ticket.remitente}
                  id={ticket.id}
                  handleSend={handleSend}
                  categoria={ticket.categoria}
                  handleAttend={handleAttend}
                />
              ))
          ) : !isLoading ? (
            <p>No hay tickets disponibles.</p>
          ) : null}
          {/* Boton para agregar */}
          <hr />
          {/* <Button variant="outlined">+</Button> */}
        </div>

        {/* Cuadro 3 */}
        <div className={styles.containerCards}>
          <Chip
            label="Completado"
            color="success"
            className={styles.chip}
            style={{
              minWidth: "100px",
            }}
          />
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

          {!isLoading && (selectedMonth !== "" || selectedCategory !== "") ? (
            dateFilteredInProgressList.length > 0 ? (
              dateFilteredInProgressList
                // .sort((a, b) => new Date(b.fechaCompletada) - new Date(a.fechaCompletada))
                .map((ticket) => (
                  <CardComplete
                    mensaje={ticket.mensaje}
                    key={ticket.id}
                    asunto={ticket.asunto}
                    fecha={ticket.fecha}
                    remitente={ticket.remitente}
                    id={ticket.id}
                    handleSend={handleSend}
                    categoria={ticket.categoria}
                    handleAttend={handleAttend}
                    observacion={ticket.observacion}
                    fechaCompletado={ticket.fechaCompletada}
                  />
                ))
            ) : !isLoading ? (
              <p>No hay tickets disponibles.</p>
            ) : null
          ) : visibleInProgressList.length > 0 ? (
            visibleInProgressList
              // .sort((a, b) => new Date(b.fechaCompletada) - new Date(a.fechaCompletada))
              .map((ticket) => (
                <CardComplete
                  mensaje={ticket.mensaje}
                  key={ticket.id}
                  asunto={ticket.asunto}
                  fecha={ticket.fecha}
                  remitente={ticket.remitente}
                  id={ticket.id}
                  handleSend={handleSend}
                  categoria={ticket.categoria}
                  handleAttend={handleAttend}
                  observacion={ticket.observacion}
                  fechaCompletado={ticket.fechaCompletada}
                />
              ))
          ) : !isLoading ? (
            <p>No hay tickets disponibles.</p>
          ) : null}
          <hr />
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
              selectedCategory !== "" || selectedMonth !== ""
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
              pageSize ===
              planningList.length + assignedList.length + inPorgressList.length
                ? "all"
                : pageSize
            }
            onChange={(e) => {
              setCurrentPage(1);
              const selectedValue = e.target.value;
              if (selectedValue === "all") {
                setPageSize(
                  planningList.length +
                    assignedList.length +
                    inPorgressList.length
                );
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

export default ClassifyPage;
