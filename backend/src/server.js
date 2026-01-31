const express = require("express");
const crypto = require("crypto");

const app = express();

app.use(express.json());
const port = 5000;

app.get("/hello", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This is a test. Testing server response",
  });
});

app.post("/generate-token", async (req, res) => {
  try {
    const { maxLength = 32 } = req.body;

    if (!maxLength || maxLength <= 0) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid token length",
      });
    }

    // Generate secure random token
    const token = crypto.randomBytes(maxLength).toString("hex");

    res.status(200).json({
      status: "success",
      message: "Token Generated Successfully.",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Token not Generated, Please Try Again.",
      error: error.message,
    });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port:-${port}`);
});
