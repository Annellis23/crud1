const express = require("express");
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(express.json());


app.use(express.static(__dirname + "/public"));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Ruta principal (abre login directo)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

// Servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000 🚀");
});