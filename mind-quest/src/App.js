import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import MindMap from "./components/pages/MindMap";
import Tasks from "./components/pages/Tasks";
import User from "./components/pages/User";
import NavBar from "./components/layout/Navbar";
import Container from "./components/layout/Container";
import usericon from "./img/user_456212.png"


function App() {
  return (
    <Router>
      <NavBar username="Usuário" usericon={usericon}/>
      <Switch>
        <Container>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/mindmap">
            <MindMap />
          </Route>
          <Route exact path="/tasks">
            <Tasks />
          </Route>
          <Route exact path="/user">
            <User />
          </Route>
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
