// backend/routes/purchaseRoutes.js
import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  const { courseId, name, email } = req.body;

  if (!courseId || !name || !email) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  console.log('Simulated payment for course:', courseId);
  res.json({ message: 'Payment successful!' });
});

export default router;

