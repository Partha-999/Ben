const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Mock Data for Seat Allocation (Stored in-memory for now)
let allocatedSeats = {};

// Endpoint to get all allocated seats
app.get('/admin/allocated-seats', (req, res) => {
  res.json(allocatedSeats);
});

// Endpoint to allocate seats (post employee IDs for selected seats)
app.post('/admin/allocate-seats', (req, res) => {
  const { seats, employeeIds } = req.body;
  if (seats.length !== employeeIds.length) {
    return res.status(400).json({ message: "Seats and employee IDs must match." });
  }

  // Allocate seats by employee IDs
  for (let i = 0; i < seats.length; i++) {
    allocatedSeats[seats[i]] = employeeIds[i];
  }

  res.status(200).json({ message: "Seats allocated successfully!", allocatedSeats });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
