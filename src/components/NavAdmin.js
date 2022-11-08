import React from 'react';
import {
  Nav,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import { BiUserCircle } from "react-icons/bi";
const NavAdmin = () => {
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("role");

  }
    return (
      <>
        <Nav>
          <Bars />
          
          <NavBtn>
            <NavBtnLink to= '/' onClick={()=>logout()}>Log Out</NavBtnLink>
          </NavBtn>
          <div  style={{marginTop:"20px"}}>
          <NavBtn >  
          Bine ati venit, rau ati nimerit!
          <NavBtnLink to= '/adminpage'> <BiUserCircle size={'2em'}/></NavBtnLink>
          </NavBtn>
          </div>
        </Nav>
        
      </>
    );
  };
    
  export default NavAdmin;