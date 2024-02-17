const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./images");
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });
var filePath = "";

app.post('/upload', upload.single('file'), (req, res) => {
  filePath = req.file.path.toString();
  console.log(filePath);
  res.status(200).json({ message: "File uploaded successfully", filePath: filePath });
});

app.get('/ask', async (req, res) => {
  try {
    const question = req.query.question || "what is this article about?"; // Default question if not provided
    const response = await axios.get('/ask', {
      params: { question: question }
    });
    const generatedText = response.data.result;
    res.status(200).json({ result: generatedText });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
