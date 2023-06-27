<<<<<<< HEAD
import React from "react";
import styles from "./styles/CardStyles.module.css";
import "animate.css";

const Card = ( {cerrados, abiertos, proceso, totales} ) => {

  console.log("VALORES CARD ", cerrados)


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
    <h1
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#20325e"
      }}
    >Información</h1>
    <div className="parent animate__animated animate__zoomIn">
      <div>
      <div className={styles.cardGridContainer}>

          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          ></link>
          <div className={styles.hero}>
            <div className={styles["hero-description-bkSecond"]}></div>
            <div
              className="hero-logo"
              style={{
                background: "#e3ffc0",
                width: "100%",
                height: "100%",
                display: "inline-flex",
              }}
            ></div>
            <div className={styles["hero-description"]}>
              <p>Tickets Totales</p>
            </div>
            <div className={styles["hero-date"]}>
              <p>Numero Total:</p>
            </div>
            <div className={styles["hero-btn"]}>
              <a href={`${process.env.PUBLIC_URL}/classify`}>{totales}</a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.cardGridContainer}>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          ></link>
          <div className={styles.btn}></div>
          <div className={styles.hero}>
            <div className={styles["hero-description-bkThird"]}></div>
            <div
              className="hero-logo"
              style={{
                background: "rgba(153, 102, 255, 1)",
                width: "100%",
                height: "100%",
                display: "inline-flex",
              }}
            ></div>
            <div className={styles["hero-description"]}>
              <p>Tickets Abieros</p>
            </div>
            <div className={styles["hero-date"]}>
              <p>Numero Total:</p>
            </div>
            <div className={styles["hero-btn"]}>
              <a href={`${process.env.PUBLIC_URL}/classify`}>{abiertos}</a>
            </div>
          </div>
        </div>
      </div>

      <div>
      <div className={styles.cardGridContainer}>

          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          ></link>
          <div className={styles.btn}></div>
          <div className={styles.hero}>
     
            <div className={styles["hero-description-bkFourth"]}></div>
            <div className="hero-logo"
            style={{
              background: "#fdb284",
              width: "100%",
              height: "100%",
              display: "inline-flex",
            }}
            >
            </div>
            <div className={styles["hero-description"]}>
              <p>Tickets Proceso</p>
            </div>
            <div className={styles["hero-date"]}>
              <p>Numero Total:</p>
            </div>
            <div className={styles["hero-btn"]}>
              <a href={`${process.env.PUBLIC_URL}/classify`}>{proceso}</a>
            </div>
          </div>
        </div>
      </div>

      <div>
      <div className={styles.cardGridContainer}>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          ></link>
          <div className={styles.btn}></div>
          <div className={styles.hero}>
            <div className={styles["hero-description-bk"]}></div>
            <div className="hero-logo"
            style={{
              background: "rgba(255, 99, 132, 1)",
              width: "100%",
              height: "100%",
              display: "inline-flex",
            }}
            >
            </div>
            <div className={styles["hero-description"]}>
              <p>Tickets Cerrados</p>
            </div>
            <div className={styles["hero-date"]}>
              <p>Numero Total:</p>
            </div>
            <div className={styles["hero-btn"]}>
              <a href={`${process.env.PUBLIC_URL}/classify`}>{cerrados}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Card;
=======
import React from "react";
import styles from "./styles/CardStyles.module.css";
import "animate.css";

const Card = ( {cerrados, abiertos, proceso, totales} ) => {

  console.log("VALORES CARD ", cerrados)


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
    <h1
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#20325e"
      }}
    >Información</h1>
    <div className="parent animate__animated animate__zoomIn">
      <div>
      <div className={styles.cardGridContainer}>

          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          ></link>
          <div className={styles.hero}>
            <div className={styles["hero-description-bkSecond"]}></div>
            <div
              className="hero-logo"
              style={{
                background: "#e3ffc0",
                width: "100%",
                height: "100%",
                display: "inline-flex",
              }}
            ></div>
            <div className={styles["hero-description"]}>
              <p>Tickets Totales</p>
            </div>
            <div className={styles["hero-date"]}>
              <p>Numero Total:</p>
            </div>
            <div className={styles["hero-btn"]}>
              <a href="#">{totales}</a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.cardGridContainer}>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          ></link>
          <div className={styles.btn}></div>
          <div className={styles.hero}>
            <div className={styles["hero-description-bkThird"]}></div>
            <div
              className="hero-logo"
              style={{
                background: "rgba(153, 102, 255, 1)",
                width: "100%",
                height: "100%",
                display: "inline-flex",
              }}
            ></div>
            <div className={styles["hero-description"]}>
              <p>Tickets Abieros</p>
            </div>
            <div className={styles["hero-date"]}>
              <p>Numero Total:</p>
            </div>
            <div className={styles["hero-btn"]}>
              <a href="#">{abiertos}</a>
            </div>
          </div>
        </div>
      </div>

      <div>
      <div className={styles.cardGridContainer}>

          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          ></link>
          <div className={styles.btn}></div>
          <div className={styles.hero}>
     
            <div className={styles["hero-description-bkFourth"]}></div>
            <div className="hero-logo"
            style={{
              background: "#fdb284",
              width: "100%",
              height: "100%",
              display: "inline-flex",
            }}
            >
            </div>
            <div className={styles["hero-description"]}>
              <p>Tickets Proceso</p>
            </div>
            <div className={styles["hero-date"]}>
              <p>Numero Total:</p>
            </div>
            <div className={styles["hero-btn"]}>
              <a href="#">{proceso}</a>
            </div>
          </div>
        </div>
      </div>

      <div>
      <div className={styles.cardGridContainer}>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          ></link>
          <div className={styles.btn}></div>
          <div className={styles.hero}>
            <div className={styles["hero-description-bk"]}></div>
            <div className="hero-logo"
            style={{
              background: "rgba(255, 99, 132, 1)",
              width: "100%",
              height: "100%",
              display: "inline-flex",
            }}
            >
            </div>
            <div className={styles["hero-description"]}>
              <p>Tickets Cerrados</p>
            </div>
            <div className={styles["hero-date"]}>
              <p>Numero Total:</p>
            </div>
            <div className={styles["hero-btn"]}>
              <a href="#">{cerrados}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Card;
>>>>>>> 249c57bfc6d68c4a5b435e819488e329cb6924d6
