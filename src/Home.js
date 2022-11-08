import React from "react";
import './App.css';
import { Component } from "react";  
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }

  }

  render() {
    return (
      <div >
      <div ><Navbar></Navbar>
        <div className="App" >
          <div className='content' >
          </div>

        </div>
      </div>
      </div>
    );
  }
}

export default Home;