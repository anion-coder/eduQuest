const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()
app.use(cors())
app.use(express.json())

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./images")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage})
var filePath="";

app.post('/upload', upload.single('file'), (req, res) => {
filePath= req.file.path.toString();
   console.log(filePath)
})

app.listen(3001, () => {
  console.log("Server is running")
})

module.exports={filePath};