import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Account from "./context/account/account";
import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { GlobalStyle } from "./styles/GlobalStyles";

function App() {
  return (
    <Router>
      <Account>
        <GlobalStyle />
        <NavBar />
        <Switch>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>404</h1>} />
        </Switch>
      </Account>
    </Router>
  );
}

export default App;
