require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/generate-image", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt tidak boleh kosong!" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: prompt,
                n: 1,
                size: "512x512"
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }

        res.json({ imageUrl: data.data[0].url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
