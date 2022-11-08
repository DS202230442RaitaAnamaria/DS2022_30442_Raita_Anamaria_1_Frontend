import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import { BiUserCircle } from "react-icons/bi";
const NavbarUser = () => {
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
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
          <NavBtnLink to= '/userpage'> <BiUserCircle size={'2em'}/></NavBtnLink>
          </NavBtn>
          </div>
        </Nav>
      </>
    );
  };
    
  export default NavbarUser;