import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContextProvider";

import HomePage from "./pages/HomePage";
import TopicPage from "./pages/TopicPage";
import LogInPage from "./pages/LogInPage";
import CreateTopicPage from "./pages/CreateTopicPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import MyPage from "./pages/MyPage";
import RoomListsTopicPage from "./pages/RoomListsTopicPage";

const adminRoutes = [
  {
    path: "/me",
    component: MyPage,
  },
  {
    path: "/create-topic",
    component: CreateTopicPage,
  },
  {
    path: "/admin",
    component: AdminPage,
  },
  {
    path: "/topic/:id",
    component: TopicPage,
  },
  {
    path: "/user/:id",
    component: UserPage,
  },
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/room/:roomId",
    component: RoomListsTopicPage,
  },
  
];

const userRoutes = [
  {
    path: "/me",
    component: MyPage,
  },
  {
    path: "/create-topic",
    component: CreateTopicPage,
  },
  {
    path: "/topic/:id",
    component: TopicPage,
  },
  {
    path: "/user/:id",
    component: UserPage,
  },
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/room/:roomId",
    component: RoomListsTopicPage,
  },
 
];
const guessRoutes = [
  {
    path: "/login",
    component: LogInPage,
  },
  {
    path: "/topic/:id",
    component: TopicPage,
  },
  {
    path: "/user/:id",
    component: UserPage,
  },
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/room/:roomId",
    component: RoomListsTopicPage,
  },
];

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <Switch>
      {console.log(user)}
      {user &&
        user.userRole === "ADMIN" &&
        adminRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}
      {user &&
        user.userRole === "USER" &&
        userRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}

      {!user &&
        guessRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
