var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer");
var cors = require("cors");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cors());
// Создание хранилища под файлы
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + "/public/src/video");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
// Подключение хранилища
var upload = multer({ storage: storage });
// Роутер для загрузки файла
app.post("/", upload.single("file"), function(req, res, next) {
  // res.sendStatus(200);
  res.end();
});

app.listen(3000, function() {
  console.log(".....");
});
