import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContextProvider";
import PopoverLogout from "../components/LogoutAndProfilePopover";

import { Avatar } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    // top: "20px",
    top: "10px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.2),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      // width: "12ch",
      width: "20ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar({ Icon, Icon2 }) {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        class="shadow-md"
        style={{
          // height: "80px",
          height: "55px",
          // backgroundColor: "#faf3e0",
          backgroundColor: "white",
          width: "100%",
          minWidth: "max-content",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <div>
              <Link on to="/">
                <img
                  style={{
                    // height: "80px",
                    height: "55px",
                  }}
                  src={"ImgFile"}
                  layout="fixed"
                />
              </Link>
            </div>
            <div
              style={{ width: "250px", marginBottom: "20px", height: "30px" }}
              className={classes.search}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={(e) => e.target.value}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>

          <div
            style={{ display: "flex", position: "relative", right: "45px" }}
            class="flex mt-2"
          >
            <div className="group sm:w-20 flex flex-col cursor-pointer hover:text-yellow-500 items-center">
              <Icon
                className="h-10 transform group-hover:transition delay-150 duration-150 "
                onClick={(e) => history.push("/")}
              />
              <span
                class="opacity-0 mt-3 w-20 h-6 text-center text-yellow-500 rounded-lg group-hover:opacity-100 group-hover:transition delay-150 duration-150 font-bold tracking-widest"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
              >
                Home
              </span>
            </div>
            <div className="group sm:w-20 flex flex-col cursor-pointer hover:text-yellow-500 items-center">
              <Icon2
                className="h-10 group-hover:transition delay-150 duration-150 ease-in-out ..."
                onClick={(e) => history.push("/create-topic")}
              />
              <span
                class="opacity-0 mt-3 w-20 h-6 text-center text-yellow-500 rounded-lg group-hover:opacity-100 font-bold group-hover:transition delay-150 duration-150 tracking-widest"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
              >
                Post
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              backgroundColor: "#EDD1B0",
              borderRadius: "1.5rem",
              height: "45px",
              width: "200px",
              // marginTop: "15px",
              marginTop: "5px",
              marginRight: "60px",
            }}
          >
            {!user && (
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => history.push("/login")}
                style={{
                  border: "none",
                  outline: "none",
                  height: "30px",
                  margin: "0 auto",
                  marginTop: "7px",
                }}
              >
                Go to Login
              </Button>
            )}
            {user && (
              <Avatar
                src={user.userImg}
                className={classes.small}
                style={{
                  marginTop: "2px",
                  marginLeft: "6px",
                }}
              ></Avatar>
            )}
            {user && (
              <p
                className="mt-1 ml-3 mr-4"
                style={{ paddingTop: "5px", fontWeight: "bolder" }}
              >
                {user.username}
              </p>
            )}
            <PopoverLogout />
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
