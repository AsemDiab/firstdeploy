const express = require("express");
const connectDB = require("./db");
const Link = require("./Link");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Asem" },
    { id: 2, name: "Ali" },
  ]);
});

app.post("/api/shorten", async (req, res) => {
  // Logic for shortening the URL
  console.log(req.body);
  const link = new Link({
    code: req.body.code,
    originalUrl: req.body.originalUrl,
  });
  await link.save();
  res.json({ message: "Link shortened successfully", link });
});

app.get("/api/links/:shortId", async (req, res) => {
  try {
    // STEP 1 — find the link by code
    console.log(req.params.shortId);
    const link = await Link.findOne({ code: req.params.shortId });
    console.log(link);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.redirect(302, link.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /:code  — full redirect route

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
