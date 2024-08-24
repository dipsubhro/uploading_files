const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
}
);

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname,   
    'public')));

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
      res.send('YAY!!! File uploaded successfully:)');
    } else {
      res.send('No file uploaded:(');
    }
  });

app.get('/files/:filename', (req, res) => {
    const file = path.join(__dirname, 'uploads', req.params.filename);
    res.sendFile(file);
  });
  
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });