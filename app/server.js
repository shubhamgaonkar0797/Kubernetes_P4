const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("DevOps Kubernetes Demo - Application is running successfully!");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Application running on port ${PORT}`);
});
