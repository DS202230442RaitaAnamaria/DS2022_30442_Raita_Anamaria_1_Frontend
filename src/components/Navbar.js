import React from 'react';
import {
  Nav,
  Bars,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

const Navbar = () => {

    return (
      <>
        <Nav>
          <Bars />
          <NavBtn>
            <NavBtnLink  to='/'>Acasă</NavBtnLink>
            <NavBtnLink to='/login'>Log In</NavBtnLink>       
          </NavBtn>
         <div   style={{marginTop:"20px",marginRight:"20px"}}>Bine ati venit, rau ati nimerit!</div>
        </Nav>
      </>
    );
  };
    
  export default Navbar;