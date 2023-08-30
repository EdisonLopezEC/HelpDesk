import React, { useContext, useState } from 'react';
import {  Avatar,Box, Button, IconButton, Menu, MenuItem } from'@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from "../config/axios"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Cookies from 'js-cookie';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));




const SignOut = ({ username, avatarUrl }) => {

  const [user, setUser] = useState({});

    // Obtener el token de localhost
    // const token = localStorage.getItem('token');
    //Realizar la peticion con el Authorization y axios
    
    React.useEffect(() => {
      const token = Cookies.get("token")
      if (token) {
        axios
          .get("/usuarios/userInfo", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const { data } = response;
            if(data.estadoCuenta !== "ACTIVO"){
              Cookies.remove("token")
              setUser({ login: false });
              return;
            }
            setUser({ login: true, rol: data.userId, nombres: data.nombreUsuario, estadoCuenta: data.estadoCuenta });
          })
          .catch((error) => {
            Cookies.remove("token")
            setUser({ login: false });
          });
      } else {
        setUser({ login: false });
      }
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSingOut = () => {
      Cookies.remove("token")
      window.location.href = `${process.env.PUBLIC_URL}/`;
    }

    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
      }
      
      function handleMenuClose() {
        setAnchorEl(null);
      }
      return (
        <>
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
        {/* <Avatar src={avatarUrl} onClick={handleMenuOpen} /> */}

        <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar 
          alt=""
          onClick={handleMenuOpen}
          style={{
            width: "15px",
            height: "15px",
            cursor: "pointer"
          }}

          

          />
        }
      >
        <Avatar alt={user.nombres} src="/static/images/avatar/2.jpg" />
      </Badge>
        </div>
          
          <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
            <Box p={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            
            >
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: ".5rem"
                }}
              >{user.nombres}</h4>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleSingOut()
                  }}
                >
                  Cerrar sesión
                </Button>
                {/* <NavLink to="/" onClick={handleSingOut}>Cerrar sesión</NavLink> */}
            </Box>
          </Menu>
        </>
      );
      
}

export default SignOut