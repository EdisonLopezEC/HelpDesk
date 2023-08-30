import React, { useState, useEffect, useContext } from "react";
import styles from "./styles/ClassifyPage.module.css";
import StickyHeadTable from "../components/StickyHeadTable";
import CardBoard from "../components/CardBoard";
import Chip from "@mui/material/Chip";
import {
  Button,
  Card,
  CircularProgress,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import TemporaryDrawer from "../components/TemporaryDrawer";
import CardProgress from "../components/CardProgress";
import CardComplete from "../components/CardComplete";
import axios from "../config/axios";
import TransitionsModal from "../components/TransitionsModal";
import { UserContext } from "../context/UserContext";
import "animate.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import BoxComponent from "../components/BoxComponent";

const ClassifyPage = () => {
  //Listas del board

  useEffect(() => {
    document.title = "Gestionar";
  }, []);
  const [planningList, setPlanningList] = useState([]);
  const [assignedList, setassignedList] = useState([]);
  const [inPorgressList, setInPorgressList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar si está cargando
  const [requiredList, setRequiredList] = useState([]);
  const [holdList, setHoldList] = useState([]);
  const [listModal, setListModal] = useState([]);
  const [titleTransition, setTitleTransition] = useState();

  const [selectedMonth, setSelectedMonth] = useState(""); // Estado para el mes seleccionado
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada
  const [loadingBox, setLoadingBox] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Puedes ajustar el tamaño de página según tus necesidades
  const perPageOptions = [5, 10, "all"];
  const [filter, setFilter] = useState("all");

  const [selectedYear, setSelectedYear] = useState(
    localStorage.getItem("selectedYear")
  );

  const [completeList] = useState([]);

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
        const newRequiredList = [];
        const newHoldList = [];

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
            case "Asignado":
              if (elementYear === aux) {
                newassignedList.push(element);
              }
              break;
            case "completado":
              if (elementYear === aux) {
                newinProgressList.push(element);
              }
              break;
            case "En Proceso":
              if (elementYear === aux) {
                newRequiredList.push(element);
              }
              break;
            case "en espera":
              if (elementYear === aux) {
                newHoldList.push(element);
              }
              break;
            default:
              break;
          }
        });
        setPlanningList((prevList) => [...newPlanningList, ...prevList]);
        setassignedList((prevList) => [...newassignedList, ...prevList]);
        setInPorgressList((prevList) => [...newinProgressList, ...prevList]);
        setRequiredList((prevList) => [...newRequiredList, ...prevList]);
        setHoldList((prevList) => [...newHoldList, ...prevList]);
        setIsLoading(false);
        setLoadingBox(false);
        setListModal(requiredList);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const [openFilter, setOpenFilter] = useState(false);
  const [open, setOpen] = useState(false);

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
        fechaAtenderAdmin: new Date(),
      })
      .then((response) => {
        // console.log(response);
        setPlanningList(
          planningList.filter((ticket) => ticket.id !== ticketId)
        );
        const ticket = planningList.find((ticket) => ticket.id === ticketId);
        ticket.categoria = categoria;
        ticket.fechaAtenderAdmin = new Date();
        setassignedList([ticket, ...assignedList]);
        setLoadingBox(false);
        setCurrentPage(1);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleAttend = (ticketId, categoria) => {
    setLoadingBox(true);
    axios
      .put(`${process.env.REACT_APP_API_URLS}/tickets/${ticketId}`, {
        estado: "En Proceso",
        categoria: categoria,
        fechaAtenderPlaneado: new Date(),
      })
      .then((response) => {
        const ticket = assignedList.find((ticket) => ticket.id === ticketId);
        setassignedList(
          assignedList.filter((ticket) => ticket.id !== ticketId)
        );
        setRequiredList([ticket, ...requiredList]);
        setCurrentPage(1);
        setListModal(requiredList);
        setLoadingBox(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleClick = (valor) => {
    if (valor === "en espera") {
      setListModal(holdList);
      setTitleTransition("Tickets en proceso");
      setOpen(true);
    } else if (valor === "filtro") {
      setOpenFilter(true);
    } else if (valor === "solicitado") {
      setListModal(requiredList);
      setTitleTransition("En espera de un técnico");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenFilter(false);
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

  const visiblePlanningList = planningList
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(indexOfFirstCard, indexOfLastCard);

  const visibleAssignedList = assignedList
    .sort(
      (a, b) => new Date(b.fechaAtenderAdmin) - new Date(a.fechaAtenderAdmin)
    )
    .slice(indexOfFirstCard, indexOfLastCard);

  const visibleInProgressList = inPorgressList
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

  const allPage = Math.ceil(maxLength / pageSize);

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
    const dateFilteredPlanningList = planningList.filter((ticket) => {
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

    const dateFilteredAssignedList = assignedList.filter((ticket) => {
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

    // Actualizar las variables de estado con los tickets filtrados\

    setDateFilteredPlanningList(
      dateFilteredPlanningList
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(indexOfFirstCard, indexOfLastCard)
    );
    setDateFilteredAssignedList(
      dateFilteredAssignedList
        .sort(
          (a, b) =>
            new Date(b.fechaAtenderAdmin) - new Date(a.fechaAtenderAdmin)
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

    // const totalFilteredTicket = dateFilteredAssignedList.length + dateFilteredInProgressList.length + dateFilteredPlanningList.length;

    const totalFilteredTicket = Math.max(
      dateFilteredAssignedList.length,
      dateFilteredInProgressList.length,
      dateFilteredPlanningList.length
    );

    setTotalPagesFilter(totalFilteredTicket);
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
            Gestión de tickets
          </h1>
          <Button
            aria-label="delete"
            onClick={() => {
              handleClick("filtro");
            }}
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
  
        <Dialog open={openFilter} onClose={handleClose}>
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
            <Chip label="Categorizar" color="primary" className={styles.chip} />
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
              dateFilteredPlanningList.length > 0 ? (
                dateFilteredPlanningList.map((ticket) => (
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
                ))
              ) : !isLoading ? (
                <p>No hay tickets disponibles.</p>
              ) : null
            ) : visiblePlanningList.length > 0 ? (
              visiblePlanningList.map((ticket) => (
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
  
            {!isLoading && (selectedMonth !== "" || selectedCategory !== "") ? (
              dateFilteredAssignedList.length > 0 ? (
                dateFilteredAssignedList.map((ticket) => (
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
              ) : !isLoading ? (
                <p>No hay tickets disponibles.</p>
              ) : null
            ) : visibleAssignedList.length > 0 ? (
              visibleAssignedList.map((ticket) => (
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
            ) : !isLoading ? (
              <p>No hay tickets disponibles.</p>
            ) : null}
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
  
            {!isLoading && (selectedMonth !== "" || selectedCategory !== "") ? (
              dateFilteredInProgressList.length > 0 ? (
                dateFilteredInProgressList.map((ticket) => (
                  <CardComplete
                    mensaje={ticket.mensaje}
                    key={ticket.id}
                    asunto={ticket.asunto}
                    fecha={ticket.fecha}
                    remitente={ticket.remitente}
                    id={ticket.id}
                    handleSend={handleSend}
                    categoria={ticket.categoria}
                    observacion={ticket.observacion}
                    fechaCompletado={ticket.fechaCompletada}
                    isTransitionModal={false}
                  />
                ))
              ) : !isLoading ? (
                <p>No hay tickets disponibles.</p>
              ) : null
            ) : visibleInProgressList.length > 0 ? (
              visibleInProgressList.map((ticket) => (
                <CardComplete
                  mensaje={ticket.mensaje}
                  key={ticket.id}
                  asunto={ticket.asunto}
                  fecha={ticket.fecha}
                  remitente={ticket.remitente}
                  id={ticket.id}
                  handleSend={handleSend}
                  categoria={ticket.categoria}
                  observacion={ticket.observacion}
                  fechaCompletado={ticket.fechaCompletada}
                  isTransitionModal={false}
                />
              ))
            ) : !isLoading ? (
              <p>No hay tickets disponibles.</p>
            ) : null}
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
              label={
                !isLoading ? (
                  "Solicitado"
                ) : (
                  <CircularProgress
                    style={{
                      color: "white",
                      height: "1rem",
                      width: "1rem",
                    }}
                  />
                )
              }
              variant="primary"
              onClick={() => handleClick("solicitado")}
              color="primary"
              style={
                isLoading
                  ? {
                      width: "100%",
                      pointerEvents: "none",
                    }
                  : {
                      width: "100%",
                    }
              }
            />
            <hr />
            <Chip
              label={
                !isLoading ? (
                  "En Progreso"
                ) : (
                  <CircularProgress
                    style={{
                      color: "white",
                      height: "1rem",
                      width: "1rem",
                    }}
                  />
                )
              }
              onClick={() => handleClick("en espera")}
              color="warning"
              style={
                isLoading
                  ? {
                      width: "100%",
                      pointerEvents: "none",
                    }
                  : {
                      width: "100%",
                    }
              }
            />
            <TransitionsModal
              abrir={open}
              handleCloseModal={handleClose}
              list={listModal}
              titulo={titleTransition}
            />
          </div>
        </div>
  
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
                  : allPage === -1
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
            {/* {console.log("PAGE", totalPagesFilter)}
            {console.log("VALORRE",currentPage >= Math.ceil(totalPagesFilter/pageSize))} */}
            {/* {console.log("selected", selectedCategory !== "" || selectedMonth !== "")} */}
            {/* {console.log("selected category", selectedCategory)} */}
            {/* {console.log("selected month", selectedMonth)} */}
  
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
      </div>
  );
};

export default ClassifyPage;
