import React, { useState } from 'react';
import {  Avatar,Box, Button, IconButton, Menu, MenuItem } from'@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';


const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));


const SignOut = ({ username, avatarUrl }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSingOut = () => {
      localStorage.removeItem('token');
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
          <SmallAvatar alt="" src="/static/images/avatar/1.jpg" 
          onClick={handleMenuOpen}
          style={{
            width: "15px",
            height: "15px",
            cursor: "pointer"
          }}

          />
        }
      >
        <Avatar alt="Jravis How" src="/static/images/avatar/2.jpg" />
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
              >Jorge Freire</h4>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleSingOut()
                    console.log("Presiono el boton ")
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