import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ListContext } from "../context/ListContext";
import SignOut from "../components/SignOut";
import { UserContext } from "../context/UserContext";
import YearSelector from "../components/YearSelector";

const LayoutPublic = () => {
  const { user } = useContext(UserContext);

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  if (location.pathname === process.env.PUBLIC_URL + "/login") {
    return (
      <main>
        <Outlet />
      </main>
    );
  }
  let button1Style = {};
  let button2Style = {};

  if (currentPage === process.env.PUBLIC_URL + "/") {
    button1Style = { backgroundColor: "#f4f6f9", color: "black" };
    button2Style = { color: "white" };
  } else if (currentPage === process.env.PUBLIC_URL + "/classify") {
    button1Style = { color: "white" };
    button2Style = { backgroundColor: "#f4f6f9", color: "black" };
  } else if (currentPage === process.env.PUBLIC_URL + "/technical") {
    button1Style = { color: "white" };
    button2Style = { backgroundColor: "#f4f6f9", color: "black" };
  }else if(currentPage === process.env.PUBLIC_URL + "/categorizador"){
    button1Style = { color: "white" };
    button2Style = { backgroundColor: "#f4f6f9", color: "black" };
  }

  return (
    <>
      <ListContext.Provider>
        <div className="navbar">
          {/* <img
          className="nav_logo"
          src="https://app.eeasa.com.ec/intranet/assets/images/LogoBlancoEEASA.png"
          width="50px"
          onClick={() => {
            setCurrentPage("/");
          }}
        /> */}
        <div
          style={{
            display:"flex"
          }}
        >
          <Link
            to={process.env.PUBLIC_URL + "/"}
            style={{ display: "inline-block" }}
          >
            <img
              className="nav_logo"
              src="https://app.eeasa.com.ec/intranet/assets/images/LogoBlancoEEASA.png"
              width="50px"
              alt="Logo de EEASA"
            />
          </Link>
          <div
            style={{display:"flex", alignItems: 'center', color: 'white'}}
          
          >
          <YearSelector/>
          </div>
        </div>

          <div
            className={`nav_items ${isOpen && "open"}`}
            style={{
              display: "inline-flex",
            }}
          >
            <NavLink
              to={process.env.PUBLIC_URL + "/"}
              onClick={() => {
                setCurrentPage("/");
                setIsOpen(!isOpen);
              }}
              className={button1Style}
              style={{
                padding: "10px",
                borderRadius: "10px",
                ...button1Style,
              }}
            >
              Inicio
            </NavLink>

            {user.rol === "ROLE_HELPDESK" ? (
              <NavLink
                to={process.env.PUBLIC_URL + "/classify"}
                onClick={() => {
                  setCurrentPage(process.env.PUBLIC_URL + "/classify");
                  setIsOpen(!isOpen);
                }}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  ...button2Style,
                }}
              >
                Gestionar
              </NavLink>
            ) : null}

            {user.rol === "ROLE_HELPDESK_TECNICO" ? (
              <NavLink
                to={process.env.PUBLIC_URL + "/technical"}
                onClick={() => {
                  setCurrentPage(process.env.PUBLIC_URL + "/classify");
                  setIsOpen(!isOpen);
                }}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  ...button2Style,
                }}
              >
                Atender
              </NavLink>
            ) : null}

            
            {user.rol === "ROLE_HELPDESK_CATEGORIZADOR" ? (
              <NavLink
                to={process.env.PUBLIC_URL + "/categorizador"}
                onClick={() => {
                  setCurrentPage(process.env.PUBLIC_URL + "/classify");
                  setIsOpen(!isOpen);
                }}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  ...button2Style,
                }}
              >
                Clasificar
              </NavLink>
            ) : null}

            {!isMobile ? (
              <div
                style={{
                  marginTop: "10px",
                  marginRight: "15px",
                }}
              >
                <SignOut />
              </div>
            ) : (
              <NavLink
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  display: "flex",
                }}
              >
                Cerrar Sesión
              </NavLink>
            )}
            
          </div>
          <div
            className={`nav_toggle ${isOpen && "open"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <main>
          <Outlet />
        </main>
      </ListContext.Provider>
    </>
  );
};

export default LayoutPublic;
