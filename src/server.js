const express = require("express");
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("API de tareas funcionando 🚀");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});
