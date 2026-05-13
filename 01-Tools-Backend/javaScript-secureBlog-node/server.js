import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.get("/", (req, res) => {
    const token = jwt.sign({ userId: 123 }, "your-secret-key", { expiresIn: "1h" });
    res.send(token);
});

app.get("/verify", (req, res) => {
    const decoded = jwt.verify(req.query.token, "your-secret-key");
    res.send(decoded);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});