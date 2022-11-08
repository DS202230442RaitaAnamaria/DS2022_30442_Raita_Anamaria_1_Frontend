import React from "react";
import './App.css';
import {Component} from "react";
import Home from "./Home";
import Login from "./pages/Login";
import AdminPage from "./pages/Adminpage";
import UserPage from "./pages/Userpage.js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);

  }
  render() {
      
    return ( 
      <div style={styles.app}>
      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/userpage" element={<UserPage />} />
        </Routes>
      </Router>
      <footer style={{textAlign:'center',background:"pink"}}>
    <div>
    <span>Powered by</span>
    <a href="https://ro.linkedin.com/in/anamaria-raita-a4353b212"> &copy; Anamaria Raita 2022</a>
    </div>
    </footer>
    </div>
    );
  }
}

export default App;

const styles = {
  app: {
    padding: 0,
  },
};