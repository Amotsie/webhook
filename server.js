const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for all routess
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

/**
 * Webhook endpoint
 * Expects: { "data": "example" }
 */
app.post("/webhook", (req, res) => {
    const { data } = req.body;

    // Validate input
    if (!data || typeof data !== "string") {
        return res.status(400).json({
            error: "Invalid input. Please provide a string in the 'data' field."
        });
    }
    // Remove non-alphabetic characters
    const lettersOnly = data.replace(/[^a-zA-Z]/g, "");

    // Convert string to array of characters
    const charArray = lettersOnly.split("");

    // Sort alphabetically
    const sortedArray = charArray.sort((a, b) => a.localeCompare(b));

    // Return result
    return res.status(200).json({
        word: sortedArray
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});