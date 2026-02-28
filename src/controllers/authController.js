const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Registrar usuario
exports.register = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Cifrar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashedPassword],
            (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json({ message: "Usuario registrado correctamente" });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            if (results.length === 0) {
                return res.status(400).json({ message: "Usuario no encontrado" });
            }

            const user = results[0];

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: "Contraseña incorrecta" });
            }

            const token = jwt.sign(
                { id: user.id },
                "secreto_super",
                { expiresIn: "1h" }
            );

            res.json({ token });
        }
    );
};

exports.profile = (req, res) => {
    res.json({
        message: "Perfil del usuario",
        user: req.user
    });
};