import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import {
   Avatar,
   Button,
   TextField,
   Grid,
   Box,
   Typography,
   Snackbar,
   Alert
} from '@mui/material';
import axiosInstance from './AxiosInstance';

const Register = () => {
   const navigate = useNavigate();
   const [selectedOption, setSelectedOption] = useState('Select User');
   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

   const [data, setData] = useState({
      name: '',
      email: '',
      password: '',
      type: '',
   });

   const handleSelect = (role) => {
      setSelectedOption(role);
      setData({ ...data, type: role });
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const { name, email, password, type } = data;

      if (!name || !email || !password || !type) {
         return showSnackbar('Please fill all fields', 'warning');
      }

      try {
         const response = await axiosInstance.post('/api/user/register', data);
         if (response.data.success) {
            showSnackbar(response.data.message, 'success');
            setTimeout(() => navigate('/login'), 1500);
         } else {
            showSnackbar(response.data.message, 'error');
         }
      } catch (error) {
         console.error("Error:", error);
         showSnackbar('Something went wrong. Please try again.', 'error');
      }
   };

   const showSnackbar = (message, severity = 'info') => {
      setSnackbar({ open: true, message, severity });
   };

   return (
      <>
         {/* Navbar */}
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
               <Navbar.Brand><h2>Study App</h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto" />
                  <Nav>
                     <Link to={'/'} className='mx-3'>Home</Link>
                     <Link to={'/login'} className='mx-3'>Login</Link>
                     <Link to={'/register'} className='mx-3'>Register</Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         {/* Register Form */}
         <div className="first-container">
            <Container component="main" style={{ display: 'flex', justifyContent: 'center' }}>
               <Box
                  sx={{
                     mt: 8,
                     mb: 4,
                     p: 3,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     background: '#dddde8db',
                     border: '1px solid lightblue',
                     borderRadius: '8px',
                     width: '100%',
                     maxWidth: 400,
                  }}
               >
                  <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }} />
                  <Typography component="h1" variant="h5">
                     Register
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate>
                     <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        autoComplete="name"
                     />
                     <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        autoComplete="email"
                     />
                     <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                     />

                     {/* Role Dropdown */}
                     <Dropdown className="my-3">
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" style={{ width: '100%' }}>
                           {selectedOption}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           <Dropdown.Item onClick={() => handleSelect('Student')}>Student</Dropdown.Item>
                           <Dropdown.Item onClick={() => handleSelect('Teacher')}>Teacher</Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>

                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                     >
                        Sign Up
                     </Button>

                     <Grid container justifyContent="flex-end">
                        <Grid item>
                           Already have an account?{' '}
                           <Link style={{ color: 'blue' }} to="/login">
                              Sign In
                           </Link>
                        </Grid>
                     </Grid>
                  </Box>
               </Box>
            </Container>
         </div>

         {/* Snackbar */}
         <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
         >
            <Alert
               onClose={() => setSnackbar({ ...snackbar, open: false })}
               severity={snackbar.severity}
               sx={{ width: '100%' }}
            >
               {snackbar.message}
            </Alert>
         </Snackbar>
      </>
   );
};

export default Register;



