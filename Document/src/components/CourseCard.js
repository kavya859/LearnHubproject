// MUI styled Course card component
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Collapse,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";

const CourseCard = ({ course }) => {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    method: "UPI",
  });
  const [success, setSuccess] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setSuccess(false); // Reset success message if reopening
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePurchase = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/purchases", {
        courseId: course._id,
        ...formData,
      });
      if (res.data.message === "Payment successful!") {
        setSuccess(true);
      }
    } catch (err) {
      alert("Error processing payment.");
    }
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2, boxShadow: 4 }}>
      <CardMedia
        component="img"
        height="180"
        image={course.image}
        alt={course.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {course.description}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          ₹{course.price}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleExpandClick}
        >
          {expanded ? "Cancel" : "Buy Now"}
        </Button>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              name="name"
              label="Your Name"
              variant="outlined"
              margin="dense"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              margin="dense"
              value={formData.email}
              onChange={handleChange}
            />

            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Payment Method:
            </Typography>
            <RadioGroup
              name="method"
              value={formData.method}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="UPI"
                control={<Radio />}
                label="UPI"
              />
              <FormControlLabel
                value="Card"
                control={<Radio />}
                label="Card"
              />
              <FormControlLabel
                value="NetBanking"
                control={<Radio />}
                label="NetBanking"
              />
            </RadioGroup>

            <Button
              variant="outlined"
              color="success"
              fullWidth
              onClick={handlePurchase}
              sx={{ mt: 2 }}
            >
              Pay ₹{course.price}
            </Button>

            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Payment Successful! Course Purchased.
              </Alert>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
