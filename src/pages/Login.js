import React, { useState } from "react";
// import "./Login.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Button ,Form} from "react-bootstrap";
import Navbar from "../components/Navbar.js";
import "../components/button.css";
export default function Login() {
    let navigate = useNavigate();
    const [errorMessage, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
       
        localStorage.removeItem("user");
        localStorage.removeItem("role");       
        var { uname, pass} = document.forms[0];


      try {
        var response= await axios.post("http://20.113.115.48:8081/person/getAuthority",{username: uname.value, password: pass.value})
        var response2= await axios.post("http://20.113.115.48:8081/person/login",{username: uname.value, password: pass.value})

        localStorage.setItem('role',JSON.stringify(response.data));
        localStorage.setItem('user',JSON.stringify(response2.data.token));

       if( JSON.parse(localStorage.getItem("role"))[0].authority === "admin" )
        navigate("/adminpage")
        if( JSON.parse(localStorage.getItem("role"))[0].authority === "user" )
        navigate("/userpage")

      } catch (error) {
        
        setMessage("Credentiale incorecte");
        
      }

    }

    return (
        <div className="App2"  >    <Navbar></Navbar>
            <div style={{
            position:'absolute',
            display: 'block',
            width: 700,
            padding: 100,
            left:300
        }}>
            <h4>Log In </h4>
            <Form  onSubmit= {handleSubmit}>
                <Form.Group>
                    <Form.Label>Introduceti username :</Form.Label>
                    <Form.Control type="text" required name= "uname"
                        placeholder="Username"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Introduceti parola:</Form.Label>
                    <Form.Control type="password" required name= "pass" placeholder="Parola" />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{fontWeight: "bold",fontSize:20}}>{errorMessage}</Form.Label>
                </Form.Group>
                <Button class="but" type="submit"  style={{margin:"20px"}}>
                    Log In
                </Button>
            </Form>
            </div>
        </div>
    );
}