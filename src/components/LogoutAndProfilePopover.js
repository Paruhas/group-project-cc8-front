import React from "react";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import localStorageService from "../services/localStorageService"
import { AuthContext } from "../contexts/AuthContextProvider";
import { useContext } from "react";



export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorageService.getToken();
  const { user } = useContext(AuthContext);

  const history = useHistory();

  console.log(user);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = (e) => {
    try{
    e.preventDefault();
    localStorageService.clearToken()
    window.location.reload();
    }catch(err){
       console.log({ front: err.message });
    }
   
  };

  return (
    <div>
      {user &&<IconButton
        style={{
          border: "none",
          outline: "none",
          position: "fixed",
          right:"70px"
        }}
        onClick={handleClick}
      >
        <ExpandMoreIcon />
      </IconButton>}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>history.push("/me")}>Profile</MenuItem>
        {user.userRole === "ADMIN" &&<MenuItem onClick={()=> history.push("/admin")}>Admin Page</MenuItem>}
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
