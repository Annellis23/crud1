const db = require("../config/db");

// Crear tarea
exports.createTask = (req, res) => {
    const { title, description } = req.body;

    db.query(
        "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
        [title, description, req.user.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Tarea creada" });
        }
    );
};

// Obtener tareas
exports.getTasks = (req, res) => {
    db.query(
        "SELECT * FROM tasks WHERE user_id = ?",
        [req.user.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};

// Actualizar tarea
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    db.query(
        "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?",
        [title, description, id, req.user.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Tarea actualizada" });
        }
    );
};

// Eliminar tarea
exports.deleteTask = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM tasks WHERE id = ? AND user_id = ?",
        [id, req.user.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Tarea eliminada" });
        }
    );
};

exports.getTasks = (req, res) => {
    const userId = req.user.id;

    db.query(
        "SELECT * FROM tasks WHERE user_id = ?",
        [userId],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json(results);
        }
    );
};
