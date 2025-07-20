import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, Button, Modal, Box, TextField
} from '@mui/material';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    axios.get('http://localhost:8000/api/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleBuyClick = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', email: '' });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/purchase', {
      courseId: selectedCourse._id,
      ...formData
    }).then(() => {
      alert('Payment successful!');
      handleClose();
    }).catch(() => {
      alert('Payment failed!');
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {courses.map((course) => (
          <Card key={course._id} style={{ width: 300 }}>
            <img
              src={course.image}
              alt={course.title}
              style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6">{course.title}</Typography>
              <Typography>{course.description}</Typography>
              <Typography color="primary" style={{ marginTop: 10 }}>
                ₹{course.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 10 }}
                onClick={() => handleBuyClick(course)}
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            backgroundColor: 'white',
            padding: 4,
            margin: '100px auto',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>Enter Details to Purchase</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Pay ₹{selectedCourse?.price}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Courses;

