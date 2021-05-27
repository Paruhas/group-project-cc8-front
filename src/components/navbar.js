import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContextProvider";
import PopoverLogout from "../components/LogoutAndProfilePopover";

import { Avatar } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

import { UserIcon } from "@heroicons/react/outline";
import { BookOpenIcon } from "@heroicons/react/outline";

import WebLogo from "../public/images/Icon_01.png";

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

import Swal from "sweetalert2";

function Navbar({ Icon, Icon2 }) {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      history.push(`/search/${search}`);
    }
  };
  console.log(search);

  const handlerGoToCreate = async (e) => {
    if (!user) {
      await Swal.fire({
        icon: "error",
        title: "กรุณา LOGIN / REGISTER ก่อน",
        showConfirmButton: false,
      });

      history.push("/login");
      return;
    }

    history.push("/create-topic");
  };

  return (
    <>
      <div
        class="shadow-md"
        style={{
          // height: "80px",
          height: "50px",
          // backgroundColor: "#faf3e0",
          backgroundColor: "white",
          width: "100%",
          minWidth: "max-content",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <div class="mt-2 ml-2">
              <Link on to="/">
                <img class="w-9 h-9" src={WebLogo} layout="fixed" />
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
                onKeyDown={handleKeyDown}
                value={search}
                placeholder="Search…"
                onChange={(e) => setSearch(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              ></InputBase>
            </div>
          </div>

          <div
            style={{ display: "flex", position: "relative", right: "45px" }}
            class="flex mt-3"
          >
            <div className="group sm:w-20 flex flex-col cursor-pointer hover:text-yellow-500 items-center">
              <Icon
                className="h-7 transform group-hover:transition delay-150 duration-150 "
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
              <BookOpenIcon
                className="h-7 transform group-hover:transition delay-150 duration-150 "
                onClick={(e) => history.push("/topic-all")}
              />
              <span
                class="opacity-0 mt-3 w-20 h-6 text-center text-yellow-500 rounded-lg group-hover:opacity-100 group-hover:transition delay-150 duration-150 font-bold tracking-widest"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
              >
                ALL
              </span>
            </div>
            <div className="group sm:w-20 flex flex-col cursor-pointer hover:text-yellow-500 items-center">
              <Icon2
                className="h-7 group-hover:transition delay-150 duration-150 ease-in-out ..."
                onClick={handlerGoToCreate}
              />
              <span
                class="opacity-0 mt-3 w-20 h-6 text-center text-yellow-500 rounded-lg group-hover:opacity-100 font-bold group-hover:transition delay-150 duration-150 tracking-widest"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  position: "relative",
                }}
              >
                Post
              </span>
            </div>
          </div>

          {!user && (
            <div
              class="mt-1 mr-2"
              style={{
                display: "flex",
                borderRadius: "1.5rem",
                height: "40px",
                width: "200px",
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => history.push("/login")}
                style={{
                  border: "none",
                  outline: "none",
                  height: "30px",
                  width: "180px",
                  margin: "0.25rem 0.25rem 0.25rem 0.6rem",
                  borderRadius: "1.5rem",
                  color: "black",
                  fontWeight: "700",
                  backgroundColor: "#edd1b0",
                }}
              >
                LOGIN / REGISTER
              </Button>
            </div>
          )}
          {user && (
            <div
              class="mt-1 mr-2"
              style={{
                borderRadius: "1.5rem",
                height: "40px",
                width: "200px",
              }}
            >
              <div
                class="flex shadow-md"
                style={{
                  height: "30px",
                  width: "180px",
                  margin: "0.25rem 0.25rem 0.25rem 0.6rem",
                  borderRadius: "1.5rem",
                  backgroundColor: "#edd1b0",
                }}
              >
                <Avatar
                  src={user.userImg ? user.userImg : UserIcon}
                  className={classes.circle}
                  class="w-7 h-7"
                  style={{
                    marginTop: "2px",
                    marginLeft: "6px",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                  }}
                ></Avatar>
                <p className="ml-2 mr-2 pt-1 font-bold">
                  {user.username.length > 10
                    ? user.username.substr(0, 9) + "..."
                    : user.username}
                </p>
                <PopoverLogout />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Navbar;
