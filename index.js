const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(express.json());
// app.use(cors({ origin: 'http://localhost:5173', methods: ["GET", "POST"] }));

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const puppeteerItem = async (url) => {
  try {
    console.log(url);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // ওয়েবপেজে যাওয়ার জন্য
    await page.goto(url, { timeout: 450000, waitUntil: "networkidle2" });

  } catch (err) {
    console.log(err.message, " puppeteer error...");
  }
};

app.get('/', (req, res) => {
  res.status(200).send("all is ok");
});

// API Route
app.post("/scrape", async (req, res) => {
  const { url } = req?.body;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  await puppeteerItem(url);

    res.status(200).send("the website load successfully.");
  
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
