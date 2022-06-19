const express = require("express");
const { accessControl, defaultMiddleWare } = require("./middleware");
const users = [
  { id: 1, name: "Süleyman Furkan Binay", place: "Balıkesir" },
  { id: 2, name: "Ali Veli", place: "Konya" },
  { id: 3, name: "Ayşe Fatma", place: "Adana" },
];

const app = express();
const PORT = 5001;

app.use(express.json()); // gönderilen json verisini yakalamak için

// app.use(accessControl); // uygulama kapsamı middleware

// localhost:5001/users
// GET Request
app.get("/users", [accessControl, defaultMiddleWare], (req, res, next) => {
  res.json({
    success: true,
    data: users,
  });
});

// POST Request
app.post("/users", [accessControl, defaultMiddleWare], (req, res, next) => {
  const user = req.body;
  users.push(user);

  res.json({
    success: true,
    data: users,
  });
});

// PUT Request
app.put("/users/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users[i] = {
        ...users[i],
        ...req.body,
      };
    }
  }
  res.json({
    success: true,
    data: users,
  });
});

// DELETE Request
app.delete("/users/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);
    }
  }

  res.json({
    success: true,
    data: users,
  });
});

app.get("/test", (req, res, next) => {
  res.send("test worked without middleware");
});

app.listen(PORT, () => {
  console.log("Server Started PORT: " + PORT);
});
