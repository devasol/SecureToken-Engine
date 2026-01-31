require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/hello", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This is a test. Testing server response",
  });
});

// In-memory storage for tokens with metadata
const tokenDatabase = new Map();

app.post("/generate-token", async (req, res) => {
  try {
    const { maxLength = 32, securityTier = "Pro" } = req.body;

    if (!maxLength || maxLength <= 0) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid token length",
      });
    }

    // Generate secure random token
    const token = crypto.randomBytes(maxLength).toString("hex");
    
    // Create Metadata (JWT-like payload)
    const metadata = {
      header: {
        alg: "HS256",
        typ: "TOKEN",
        kid: crypto.randomBytes(4).toString("hex")
      },
      payload: {
        iss: "TokenGen-Secure-Server",
        sub: "cryptographic-key-delivery",
        tier: securityTier,
        entropy: `${maxLength * 8}-bit`,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        jti: crypto.randomBytes(8).toString("hex")
      }
    };

    // Store in our "database"
    tokenDatabase.set(token, metadata);

    res.status(200).json({
      status: "success",
      message: "Token Generated Successfully.",
      data: {
        token,
        metadata
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

app.post("/verify-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      status: "failed",
      message: "Token is required",
    });
  }

  // 1. Check if it's a locally generated token first
  let metadata = tokenDatabase.get(token);
  let isValid = !!metadata;
  let message = isValid ? "Signature Verified (Local Engine)" : "Invalid Signature";

  // 2. If not in DB, check if it's a standard JWT format (3 parts separated by dots)
  if (!isValid && typeof token === "string" && token.split(".").length === 3) {
    try {
      const parts = token.split(".");
      // Decode parts from Base64Url
      const header = JSON.parse(Buffer.from(parts[0], "base64url").toString());
      const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
      
      metadata = { header, payload };
      isValid = true; // We can "decode" it, showing data like jwt.io does
      message = "JWT Decoded (External Token)";
    } catch (err) {
      // Not a valid JSON-payload JWT
      isValid = false;
      message = "Invalid JWT Format";
    }
  }

  res.status(200).json({
    status: "success",
    data: {
      isValid,
      message,
      metadata: metadata || null
    },
  });
});
app.listen(port, () => {
  console.log(`Server is running on port:-${port}`);
});
