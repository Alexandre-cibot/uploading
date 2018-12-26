const express = require('express');
const app = express();
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')

app.use(cors())

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const date = new Date().toLocaleDateString()
    cb(null, file.originalname)
  }
})

let uploading = multer({ storage })

app.get('/', function (req, res) {
  res.send('Uploading API.');
});

app.post('/upload', uploading.single('file'), (req, res) => {
  console.log(req.file)
  res.sendStatus(200)
})

app.listen(4000, () => {
  console.log('Listening on port 4000 ...')
})
