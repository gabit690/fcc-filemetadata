var express = require('express');
var cors = require('cors');
require('dotenv').config()


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).single('upfile');


var app = express();

app.use(cors());
app.use('/public', express.static(`${__dirname}/public`));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/fileanalyse', upload, (req, res, next) => {
  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
