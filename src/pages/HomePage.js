import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "animate.css";
import "chart.js/auto";
import styles from "./styles/HomePage.module.css";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import axios from "../config/axios";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Loading from "../components/Loading";
import { CircularProgress } from "@mui/material";
import BoxComponent from "../components/BoxComponent";
ChartJs.register(CategoryScale, LinearScale, BarElement);

const HomePage = () => {
  const [completado, setCompletado] = useState(0);
  const [enEspera, setEnEspera] = useState(0);
  const [solicitado, setSolicitado] = useState(0);
  const [chartType, setChartType] = useState("bar");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingBox, setLoadingBox] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChartType(chartType === "bar" ? "doughnut" : "bar");
    }, 5000);
    return () => clearInterval(intervalId);
  }, [chartType]);


  const yearSelected = localStorage.getItem('selectedYear') || new Date().getFullYear()-10;
  // const {stadisticsNumber} = useContext(StadisticsContext);
  useEffect(() => {
    document.title = "Inicio";
    setLoadingBox(true)
    setIsLoading(true); // Set isLoading to true before making requests
    axios
      .get(`${process.env.REACT_APP_API_URLS}/tickets/ticketsComplete/${yearSelected}`)
      .then((response) => {
        const { data } = response;
        setCompletado(data[0].cantidad);
      })
      .catch((error) => {
      });

    axios
      .get(`${process.env.REACT_APP_API_URLS}/tickets/ticketsOpen/${yearSelected}`)
      .then((response) => {
        const { data } = response;
        setSolicitado(data[0].cantidad);
      })
      .catch((error) => {
      });

    axios
      .get(`${process.env.REACT_APP_API_URLS}/tickets/ticketsHold/${yearSelected}`)
      .then((response) => {
        const { data } = response;
        setEnEspera(data[0].cantidad);
      })
      .catch((error) => {
        // console.log(error)
      })
      .finally(()=>{
        setIsLoading(false);
        setLoadingBox(false);
      })
  }, []);

  // const number = stadisticsNumber.completado;
  // console.log(stadisticsNumber.completado+"aqui numerooo");
  const totales = solicitado + enEspera + completado;
  var data = {
    labels: [
      "Tickets Totales",
      "Tickets Abiertos",
      "Tickets En Proceso",
      "Tickets Cerrados",
    ],
    datasets: [
      {
        label: "# de Tickets",
        data: [totales, solicitado, enEspera, completado],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1.5,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <>
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
    
    <div className={styles.fila}>
    <div className={styles.cardContainer}>
        <Card
          cerrados={completado}
          abiertos={solicitado}
          proceso={enEspera}
          totales={totales}
          isLoading={isLoading}
        />
    </div>
      <div className={styles.barContainer}>
        {
          isLoading? (<Loading/>) : 
          (chartType === "bar" ? (
            <Bar
              className="animate__animated animate__zoomIn"
              data={data}
              options={options}
            ></Bar>
          ) : (
            <Pie
              className="animate__animated animate__zoomIn"
              data={data}
              options={options}
            ></Pie>
          ))
        }
      </div>
    </div>
    </>
  );
};

export default HomePage;
