import express from "express";

const app = express();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/events", (req, res) => {
  res.json([
    { id: 1, name: "Event 1", date: "2023-10-01" },
    { id: 2, name: "Event 2", date: "2023-10-02" },
  ]);
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`Backend API is running on port ${PORT}`);
});
