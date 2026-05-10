const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/movies", (req, res) => {
    try {
        const movies = fs.readFileSync("./data.json", "utf-8");
        res.json(JSON.parse(movies));
    } catch (error) {
        res.status(500).send("Error reading movies file");
    }
});

app.get("/movies/:id", (req, res) => {
    try {
        const movies = fs.readFileSync("./data.json", "utf-8");
        const movie = JSON.parse(movies).find((m) => m.id === req.params.id);
        if (!movie) return res.status(404).send("Movie not found");
        res.json(movie);
    } catch (error) {
        res.status(500).send("Error reading movies file");
    }
});

app.post("/movies", (req, res) => {
    if (!req.body) {    
        return res.status(400).send("Movie is required");
    }
    try {
        const movies = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
        movies.push(req.body);
        fs.writeFileSync("./data.json", JSON.stringify(movies, null, 2));
        res.status(201).json(req.body);
    } catch (error) {
        res.status(500).send("Error reading movies file");
    }
});

app.delete("/movies/:id", (req, res) => {
    try {
        const movies = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
        const filtered = movies.filter((m) => m.id !== req.params.id);
        if (filtered.length === movies.length) return res.status(404).send("Movie not found");
        fs.writeFileSync("./data.json", JSON.stringify(filtered, null, 2));
        res.json(filtered);
    } catch (error) {
        res.status(500).send("Error reading movies file");
    }
});

app.put("/movies/:id", (req, res) => {
    try {
        const movies = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
        const exists = movies.some((m) => m.id === req.params.id);
        if (!exists) return res.status(404).send("Movie not found");
        const updated = movies.map((m) => m.id === req.params.id ? { ...m, ...req.body } : m);
        fs.writeFileSync("./data.json", JSON.stringify(updated, null, 2));
        res.json(updated.find((m) => m.id === req.params.id));
    } catch (error) {
        res.status(500).send("Error reading movies file");
    }
});

app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});