import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';

const NavBar = ({ setSelectedComponent }) => {
   const user = useContext(UserContext);

   if (!user) {
      return null;
   }

   const { userData } = user;

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
   };

   const handleOptionClick = (component) => {
      setSelectedComponent(component);
   };

   return (
      <Navbar expand="lg" bg="light" variant="light">
         <Container fluid>
            <Navbar.Brand>
               <h4 className='mb-0'>Study App</h4>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                  <Nav.Link as={NavLink} to="/dashboard">Home</Nav.Link>

                  {userData.type === 'Teacher' && (
                     <Nav.Link as="button" onClick={() => handleOptionClick('addcourse')}>
                        Add Course
                     </Nav.Link>
                  )}

                  {userData.type === 'Admin' && (
                     <Nav.Link as="button" onClick={() => handleOptionClick('courses')}>
                        Courses
                     </Nav.Link>
                  )}

                  {userData.type === 'Student' && (
                     <Nav.Link as="button" onClick={() => handleOptionClick('enrolledcourses')}>
                        Enrolled Courses
                     </Nav.Link>
                  )}
               </Nav>
               <Nav className="d-flex align-items-center">
                  <span className="me-3 fw-semibold">Hi, {userData.name}</span>
                  <Button onClick={handleLogout} size='sm' variant='outline-danger'>
                     Log Out
                  </Button>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default NavBar;


